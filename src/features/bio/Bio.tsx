import { useTranslation } from 'react-i18next'
import { Section } from '../../components/ui/Section'
import { getContent } from '../../content'
import { useLang } from '../../lib/useLang'

export function Bio() {
  const { t } = useTranslation()
  const content = getContent(useLang())
  return (
    <Section id="bio" eyebrow={t('bio.eyebrow')} title={t('bio.title')}>
      <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
        {content.bio.map((p, i) => (
          <p key={i} className={i === 0 ? 'text-xl' : 'text-muted'}>
            {p}
          </p>
        ))}
      </div>
    </Section>
  )
}
