import { ArrowRight, FileText, MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Badge } from '../../components/ui/Badge'
import { buttonVariants } from '../../components/ui/buttonStyles'
import { getContent, knownFor } from '../../content'
import { person } from '../../content/site'
import { langPath, useLang } from '../../lib/useLang'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { projectView } from '../credits/projectMeta'
import { ProfileSwitcher } from '../profiles/ProfileSwitcher'
import { useProfile } from '../profiles/store'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const { t } = useTranslation()
  const lang = useLang()
  const content = getContent(lang)
  const profile = useProfile((s) => s.profile)
  const reduced = usePrefersReducedMotion()
  const p = content.profiles[profile]
  const items = knownFor(profile)

  const fade = reduced
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 } }

  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[260px_1fr] md:py-14 lg:grid-cols-[300px_1fr]">
        {/* Poster */}
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-md border border-line bg-bg md:max-w-none">
          <HeroVisual />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{t('profile.label')}</p>
            <p className="font-display text-xl font-semibold uppercase">{p.label}</p>
          </div>
        </div>

        {/* Ficha */}
        <div className="min-w-0">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {person.alias} · {content.headline}
          </p>
          <h1 id="hero-title" className="font-display text-5xl font-bold uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            {person.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" /> {t('hero.basedIn')}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t('hero.languages')}: {content.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
            </span>
          </div>
          <p className="mt-3 font-display text-lg uppercase tracking-widest text-accent">«{person.motto}»</p>

          <div className="mt-6">
            <ProfileSwitcher />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={profile} {...fade} aria-live="polite">
              <p className="mt-5 max-w-2xl text-base leading-relaxed">
                <strong className="font-semibold">{p.tagline}.</strong> {p.summary}
              </p>

              <h2 className="mt-7 mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">{t('hero.knownFor')}</h2>
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {items.map((item) => {
                  const text = content.projects[item.slug]
                  const { status, year } = projectView(item)
                  return (
                    <li key={item.slug}>
                      <a href={`#credit-${item.slug}`} className="group block h-full rounded-md border border-line bg-bg p-3 transition-colors hover:border-accent">
                        <span className="mb-2 block h-1 w-8 bg-accent transition-all group-hover:w-14" aria-hidden="true" />
                        <span className="block font-semibold leading-tight">{text?.title}</span>
                        <span className="mt-1 block text-xs text-muted">
                          {[text?.role, year].filter(Boolean).join(' · ')}
                        </span>
                        {status && (
                          <span className="mt-2 block">
                            <Badge tone="outline">{t(`status.${status}`)}</Badge>
                          </span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={{ pathname: langPath(lang), hash: '#contact' }} className={buttonVariants.primary}>
              {t('hero.contact')} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to={langPath(lang, 'cv')} className={buttonVariants.secondary}>
              <FileText size={16} aria-hidden="true" /> {t('hero.viewCv')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
