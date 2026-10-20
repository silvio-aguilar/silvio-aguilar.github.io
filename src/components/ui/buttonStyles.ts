export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

export const buttonVariants = {
  primary: `${buttonBase} bg-accent text-accent-fg hover:brightness-110`,
  secondary: `${buttonBase} border border-line bg-surface text-fg hover:border-accent`,
  ghost: `${buttonBase} text-muted hover:text-fg`,
} as const
