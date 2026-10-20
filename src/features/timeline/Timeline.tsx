import { BookOpen, Briefcase, Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/ui/Section'
import { getContent, sortedTimeline, type TimelineKind } from '../../content'
import { formatPeriod } from '../../lib/format'
import { Todo } from '../../lib/Todo'
import { useLang } from '../../lib/useLang'
import { useProfile } from '../profiles/store'

const icons: Record<TimelineKind, typeof BookOpen> = { education: BookOpen, work: Briefcase, credit: Film }

export function Timeline() {
  const { t } = useTranslation()
  const lang = useLang()
  const content = getContent(lang)
  const profile = useProfile((s) => s.profile)

  return (
    <Section id="timeline" eyebrow={t('timeline.eyebrow')} title={t('timeline.title')}>
      <ol className="relative ml-3 border-l border-line">
        {sortedTimeline().map((item) => {
          const text = content.timeline[item.id]
          const Icon = icons[item.kind]
          const relevant = item.profiles.includes(profile)
          const period = formatPeriod(item.start, item.end, lang, t('timeline.now'), item.current)
          return (
            <li key={item.id} className={`relative pb-8 pl-8 transition-opacity ${relevant ? '' : 'opacity-55'}`}>
              <span
                className={`absolute -left-3.5 top-0 grid h-7 w-7 place-items-center rounded-full border ${
                  relevant ? 'border-accent bg-accent text-accent-fg' : 'border-line bg-surface text-muted'
                }`}
                aria-hidden="true"
              >
                <Icon size={14} />
              </span>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {t(`timeline.${item.kind}`)}
                {period && ` · ${period}`}
              </p>
              <h3 className="mt-1 font-semibold">
                {text?.title}
                <Todo note={item.todo} />
              </h3>
              {item.org !== text?.title && <p className="text-sm text-muted">{item.org}</p>}
              {text?.detail && <p className="mt-1 max-w-2xl text-sm">{text.detail}</p>}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
