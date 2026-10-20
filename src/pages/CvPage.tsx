import { Download, Printer } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../components/ui/buttonStyles'
import { person, productLinks, socialLinks } from '../content/site'
import { cvData, cvPdfPath } from '../features/cv/cvData'
import { formatPeriod } from '../lib/format'
import { Todo } from '../lib/Todo'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useLang } from '../lib/useLang'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid border-t border-line pt-5">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
      {children}
    </section>
  )
}

export default function CvPage() {
  const { t } = useTranslation()
  const lang = useLang()
  useDocumentTitle(t('seo.cvTitle'))
  const { content, experience, education, projects, skills } = cvData(lang)
  const period = (s?: string, e?: string, c?: boolean) => formatPeriod(s, e, lang, t('timeline.now'), c)

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="no-print mb-8 flex flex-wrap gap-3">
        <a href={cvPdfPath(lang)} download className={buttonVariants.primary}>
          <Download size={16} aria-hidden="true" /> {t('cv.download')}
        </a>
        <button type="button" onClick={() => window.print()} className={buttonVariants.secondary}>
          <Printer size={16} aria-hidden="true" /> {t('cv.print')}
        </button>
      </div>

      <header className="mb-6">
        <h1 className="font-display text-5xl font-bold uppercase">{person.name}</h1>
        <p className="mt-1 text-lg">{content.headline}</p>
        <p className="mt-1 text-sm text-muted">
          {person.alias} · {t('hero.basedIn')} · «{person.motto}»
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
          {[...socialLinks, ...productLinks].map((l) => (
            <a key={l.id} href={l.url} rel="noopener noreferrer" target="_blank" className="text-accent hover:underline">
              {l.url.replace(/^https:\/\/(www\.)?/, '')}
            </a>
          ))}
        </p>
      </header>

      <div className="space-y-6">
        <Block title={t('cv.summary')}>
          <p>{content.cv.summary}</p>
        </Block>

        <Block title={t('cv.experience')}>
          <ul className="space-y-3">
            {experience.map((i) => (
              <li key={i.id} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                <span className="font-mono text-sm text-muted">{period(i.start, i.end, i.current)}</span>
                <span>
                  <strong>{i.text?.title}</strong> — {i.org}
                  <Todo note={i.todo} />
                  {i.text?.detail && <span className="block text-sm text-muted">{i.text.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t('cv.education')}>
          <ul className="space-y-3">
            {education.map((i) => (
              <li key={i.id} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                <span className="font-mono text-sm text-muted">{period(i.start, i.end, i.current)}</span>
                <span>
                  <strong>{i.text?.title}</strong> — {i.org}
                  <Todo note={i.todo} />
                  {i.text?.detail && <span className="block text-sm text-muted">{i.text.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t('cv.projects')}>
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <strong>{p.text?.title}</strong>
                {p.stack.length > 0 && <span className="text-muted"> · {p.stack.join(', ')}</span>}
                <span className="block text-sm text-muted">{p.text?.logline}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t('cv.skills')}>
          <dl className="grid gap-2 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label}>
                <dt className="font-semibold">{g.label}</dt>
                <dd className="text-sm text-muted">{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title={t('cv.languages')}>
          <p>{content.languages.map((l) => `${l.name}: ${l.level}`).join(' · ')}</p>
        </Block>
      </div>
    </article>
  )
}
