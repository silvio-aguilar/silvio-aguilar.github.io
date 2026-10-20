import { useTranslation } from 'react-i18next'
import { Bio } from '../features/bio/Bio'
import { Contact } from '../features/contact/Contact'
import { Credits } from '../features/credits/Credits'
import { Hero } from '../features/hero/Hero'
import { LabTeaser } from '../features/lab/LabTeaser'
import { Stack } from '../features/stack/Stack'
import { Timeline } from '../features/timeline/Timeline'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function HomePage() {
  const { t } = useTranslation()
  useDocumentTitle(t('seo.title'))
  return (
    <>
      <Hero />
      <Credits />
      <Timeline />
      <Bio />
      <Stack />
      <LabTeaser />
      <Contact />
    </>
  )
}
