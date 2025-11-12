# Agent Guidelines for Pásame el Código

## Build & Test Commands
- **Dev**: `pnpm dev` or `pnpm start` - Start development server at http://localhost:4321
- **Build**: `pnpm build` - Runs TypeScript checks (`astro check`) then builds (includes prebuild IndexNow script)
- **Format**: `pnpm format` - Format all files with Prettier (MUST run before committing)
- **Preview**: `pnpm preview` - Preview production build locally
- **Type Check**: `astro check` - Run TypeScript type checking without building
- **No Tests**: This project has no test suite; validation is done via TypeScript and build process

## Code Style & Conventions
- **Framework**: Astro 5 with Starlight documentation theme, TypeScript strict mode enabled
- **Formatting**: Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` - auto-formats `.astro`, `.ts`, `.mdx`
- **Imports**: Use TypeScript path aliases from `tsconfig.json`: `@components/*`, `@code/*`, `@ejemplos/*`, `@assets/*`
- **Naming**: kebab-case for files/dirs, PascalCase for components, camelCase for variables/functions
- **Types**: Always use explicit types; leverage strict mode; prefer interfaces over types for data structures
- **Error Handling**: No specific pattern; errors should surface during build with TypeScript or Astro checks
- **Comments**: Spanish comments for important notes or complex logic; keep inline docs minimal

## Git Commit Convention
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:` prefixes (see recent git log)
- All commit messages and PR descriptions in Spanish
- Examples: `feat: add X feature`, `fix: correct Y behavior`, `chore: update dependencies`

## Content & Documentation
- **Language**: ALL content, docs, comments, and commits in Spanish (this is a Spanish-language educational site)
- **Location**: Content lives in `src/content/docs/` organized by subject (prouno, prodos, algo, deese, pepe, bede, eseo)
- **Format**: Use MDX with YAML frontmatter; supports math (MathJax via remark-math/rehype-mathjax) and diagrams (Mermaid)
- **Licenses**: Documentation under CC BY 4.0; code examples may have individual licenses (check file headers)

## Important Context
- Open-source educational site for University of A Coruña Computer Engineering degree courses
- Uses Starlight plugins: heading badges, sidebar topics, DocSearch (Algolia), link validator
- Custom Expressive Code plugin for code output (`src/ec-output-plugin.ts`)
- Deployed to Vercel with analytics (Vercel Web Analytics + Umami self-hosted)
- See CONTRIBUTING.md for contribution guidelines
