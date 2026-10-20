import { FlaskConical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { buttonVariants } from '../../components/ui/buttonStyles'
import { langPath, useLang } from '../../lib/useLang'

export function LabTeaser() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col items-start gap-4 rounded-md border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t('lab.eyebrow')}
          </p>
          <p className="mt-1 max-w-xl text-muted">{t('lab.intro')}</p>
        </div>
        <Link to={langPath(useLang(), 'lab')} className={buttonVariants.secondary}>
          <FlaskConical size={16} aria-hidden="true" /> {t('lab.teaser')}
        </Link>
      </div>
    </div>
  )
}
