import type { ProfileId } from './types'

export const SITE_URL = 'https://silvio-aguilar.github.io'

export const person = {
  name: 'Silvio Aguilar',
  alias: '@kurzerhand',
  motto: 'We hack to protect',
  location: { city: 'Madrid', country: 'España', countryCode: 'ES' },
} as const

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/silvio-aguilar' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/silvio-aguilar' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/kurzerhand' },
] as const

export const productLinks = [
  { id: 'bguardian', label: 'bguardian.app', url: 'https://bguardian.app' },
  { id: 'topword', label: 'top-word.impulsa-tu.com', url: 'https://top-word.impulsa-tu.com' },
] as const

/** Accent colours per profile. Mirrored as CSS tokens in src/index.css. */
export const profileAccent: Record<ProfileId, { dark: string; light: string }> = {
  dev: { dark: '#f5c518', light: '#9a6b00' },
  security: { dark: '#3ee08f', light: '#0b7d4b' },
  audiovisual: { dark: '#ff5a5f', light: '#c0262d' },
}
