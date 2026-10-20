import { useTranslation } from 'react-i18next'
import { Section } from '../../components/ui/Section'
import { getContent } from '../../content'
import { securityTodo, stackGroups } from '../../content/stack'
import { Todo } from '../../lib/Todo'
import { useLang } from '../../lib/useLang'
import { useProfile } from '../profiles/store'

export function Stack() {
  const { t } = useTranslation()
  const content = getContent(useLang())
  const profile = useProfile((s) => s.profile)
  const groups = [...stackGroups].sort(
    (a, b) => Number(b.profiles.includes(profile)) - Number(a.profiles.includes(profile)),
  )

  return (
    <Section id="stack" eyebrow={t('stack.eyebrow')} title={t('stack.title')}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => {
          const relevant = g.profiles.includes(profile)
          return (
            <div
              key={g.id}
              className={`rounded-md border p-4 transition-colors ${relevant ? 'border-accent/70 bg-surface' : 'border-line bg-surface/60'}`}
            >
              <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide">
                {content.stackGroups[g.id]}
                {g.id === 'security' && <Todo note={securityTodo} />}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item.name} className="rounded bg-surface-2 px-2 py-1 text-xs">
                    {content.stackItems?.[item.name] ?? item.name}
                    {item.learning && <span className="ml-1 text-muted">· {t('stack.learning')}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
