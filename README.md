# silvio-aguilar.github.io

Personal portfolio platform: one person, three switchable profiles (mobile development, cybersecurity,
audiovisual) presented as a film-industry style profile page.

**Live:** https://silvio-aguilar.github.io

## Stack

React 19 · TypeScript (strict) · Vite 8 · React Router · react-i18next (es / en / de) · Zustand ·
Tailwind CSS v4 · three.js + React Three Fiber · Lenis · Vitest + Testing Library.

Static prerendering for GitHub Pages, per-language routes with `hreflang`, JSON-LD, generated CV PDFs and
a CSP with hashed inline scripts.

## Development

```bash
nvm use        # Node 22
npm ci
npm run dev    # http://localhost:5173
```

`npm run build` produces the static site in `dist/`; `npm run preview` serves it. See `CLAUDE.md` for the
architecture and conventions.
