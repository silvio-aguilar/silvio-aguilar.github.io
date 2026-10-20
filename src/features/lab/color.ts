export const toHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

/**
 * Dominant colours by bucketing pixels into a 4-bit-per-channel grid
 * and averaging each bucket. Works on any RGBA buffer.
 */
export function dominantColors(data: Uint8ClampedArray, count = 8): string[] {
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>()
  for (let i = 0; i < data.length; i += 4) {
    if ((data[i + 3] ?? 0) < 128) continue
    const r = data[i] ?? 0
    const g = data[i + 1] ?? 0
    const b = data[i + 2] ?? 0
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
    const bucket = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 }
    bucket.n++
    bucket.r += r
    bucket.g += g
    bucket.b += b
    buckets.set(key, bucket)
  }
  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map((c) => toHex(c.r / c.n, c.g / c.n, c.b / c.n))
}

export function randomHex(): string {
  const v = new Uint8Array(3)
  crypto.getRandomValues(v)
  return toHex(v[0] ?? 0, v[1] ?? 0, v[2] ?? 0)
}

export function stripesCss(colors: string[], angle: number, width: number): string {
  const stops = colors.map((c, i) => `${c} ${i * width}px ${(i + 1) * width}px`).join(', ')
  return `repeating-linear-gradient(${angle}deg, ${stops})`
}
