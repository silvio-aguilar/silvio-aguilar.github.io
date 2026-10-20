import type { ReactNode } from 'react'

interface Props {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
  aside?: ReactNode
}

export function Section({ id, eyebrow, title, children, aside }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          {eyebrow && (
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          )}
          <h2 id={`${id}-title`} className="font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
            <span aria-hidden="true" className="mr-3 inline-block h-6 w-1.5 translate-y-0.5 bg-accent sm:h-7" />
            {title}
          </h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}
