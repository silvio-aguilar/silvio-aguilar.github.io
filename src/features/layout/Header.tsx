import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { person } from '../../content/site'
import { langPath, useLang } from '../../lib/useLang'
import { LangSwitcher } from '../i18n/LangSwitcher'
import { ThemeToggle } from '../theme/ThemeToggle'

const anchors = ['credits', 'timeline', 'bio', 'contact'] as const

export function Header() {
  const { t } = useTranslation()
  const lang = useLang()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const linkCls = 'rounded px-2 py-1 text-sm text-muted transition-colors hover:text-fg'
  const nav = (
    <>
      {anchors.map((a) => (
        <Link key={a} to={{ pathname: langPath(lang), hash: `#${a}` }} className={linkCls} onClick={close}>
          {t(`nav.${a}`)}
        </Link>
      ))}
      {(['lab', 'cv'] as const).map((p) => (
        <NavLink
          key={p}
          to={langPath(lang, p)}
          onClick={close}
          className={({ isActive }) => `${linkCls} ${isActive ? 'text-fg underline decoration-accent decoration-2 underline-offset-4' : ''}`}
        >
          {t(`nav.${p}`)}
        </NavLink>
      ))}
    </>
  )

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to={langPath(lang)} className="flex items-center gap-2" onClick={close}>
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded bg-accent font-display text-sm font-bold text-accent-fg">
            SA
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-wide">{person.name}</span>
        </Link>
        <nav aria-label={t('a11y.menu')} className="ml-auto hidden items-center gap-1 lg:flex">
          {nav}
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex lg:ml-2">
          <LangSwitcher />
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="ml-auto rounded p-2 text-muted hover:text-fg sm:ml-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span className="sr-only">{open ? t('a11y.close') : t('a11y.menu')}</span>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-line bg-bg px-4 pb-4 lg:hidden">
          <nav aria-label={t('a11y.menu')} className="flex flex-col gap-1 py-3">
            {nav}
          </nav>
          <div className="flex flex-wrap gap-2 sm:hidden">
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
