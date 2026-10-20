import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../../components/ui/buttonStyles'
import { ExternalLink } from '../../components/ui/ExternalLink'
import { Section } from '../../components/ui/Section'
import { FORMSPREE_ENDPOINT } from '../../config/contact'
import { productLinks, socialLinks } from '../../content/site'
import { validateContact, type ContactErrors, type ContactValues } from './validate'

type State = 'idle' | 'sending' | 'ok' | 'error'

const fieldCls =
  'mt-1 block w-full rounded-md border border-line bg-surface px-3 py-2 text-fg placeholder:text-muted focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500'

export function Contact() {
  const { t } = useTranslation()
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [state, setState] = useState<State>('idle')

  const set = (k: keyof ContactValues) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (form.get('_gotcha')) return // honeypot: silently drop bots
    const errs = validateContact(values)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setState('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('ok')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const err = (k: keyof ContactValues) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
        {t(`contact.${errors[k]}`)}
      </p>
    )

  return (
    <Section id="contact" eyebrow={t('contact.eyebrow')} title={t('contact.title')}>
      <div className="grid gap-10 md:grid-cols-[1fr_16rem]">
        <form noValidate onSubmit={onSubmit} className="max-w-xl space-y-4">
          <p className="text-muted">{t('contact.intro')}</p>
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              {t('contact.name')}
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={fieldCls}
            />
            {err('name')}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              {t('contact.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={set('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={fieldCls}
            />
            {err('email')}
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={set('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={fieldCls}
            />
            {err('message')}
          </div>
          {/* Honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="_gotcha">Leave empty</label>
            <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={state === 'sending'} className={buttonVariants.primary}>
              <Send size={16} aria-hidden="true" />
              {state === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            <p role="status" className="text-sm">
              {state === 'ok' && t('contact.ok')}
              {state === 'error' && (
                <span className="text-red-600 dark:text-red-400">{t('contact.error')}</span>
              )}
            </p>
          </div>
          <p className="text-xs text-muted">{t('contact.privacy')}</p>
        </form>

        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {t('contact.networks')}
          </h3>
          <ul className="space-y-2">
            {[...socialLinks, ...productLinks].map((l) => (
              <li key={l.id}>
                <ExternalLink
                  href={l.url}
                  className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2 text-sm hover:border-accent"
                  srHint={t('a11y.external')}
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
