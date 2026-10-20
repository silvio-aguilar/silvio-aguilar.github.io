import featuredJson from './featured.json'
import reposJson from './generated/repos.json'
import timelineJson from './timeline.json'
import de from './locales/de'
import en from './locales/en'
import es from './locales/es'
import type {
  FeaturedProject,
  GithubRepo,
  Lang,
  LocalizedContent,
  ProfileId,
  TimelineItem,
} from './types'

const byLang: Record<Lang, LocalizedContent> = { es, en, de }

export const featured = featuredJson as FeaturedProject[]
export const timeline = timelineJson as TimelineItem[]
export const repos = reposJson as GithubRepo[]

export function getContent(lang: Lang): LocalizedContent {
  return byLang[lang]
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Matches a featured project with a public repo by explicit name or normalized slug. */
export function findRepo(project: FeaturedProject): GithubRepo | undefined {
  const wanted = project.links.repo ? normalize(project.links.repo) : normalize(project.slug)
  return repos.find((r) => normalize(r.name) === wanted)
}

export function projectsFor(profile: ProfileId): FeaturedProject[] {
  return featured.filter((p) => p.profiles.includes(profile))
}

export function knownFor(profile: ProfileId): FeaturedProject[] {
  return featured.filter((p) => p.knownFor.includes(profile))
}

/** Public repos not already shown as featured projects. */
export function otherRepos(): GithubRepo[] {
  const taken = new Set(featured.map((p) => findRepo(p)?.name).filter(Boolean))
  return repos.filter((r) => !taken.has(r.name) && r.name !== 'silvio-aguilar.github.io')
}

/** Sort key: newest first, undated entries last. */
export function sortedTimeline(): TimelineItem[] {
  return [...timeline].sort((a, b) => (b.start ?? '0').localeCompare(a.start ?? '0'))
}

export * from './types'
