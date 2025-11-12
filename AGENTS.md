# Agent Guidelines for Pásame el Código

## Build & Test Commands
- **Dev**: `pnpm dev` or `pnpm start` - Start development server
- **Build**: `pnpm build` - Runs `astro check` then builds (includes prebuild script for IndexNow)
- **Format**: `pnpm format` - Format code with Prettier
- **Preview**: `pnpm preview` - Preview production build locally
- **Type Check**: `astro check` - Run TypeScript type checking

## Code Style
- **Framework**: Astro with Starlight documentation framework, TypeScript strict mode
- **Formatting**: Prettier with plugins for Astro and Tailwind CSS (run `pnpm format` before committing)
- **Imports**: Use TypeScript path aliases: `@components/*`, `@code/*`, `@ejemplos/*`, `@assets/*`
- **Components**: Astro components (`.astro`), TypeScript for plugins (`.ts`), MDX for content (`.mdx`)
- **Naming**: kebab-case for files/directories, PascalCase for components, camelCase for variables/functions
- **Comments**: Spanish comments for temporary implementations or important notes (see Mermaid.astro:2-14)
- **Types**: Explicit types preferred, leverage TypeScript strict mode, use interfaces for data structures

## Content Guidelines
- **Language**: All content (docs, comments, commit messages) in Spanish
- **Location**: Documentation content goes in `src/content/docs/` organized by subject
- **Format**: Use MDX with frontmatter, support for math (MathJax) and diagrams (Mermaid)
- **Licenses**: Code examples follow individual file licenses; documentation under CC BY 4.0

## Important Notes
- This is an open-source educational website for University of A Coruña Computer Engineering courses
- Always preserve existing Spanish language in content and comments
- Check LICENSE.md and CONTRIBUTING.md for contribution guidelines
