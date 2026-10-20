import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'
import { PENDING_REVIEW } from '../../i18n'
import { useHydrateStores } from '../../lib/useHydrateStores'
import { useLang } from '../../lib/useLang'
import { useProfile } from '../profiles/store'
import { Footer } from './Footer'
import { Header } from './Header'
import { useSmoothScroll } from './useSmoothScroll'

export function Layout() {
  const lang = useLang()
  const { t, i18n } = useTranslation()
  const profile = useProfile((s) => s.profile)

  useHydrateStores()
  useSmoothScroll()

  useEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang, i18n])

  return (
    <div data-profile={profile} className="flex min-h-dvh flex-col bg-bg text-fg">
      <a
        href="#main"
        className="sr-only z-50 rounded bg-accent px-4 py-2 font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('a11y.skip')}
      </a>
      <Header />
      {PENDING_REVIEW.includes(lang) && (
        <p className="no-print border-b border-line bg-surface-2 px-4 py-1.5 text-center text-xs text-muted">
          {t('lang.pending')}
        </p>
      )}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
