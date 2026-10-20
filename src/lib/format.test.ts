import { describe, expect, it } from 'vitest'
import { formatPeriod } from './format'

describe('formatPeriod', () => {
  it('formats year ranges and current items', () => {
    expect(formatPeriod('2025', '2027', 'es', 'actualidad', true)).toBe('2025 – actualidad')
    expect(formatPeriod('2023', undefined, 'en', 'present')).toBe('2023')
    expect(formatPeriod(undefined, undefined, 'en', 'present')).toBe('')
  })

  it('localises months', () => {
    expect(formatPeriod('2024-01', '2024-05', 'en', 'present')).toBe('Jan 2024 – May 2024')
  })
})
