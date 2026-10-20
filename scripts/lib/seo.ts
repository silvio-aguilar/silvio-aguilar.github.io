import { createHash } from 'node:crypto'

export const SITE_URL = 'https://silvio-aguilar.github.io'
export const LANGS = ['es', 'en', 'de'] as const
export type Lang = (typeof LANGS)[number]
export type Page = '' | 'cv' | 'lab'

export const ogLocale: Record<Lang, string> = { es: 'es_ES', en: 'en_GB', de: 'de_DE' }

export const pagePath = (lang: Lang, page: Page) => (page ? `/${lang}/${page}/` : `/${lang}/`)

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const sha256 = (code: string) =>
  `'sha256-${createHash('sha256').update(code).digest('base64')}'`

export function csp(scriptHashes: string[]): string {
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://formspree.io",
    "media-src 'self' blob:",
    "worker-src 'self' blob:",
    "form-action 'self' https://formspree.io",
    "base-uri 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function alternates(page: Page): string {
  const links = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${pagePath(l, page)}" />`,
  )
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${page ? pagePath('es', page) : '/'}" />`,
  )
  return links.join('\n    ')
}

export function jsonLd(
  lang: Lang,
  jobTitle: string,
  sameAs: string[],
  knowsAbout: string[],
): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Silvio Aguilar',
    alternateName: ['@kurzerhand', 'kurzerhand'],
    url: `${SITE_URL}/${lang}/`,
    image: `${SITE_URL}/og.png`,
    jobTitle,
    description: 'We hack to protect',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    knowsLanguage: ['es', 'en', 'de'],
    knowsAbout,
    sameAs,
  }
  // "<" escaped so the JSON can never close the script element
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}
