import { Code2, Clapperboard, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROFILES, type ProfileId } from '../../content/types'
import { getContent } from '../../content'
import { useLang } from '../../lib/useLang'
import { useProfile } from './store'

const icons: Record<ProfileId, typeof Code2> = {
  dev: Code2,
  security: ShieldCheck,
  audiovisual: Clapperboard,
}
const rank: Record<ProfileId, 'main' | 'rising' | 'secondary'> = {
  dev: 'main',
  security: 'rising',
  audiovisual: 'secondary',
}

export function ProfileSwitcher() {
  const { t } = useTranslation()
  const content = getContent(useLang())
  const profile = useProfile((s) => s.profile)
  const setProfile = useProfile((s) => s.setProfile)

  return (
    <div role="radiogroup" aria-label={t('profile.label')} className="grid gap-2 sm:grid-cols-3">
      {PROFILES.map((p) => {
        const Icon = icons[p]
        const active = p === profile
        return (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={active}
            data-profile={p}
            onClick={() => setProfile(p)}
            className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
              active
                ? 'border-accent bg-accent/10'
                : 'border-line bg-surface hover:border-accent/60'
            }`}
          >
            <Icon size={20} aria-hidden="true" className="shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{content.profiles[p].label}</span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                {t(`profile.${rank[p]}`)}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
