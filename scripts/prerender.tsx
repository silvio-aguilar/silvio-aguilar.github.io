/**
 * Static prerender for GitHub Pages: writes one real HTML file per language and page
 * (served with 200), a language-detecting root, a genuine 404.html, sitemap.xml,
 * robots.txt and the CV PDFs. Runs after `vite build` and `vite build --ssr`.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { writeCvPdf } from './lib/cvPdf'
import { LANGS, SITE_URL, alternates, csp, esc, jsonLd, ogLocale, pagePath, sha256, type Lang, type Page } from './lib/seo'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

type Ssr = typeof import('../src/entry-server')
const ssr = (await import(pathToFileURL(ssrEntry).href)) as Ssr

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const themeScript = /<script id="theme-init">([\s\S]*?)<\/script>/.exec(template)?.[1] ?? ''

const redirectScript =
  "(function(){var s=['es','en','de'],l=null;try{l=localStorage.getItem('lang')}catch(e){}if(s.indexOf(l)<0){l='es';var n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var b=(n[i]||'').slice(0,2).toLowerCase();if(s.indexOf(b)>=0){l=b;break}}}location.replace('/'+l+'/')})()"

const sameAs = [
  'https://github.com/silvio-aguilar',
  'https://www.linkedin.com/in/silvio-aguilar',
  'https://www.instagram.com/kurzerhand',
  'https://bguardian.app',
  'https://top-word.impulsa-tu.com',
]
const knowsAbout = ['Flutter', 'React Native', 'React', 'TypeScript', 'Firebase', 'Supabase', 'Kotlin', 'Unity', 'Cybersecurity', 'Kali Linux']

function write(path: string, html: string) {
  const file = resolve(dist, `.${path}`, path.endsWith('.html') ? '' : 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

interface PageOpts {
  lang: Lang
  page: Page | null
  url: string
  route: string
  title: string
  description: string
  extraScripts?: string[]
  noindex?: boolean
}

async function build(o: PageOpts): Promise<string> {
  const appHtml = await ssr.render(o.url, o.lang)
  const scripts = [themeScript, ...(o.extraScripts ?? [])]
  const canonical = o.page === null ? '' : `${SITE_URL}${pagePath(o.lang, o.page)}`
  const t = ssr.resources[o.lang].translation
  const head = [
    `<meta http-equiv="Content-Security-Policy" content="${csp(scripts.map(sha256))}" />`,
    `<meta name="referrer" content="strict-origin-when-cross-origin" />`,
    `<meta name="description" content="${esc(o.description)}" />`,
    `<meta name="author" content="Silvio Aguilar" />`,
    o.noindex ? '<meta name="robots" content="noindex" />' : '',
    canonical ? `<link rel="canonical" href="${canonical}" />` : '',
    o.page !== null && !o.noindex ? alternates(o.page) : '',
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="Silvio Aguilar" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${canonical || SITE_URL + '/'}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${ogLocale[o.lang]}" />`,
    ...LANGS.filter((l) => l !== o.lang).map((l) => `<meta property="og:locale:alternate" content="${ogLocale[l]}" />`),
    `<meta property="profile:first_name" content="Silvio" />`,
    `<meta property="profile:last_name" content="Aguilar" />`,
    `<meta property="profile:username" content="kurzerhand" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    o.page === '' || o.page === null ? jsonLd(o.lang, t.seo.title.split('|')[1]?.trim() ?? '', sameAs, knowsAbout) : '',
    ...(o.extraScripts ?? []).map((s) => `<script>${s}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ')

  return template
    .replace('<html lang="es"', `<html lang="${o.lang}" data-route="${o.route}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(o.title)}</title>`)
    .replace('<!--head-meta-->', head)
    .replace('<!--app-html-->', appHtml)
}

const pages: Page[] = ['', 'cv', 'lab']
const sitemap: string[] = []

for (const lang of LANGS) {
  const seo = ssr.resources[lang].translation.seo
  const titles: Record<Page, string> = { '': seo.title, cv: seo.cvTitle, lab: seo.labTitle }
  for (const page of pages) {
    const path = pagePath(lang, page)
    write(path, await build({ lang, page, url: path, route: path, title: titles[page], description: seo.description }))
    sitemap.push(
      `<url><loc>${SITE_URL}${path}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${pagePath(l, page)}"/>`).join('')}</url>`,
    )
  }
}

// Root: Spanish content for crawlers without JS, instant redirect to the preferred language.
{
  const seo = ssr.resources.es.translation.seo
  const html = await build({ lang: 'es', page: null, url: '/es/', route: 'root', title: seo.title, description: seo.description, extraScripts: [redirectScript] })
  writeFileSync(resolve(dist, 'index.html'), html)
}

// Real 404 (GitHub Pages serves it with status 404).
{
  const seo = ssr.resources.es.translation.seo
  write('/404.html', await build({ lang: 'es', page: null, url: '/es/404/', route: '/404', title: seo.notFoundTitle, description: seo.description, noindex: true }))
}

writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.join('\n')}\n</urlset>\n`,
)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

// CV PDFs from the same data as the CV page.
mkdirSync(resolve(dist, 'cv'), { recursive: true })
for (const lang of LANGS) {
  const t = ssr.resources[lang].translation
  const data = ssr.cvData(lang)
  await writeCvPdf(resolve(dist, `cv/silvio-aguilar-cv-${lang}.pdf`), {
    lang,
    labels: t.cv,
    now: t.timeline.now,
    headline: data.content.headline,
    summary: data.content.cv.summary,
    experience: data.experience,
    education: data.education,
    projects: data.projects,
    skills: data.skills,
    languages: data.content.languages,
    links: sameAs.map((url) => ({ url, label: url.replace(/^https:\/\/(www\.)?/, '') })),
  })
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`[prerender] ${LANGS.length * pages.length} pages, root, 404, sitemap, robots, ${LANGS.length} PDFs`)
