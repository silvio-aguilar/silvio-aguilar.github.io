import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { LANGS, type Lang } from '../../content/types'
import { LANG_NAMES, LANG_STORAGE_KEY, PENDING_REVIEW } from '../../i18n'
import { useLang } from '../../lib/useLang'

export function LangSwitcher() {
  const { t, i18n } = useTranslation()
  const lang = useLang()
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  const change = (next: Lang) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
    void i18n.changeLanguage(next)
    navigate(pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${next}`) + hash)
  }

  return (
    <SegmentedControl
      label={t('lang.label')}
      value={lang}
      onChange={change}
      options={LANGS.map((l) => ({
        value: l,
        title: PENDING_REVIEW.includes(l)
          ? `${LANG_NAMES[l]} · ${t('lang.pending')}`
          : LANG_NAMES[l],
        label: (
          <span lang={l}>
            {l.toUpperCase()}
            {PENDING_REVIEW.includes(l) && <sup aria-hidden="true">β</sup>}
          </span>
        ),
      }))}
    />
  )
}
