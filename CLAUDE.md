# CLAUDE.md

Portfolio platform deployed to GitHub Pages (user site, no CNAME). Vite 8 + React 19 + TypeScript (strict).

## Commands

Node 22 (`.nvmrc`).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 (fetches public repos once if missing) |
| `npm run build` | `tsc -b` → fetch repos → client build → SSR build → `scripts/prerender.tsx` |
| `npm run preview` | Serve `dist/` on :4173 |
| `npm run lint` / `npm run format` / `npm run format:check` | ESLint / Prettier |
| `npm test` | Vitest (jsdom) |
| `npm run check:dist` | Privacy gate over `dist/` (placeholder markers, emails, phones) |
| `npm run repos` | Refresh `src/content/generated/repos.json` from the GitHub API |

CI (`.github/workflows/deploy.yml`) runs gitleaks on the full history, audit, lint, format, tests, build and
check-dist on every push/PR; it deploys only from `main`. Work on feature branches; never push to `main`
without the owner's go-ahead.

## Constraints

- TypeScript is pinned to 6.0.x: typescript-eslint 8.x does not support 7. Do not upgrade.
- Do not change the git identity.
- `legacy-source/` and prompt/brief files are gitignored and private: never copy their contents into
  code, comments, commits or the build.
- Never publish contact details (no email or phone in code or HTML; contact goes through Formspree).
- Never invent credits, dates, clients or figures. Missing data → `todo` field in content, rendered
  by `<Todo>` only in development. `check-dist` fails the build if a marker reaches `dist/`.

## Architecture

```
src/
  app/routes.tsx          /:lang/{,cv,lab}, root redirect, 404
  components/ui/          presentational only, no app state
  config/                 external endpoints (Formspree)
  content/                ALL content, typed
    types.ts              Lang, ProfileId, data shapes
    site.ts               brand, links, per-profile accents
    featured.json         projects (language-neutral: order, profiles, stack, links)
    timeline.json         education/work/credits (language-neutral)
    stack.ts              stack by area
    locales/<lang>.ts     every human-readable content string per language
    repos.config.ts       public repos hidden from the auto list
    generated/            build output of scripts/fetch-repos.ts (gitignored)
  features/<feature>/     hero, credits, timeline, bio, stack, contact, cv, lab, layout, profiles, theme, i18n
  i18n/                   i18next setup + UI strings in locales/<lang>.json (typed keys)
  lib/                    hooks and helpers
  pages/                  route components
  entry-server.tsx        SSR entry used only by the prerender script
scripts/                  fetch-repos, prerender (+ SEO/CSP helpers, CV PDF), check-dist
```

- **Profiles** (`dev`, `security`, `audiovisual`) live in a Zustand store; switching changes content,
  `data-profile` accent tokens and the 3D scene without navigation.
- **Theme**: inline `#theme-init` script in `index.html` sets `data-theme` before paint; the store syncs
  from it after hydration. Stores are hydrated in `useHydrateStores` so prerendered HTML matches.
- **Prerender**: every route is written as real HTML (status 200 on Pages); `404.html` is a genuine 404.
  The CSP meta is generated with sha256 hashes of the inline scripts; if you add or change an inline
  script, it is hashed automatically, but never add inline event handlers.
- **3D** (`features/hero/Scene.tsx`) is lazy: idle-loaded on desktop, on tap on touch devices, never with
  `prefers-reduced-motion`. The static SVG poster is the fallback and LCP-safe.
- **CV**: `features/cv/cvData.ts` feeds both the CV page and the PDFs (`scripts/lib/cvPdf.tsx`).

## Adding things

- **Language**: add `src/i18n/locales/<xx>.json` and `src/content/locales/<xx>.ts`, register them in
  `LANGS` (`content/types.ts`), `content/index.ts`, `i18n/index.ts` and `scripts/lib/seo.ts`.
  Tests fail if UI keys diverge between languages.
- **Project**: entry in `featured.json` + text in every `content/locales/*.ts`; screenshots in
  `public/projects/<slug>/` and set `image`.
- **Lab demo**: component in `features/lab/`, register it in `pages/LabPage.tsx`, strings in all locales.

## Conventions

- Tailwind v4 with tokens in `src/index.css` (`bg`, `surface`, `line`, `fg`, `muted`, `accent`). Use tokens,
  not raw colours. Contrast must stay WCAG AA in both themes.
- External links: `components/ui/ExternalLink` (adds `rel="noopener noreferrer"`).
- Never use `innerHTML`/`dangerouslySetInnerHTML` with data.
- Prettier: no semicolons, single quotes, width 100.
