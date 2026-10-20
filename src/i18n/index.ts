import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANG, LANGS, type Lang } from '../content/types'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'

export const resources = {
  es: { translation: es },
  en: { translation: en },
  de: { translation: de },
} as const

/** Languages whose translation still needs a native review. */
export const PENDING_REVIEW: readonly Lang[] = ['de']

export const LANG_NAMES: Record<Lang, string> = { es: 'Español', en: 'English', de: 'Deutsch' }

export const LANG_STORAGE_KEY = 'lang'

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value)
}

/** Stored choice first, then navigator.languages, then Spanish. */
export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY) ?? undefined
    if (isLang(stored)) return stored
  } catch {
    /* storage unavailable */
  }
  for (const l of navigator.languages ?? []) {
    const base = l.slice(0, 2).toLowerCase()
    if (isLang(base)) return base
  }
  return DEFAULT_LANG
}

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  initAsync: false,
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n
