import { useParams } from 'react-router'
import { DEFAULT_LANG, type Lang } from '../content/types'
import { isLang } from '../i18n'

export function useLang(): Lang {
  const { lang } = useParams()
  return isLang(lang) ? lang : DEFAULT_LANG
}

export const langPath = (lang: Lang, page: '' | 'cv' | 'lab' = '') =>
  page ? `/${lang}/${page}/` : `/${lang}/`
