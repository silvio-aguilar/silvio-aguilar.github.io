import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../components/ui/Section'
import { DrumPad } from '../features/lab/DrumPad'
import { PaletteExtractor } from '../features/lab/PaletteExtractor'
import { PatternGenerator } from '../features/lab/PatternGenerator'
import { useDocumentTitle } from '../lib/useDocumentTitle'

function Demo({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <article className="rounded-md border border-line bg-surface p-5">
      <h2 className="font-display text-xl font-semibold uppercase">{title}</h2>
      <p className="mb-4 text-sm text-muted">{desc}</p>
      {children}
    </article>
  )
}

export default function LabPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('seo.labTitle'))
  return (
    <Section id="lab" eyebrow={t('lab.eyebrow')} title={t('lab.title')}>
      <p className="mb-8 max-w-2xl text-muted">{t('lab.intro')}</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Demo title={t('lab.palette.title')} desc={t('lab.palette.desc')}>
          <PaletteExtractor />
        </Demo>
        <Demo title={t('lab.pattern.title')} desc={t('lab.pattern.desc')}>
          <PatternGenerator />
        </Demo>
        <Demo title={t('lab.drum.title')} desc={t('lab.drum.desc')}>
          <DrumPad />
        </Demo>
      </div>
    </Section>
  )
}
