import { useTranslation } from 'react-i18next'
import { person, socialLinks } from '../../content/site'
import { ExternalLink } from '../../components/ui/ExternalLink'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {person.name} · <span className="font-mono">{person.alias}</span> · «{person.motto}»
        </p>
        <ul className="flex flex-wrap gap-4">
          {socialLinks.map((l) => (
            <li key={l.id}>
              <ExternalLink href={l.url} className="hover:text-fg" srHint={t('a11y.external')}>
                {l.label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <ExternalLink href="https://github.com/silvio-aguilar/silvio-aguilar.github.io" className="hover:text-fg" srHint={t('a11y.external')}>
              {t('footer.source')}
            </ExternalLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}
