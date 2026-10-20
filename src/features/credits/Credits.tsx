import { ExternalLink as ExternalIcon, FolderGit2, Globe, Lock, Star } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '../../components/ui/Badge'
import { ExternalLink } from '../../components/ui/ExternalLink'
import { Section } from '../../components/ui/Section'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { featured, getContent, otherRepos, projectsFor } from '../../content'
import { Todo } from '../../lib/Todo'
import { useLang } from '../../lib/useLang'
import { useProfile } from '../profiles/store'
import { projectView } from './projectMeta'

export function Credits() {
  const { t } = useTranslation()
  const lang = useLang()
  const content = getContent(lang)
  const profile = useProfile((s) => s.profile)
  const [scope, setScope] = useState<'profile' | 'all'>('profile')

  const list = (scope === 'all' ? featured : projectsFor(profile))
    .map((p) => ({ p, view: projectView(p), text: content.projects[p.slug] }))
    .sort((a, b) => (b.view.year ?? 0) - (a.view.year ?? 0))
  const extra = otherRepos()

  return (
    <Section
      id="credits"
      eyebrow={t('credits.eyebrow')}
      title={t('credits.title')}
      aside={
        <SegmentedControl
          label={t('credits.title')}
          value={scope}
          onChange={setScope}
          size="md"
          options={[
            { value: 'profile', label: content.profiles[profile].label },
            { value: 'all', label: t('credits.all') },
          ]}
        />
      }
    >
      <ol className="divide-y divide-line border-y border-line">
        {list.map(({ p, view, text }) => (
          <li
            key={p.slug}
            id={`credit-${p.slug}`}
            className="grid scroll-mt-24 gap-3 py-5 sm:grid-cols-[4.5rem_1fr] md:grid-cols-[4.5rem_1fr_12rem]"
          >
            <p className="font-mono text-sm text-muted">{view.year ?? t('credits.noYear')}</p>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold">
                {text?.title ?? p.slug}
                <Todo note={p.todo} />
              </h3>
              <p className="mt-1 text-sm text-muted">{text?.logline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge tone="outline">{t(`category.${p.category}`)}</Badge>
                {p.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
                {text?.note && <Badge tone="accent">{text.note}</Badge>}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm sm:col-start-2 md:col-start-auto md:items-end md:text-right">
              {text?.role && <p className="font-medium">{text.role}</p>}
              {view.status && (
                <p className="inline-flex items-center gap-1 text-muted">
                  {view.status === 'private' && <Lock size={13} aria-hidden="true" />}
                  {t(`status.${view.status}`)}
                </p>
              )}
              <p className="flex flex-wrap gap-3 md:justify-end">
                {view.links.web && (
                  <ExternalLink
                    href={view.links.web}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                    srHint={t('a11y.external')}
                  >
                    <Globe size={14} aria-hidden="true" /> {t('links.web')}
                  </ExternalLink>
                )}
                {view.links.store && (
                  <ExternalLink
                    href={view.links.store}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                    srHint={t('a11y.external')}
                  >
                    <ExternalIcon size={14} aria-hidden="true" /> {t('links.store')}
                  </ExternalLink>
                )}
                {view.links.repo && (
                  <ExternalLink
                    href={view.links.repo}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                    srHint={t('a11y.external')}
                  >
                    <FolderGit2 size={14} aria-hidden="true" /> {t('links.repo')}
                  </ExternalLink>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {scope === 'all' && extra.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold uppercase">{t('credits.more')}</h3>
          <p className="mb-4 text-xs text-muted">{t('credits.moreHint')}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extra.map((r) => (
              <li key={r.name} className="rounded-md border border-line bg-surface p-4">
                <ExternalLink
                  href={r.url}
                  className="font-semibold hover:text-accent"
                  srHint={t('a11y.external')}
                >
                  {r.name}
                </ExternalLink>
                {r.description && <p className="mt-1 text-sm text-muted">{r.description}</p>}
                <p className="mt-2 flex gap-3 font-mono text-xs text-muted">
                  {r.language && <span>{r.language}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Star size={12} aria-hidden="true" /> {r.stars}
                    <span className="sr-only">{t('credits.stars')}</span>
                  </span>
                  <span>{r.pushedAt.slice(0, 4)}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
