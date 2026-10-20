export const LANGS = ['es', 'en', 'de'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'es'

export const PROFILES = ['dev', 'security', 'audiovisual'] as const
export type ProfileId = (typeof PROFILES)[number]

export type ProjectCategory = 'mobile' | 'web' | 'java' | 'games' | 'hardware' | 'ai' | 'film'
export type ProjectStatus = 'published' | 'private' | 'inDevelopment'

/** Language-neutral project data (featured.json). Texts live in content/locales/<lang>.ts. */
export interface FeaturedProject {
  slug: string
  profiles: ProfileId[]
  knownFor: ProfileId[]
  category: ProjectCategory
  year?: number
  stack: string[]
  status?: ProjectStatus
  links: { web?: string; store?: string; repo?: string; info?: string }
  /** Path under public/projects/<slug>/ */
  image?: string
  /** Dev-only note for missing data. Never rendered in production. */
  todo?: string
}

export type TimelineKind = 'education' | 'work' | 'credit'

export interface TimelineItem {
  id: string
  kind: TimelineKind
  profiles: ProfileId[]
  /** ISO-like "YYYY" or "YYYY-MM" */
  start?: string
  end?: string
  current?: boolean
  org: string
  todo?: string
}

export interface ProjectText {
  title: string
  logline: string
  role?: string
  note?: string
}

export interface TimelineText {
  title: string
  detail?: string
}

export interface StackGroup {
  id: string
  profiles: ProfileId[]
  items: { name: string; learning?: boolean }[]
}

export interface LocalizedContent {
  headline: string
  bio: string[]
  profiles: Record<ProfileId, { label: string; tagline: string; summary: string }>
  projects: Record<string, ProjectText>
  timeline: Record<string, TimelineText>
  stackGroups: Record<string, string>
  /** Optional translations for non-technical stack item names */
  stackItems?: Record<string, string>
  languages: { name: string; level: string }[]
  cv: { summary: string }
}

export interface GithubRepo {
  name: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  stars: number
  pushedAt: string
  topics: string[]
}
