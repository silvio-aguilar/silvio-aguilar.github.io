import { findRepo, type FeaturedProject } from '../../content'

export type DisplayStatus = NonNullable<FeaturedProject['status']> | 'public'

export function projectView(p: FeaturedProject) {
  const repo = findRepo(p)
  const links = {
    ...p.links,
    repo: p.links.repo ? `https://github.com/silvio-aguilar/${p.links.repo}` : repo?.url,
  }
  const status: DisplayStatus | undefined =
    p.status === 'published' ? 'published' : repo ? 'public' : p.status
  const year = p.year ?? (repo ? Number(repo.pushedAt.slice(0, 4)) : undefined)
  return { repo, links, status, year }
}
