import { describe, expect, it } from 'vitest'
import { dominantColors, stripesCss, toHex } from './color'

describe('color helpers', () => {
  it('formats hex', () => {
    expect(toHex(255, 0, 16)).toBe('#ff0010')
  })

  it('finds the dominant colours and ignores transparent pixels', () => {
    const px = (r: number, g: number, b: number, a = 255) => [r, g, b, a]
    const data = new Uint8ClampedArray([
      ...px(255, 0, 0),
      ...px(250, 2, 2),
      ...px(255, 0, 0),
      ...px(0, 0, 255),
      ...px(0, 255, 0, 0),
    ])
    const colors = dominantColors(data, 3)
    expect(colors).toHaveLength(2)
    expect(colors[0]).toMatch(/^#f[c-f]0[01]0[01]$/)
    expect(colors[1]).toBe('#0000ff')
  })

  it('builds a repeating gradient', () => {
    expect(stripesCss(['#000', '#fff'], 90, 10)).toBe(
      'repeating-linear-gradient(90deg, #000 0px 10px, #fff 10px 20px)',
    )
  })
})
