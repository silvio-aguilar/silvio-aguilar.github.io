import { featured, getContent, sortedTimeline, type Lang } from '../../content'
import { stackGroups } from '../../content/stack'

/** Single source for the CV page and the generated PDF. */
export function cvData(lang: Lang) {
  const content = getContent(lang)
  const items = sortedTimeline().map((i) => ({ ...i, text: content.timeline[i.id] }))
  return {
    content,
    experience: items.filter((i) => i.kind !== 'education'),
    education: items.filter((i) => i.kind === 'education'),
    projects: featured
      .filter((p) => p.knownFor.includes('dev') || p.knownFor.includes('security'))
      .map((p) => ({ ...p, text: content.projects[p.slug] })),
    skills: stackGroups.map((g) => ({
      label: content.stackGroups[g.id] ?? g.id,
      items: g.items.map((it) => content.stackItems?.[it.name] ?? it.name),
    })),
  }
}

export const cvPdfPath = (lang: Lang) => `/cv/silvio-aguilar-cv-${lang}.pdf`
