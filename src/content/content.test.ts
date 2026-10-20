import { describe, expect, it } from 'vitest'
import de from '../i18n/locales/de.json'
import en from '../i18n/locales/en.json'
import es from '../i18n/locales/es.json'
import { featured, getContent, timeline } from '.'
import { stackGroups } from './stack'
import { LANGS } from './types'

const keys = (o: object, prefix = ''): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
  )

describe('content', () => {
  it.each(LANGS)('has texts for every project, timeline item and stack group (%s)', (lang) => {
    const c = getContent(lang)
    for (const p of featured) expect(c.projects[p.slug], p.slug).toBeDefined()
    for (const t of timeline) expect(c.timeline[t.id], t.id).toBeDefined()
    for (const g of stackGroups) expect(c.stackGroups[g.id], g.id).toBeDefined()
  })

  it('has unique slugs and ids', () => {
    expect(new Set(featured.map((p) => p.slug)).size).toBe(featured.length)
    expect(new Set(timeline.map((t) => t.id)).size).toBe(timeline.length)
  })

  it('keeps UI translations in sync', () => {
    expect(keys(en).sort()).toEqual(keys(es).sort())
    expect(keys(de).sort()).toEqual(keys(es).sort())
  })

  it('never ships contact details in content', () => {
    const all = JSON.stringify([featured, timeline, ...LANGS.map(getContent)])
    expect(all).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i)
    expect(all).not.toMatch(/\+34|\b[6789]\d{8}\b/)
  })
})
