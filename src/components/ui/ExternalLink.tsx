import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  srHint?: string
}

export function ExternalLink({ href, children, srHint, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      {srHint && <span className="sr-only"> {srHint}</span>}
    </a>
  )
}
