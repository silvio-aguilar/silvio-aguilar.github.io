import { create } from 'zustand'

export type ThemePref = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

const media = () =>
  typeof window === 'undefined' ? null : window.matchMedia('(prefers-color-scheme: dark)')

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref !== 'system') return pref
  return media()?.matches ? 'dark' : 'light'
}

function apply(pref: ThemePref) {
  const root = document.documentElement
  root.dataset.theme = resolveTheme(pref)
  root.dataset.themePref = pref
}

interface ThemeState {
  pref: ThemePref
  resolved: ResolvedTheme
  setPref: (p: ThemePref) => void
  /** Reads the value already applied by the inline <head> script. */
  sync: () => void
}

export const useTheme = create<ThemeState>()((set) => ({
  pref: 'system',
  resolved: 'dark',
  setPref: (pref) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, pref)
    } catch {
      /* storage unavailable */
    }
    apply(pref)
    set({ pref, resolved: resolveTheme(pref) })
  },
  sync: () => {
    const root = document.documentElement
    const pref = (root.dataset.themePref as ThemePref | undefined) ?? 'system'
    set({ pref, resolved: resolveTheme(pref) })
  },
}))

/** Keeps "system" in step with the OS setting. */
export function watchSystemTheme(): () => void {
  const mq = media()
  if (!mq) return () => {}
  const onChange = () => {
    const { pref } = useTheme.getState()
    if (pref === 'system') {
      apply('system')
      useTheme.setState({ resolved: resolveTheme('system') })
    }
  }
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
