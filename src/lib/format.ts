import type { Lang } from '../content/types'

const locale: Record<Lang, string> = { es: 'es-ES', en: 'en-GB', de: 'de-DE' }

/** "2024-01" → "ene 2024"; "2023" → "2023". */
export function formatPeriodPart(value: string | undefined, lang: Lang): string {
  if (!value) return ''
  const [y, m] = value.split('-')
  if (!m) return y ?? ''
  const d = new Date(Date.UTC(Number(y), Number(m) - 1, 1))
  return new Intl.DateTimeFormat(locale[lang], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

export function formatPeriod(
  start: string | undefined,
  end: string | undefined,
  lang: Lang,
  nowLabel: string,
  current?: boolean,
): string {
  const s = formatPeriodPart(start, lang)
  const e = current ? nowLabel : formatPeriodPart(end, lang)
  if (s && e && s !== e) return `${s} – ${e}`
  return s || e
}
