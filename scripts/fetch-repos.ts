/**
 * Fetches public, non-fork repositories from the GitHub API into
 * src/content/generated/repos.json. Uses GITHUB_TOKEN only when present (CI).
 * Never fails the build: on error it keeps the existing file (or writes []).
 *   --if-missing  only fetch when the file does not exist yet (used by `npm run dev`)
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const USER = 'silvio-aguilar'
const OUT = resolve(import.meta.dirname, '../src/content/generated/repos.json')

interface ApiRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  topics?: string[]
  fork: boolean
  private: boolean
  archived: boolean
}

async function main() {
  if (process.argv.includes('--if-missing') && existsSync(OUT)) return
  mkdirSync(dirname(OUT), { recursive: true })
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${USER}-portfolio-build`,
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`,
      {
        headers,
        signal: AbortSignal.timeout(15_000),
      },
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const data = (await res.json()) as ApiRepo[]
    const repos = data
      .filter((r) => !r.private && !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        topics: r.topics ?? [],
      }))
    writeFileSync(OUT, JSON.stringify(repos, null, 2) + '\n')
    console.log(`[repos] ${repos.length} public repositories`)
  } catch (err) {
    if (!existsSync(OUT)) writeFileSync(OUT, '[]\n')
    console.warn(`[repos] skipped: ${(err as Error).message}`)
  }
}

void main()
