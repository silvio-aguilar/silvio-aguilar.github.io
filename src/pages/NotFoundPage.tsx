import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { buttonVariants } from '../components/ui/buttonStyles'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { langPath, useLang } from '../lib/useLang'

export default function NotFoundPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('seo.notFoundTitle'))
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">{t('notFound.title')}</h1>
      <p className="mt-3 text-muted">{t('notFound.body')}</p>
      <Link to={langPath(useLang())} className={`${buttonVariants.primary} mt-8`}>
        {t('notFound.home')}
      </Link>
    </div>
  )
}
