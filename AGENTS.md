# Agent Guidelines for Pásame el Código

## Environment
- **Node**: v24.16.0 (see `.node-version`)
- **Package manager**: `pnpm` only (lockfile is `pnpm-lock.yaml`)
- **Env**: `.env` contains `INDEXNOW_KEY` used by the prebuild script to create a verification file under `public/`

## Commands
- **Dev**: `pnpm dev` → dev server at http://localhost:4321
- **Build**: `pnpm build` → runs `indexnow.js` prebuild, then `astro check` + `astro build`
- **Format**: `pnpm format` → Prettier (run before committing)
- **Type check only**: `astro check`
- **No test suite** — validation is via TypeScript + build

## Framework & Tooling
- **Astro 6** + Starlight 0.39 (static output, Vercel adapter)
- **TypeScript strict mode** (extends `astro/tsconfigs/strict`)
- **Path aliases**: `@components/*`, `@code/*`, `@ejemplos/*`, `@assets/*` (see `tsconfig.json`)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` Vite plugin + custom CSS in `src/styles/global.css` and `src/assets/custom.css`

## Content (MDX)
- All content, docs, comments, commits, and PRs in **Spanish**
- Content lives in `src/content/docs/`, organized by subject: `prouno`, `prodos`, `algo`, `deese`, `pepe`, `bede`, `eseo`, `intro`, `opensource`
- Frontmatter: `title` and `description` fields are standard
- Supports MathJax (`remark-math` / `rehype-mathjax`) and Mermaid diagrams
- Docs license: CC BY 4.0; individual code examples may have their own license (check file headers for `@license` / `SPDX-License-Identifier`)

## Custom Code Block Features
- **`withOutput` meta**: Add to a code fence to separate code from expected output. Lines starting with `> ` are shown as code; lines after a blank line become output rendered in a separate `pre.output` block. See `src/ec-output-plugin.ts`.
- **Pseudocódigo language**: A custom Shiki language defined in `src/pseudocodigo.json`, loaded in `astro.config.mjs`. Use `` ```pseudocodigo `` in MDX files.

## Git Conventions
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- All commit messages and PR descriptions in Spanish

## Starlight Plugins
- heading badges, sidebar topics, Algolia DocSearch, link validator (invalid hashes set to warn, not error), Mermaid
- Custom override: `SkipLink` component at `src/components/SkipLink.astro`

## Deployment
- Vercel with static output + Vercel Web Analytics
- Site: https://pc.pablopl.dev
- CI (`.github/workflows/indexing.yml`): on push to `main`, waits for Vercel deploy, then submits to Bing IndexNow and Google Indexing API
