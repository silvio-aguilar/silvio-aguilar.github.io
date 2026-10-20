import type { ReactNode } from 'react'

interface Option<T extends string> {
  value: T
  label: ReactNode
  title?: string
}

interface Props<T extends string> {
  label: string
  value: T
  options: Option<T>[]
  onChange: (v: T) => void
  size?: 'sm' | 'md'
}

/** Accessible radio group rendered as buttons. */
export function SegmentedControl<T extends string>({ label, value, options, onChange, size = 'sm' }: Props<T>) {
  const pad = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-md border border-line bg-surface p-0.5">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`${pad} inline-flex items-center gap-1 rounded font-medium transition-colors ${
              active ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
