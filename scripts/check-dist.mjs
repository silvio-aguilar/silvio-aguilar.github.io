/**
 * Privacy gate for the build output. Fails when dist/ contains placeholder
 * markers or anything that looks like an email address or phone number.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const TEXT = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.webmanifest'])

const rules = [
  { name: 'placeholder', re: /\bTODO\b|CONFIRMAR/g, exts: TEXT },
  { name: 'email', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g, exts: TEXT },
  // International / Spanish phone formats. JS bundles only get the +34 rule (minified numbers cause noise).
  { name: 'phone', re: /\+\s?34[\s.-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{3}/g, exts: TEXT },
  { name: 'phone', re: /(?<![\d.#-])[6789]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}(?![\d.])/g, exts: new Set(['.html', '.json', '.xml', '.txt']) },
]

// Known-safe matches (e.g. npm scoped names inside library code)
const allow = [/^[\w.-]+@\d/, /@(?:react-three|fontsource|vitejs|tailwindcss)/]

const files = []
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else files.push(p)
  }
}
walk(DIST)

const problems = []
for (const file of files) {
  const ext = extname(file)
  if (!TEXT.has(ext)) continue
  const text = readFileSync(file, 'utf8')
  for (const { name, re, exts } of rules) {
    if (!exts.has(ext)) continue
    for (const m of text.matchAll(re)) {
      if (allow.some((a) => a.test(m[0]))) continue
      const at = text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).replace(/\s+/g, ' ')
      problems.push(`${name.padEnd(11)} ${relative(DIST, file)}: …${at}…`)
    }
  }
}

if (problems.length) {
  console.error(`check-dist: ${problems.length} problem(s)\n` + problems.slice(0, 50).join('\n'))
  process.exit(1)
}
console.log(`check-dist: ${files.length} files clean`)
