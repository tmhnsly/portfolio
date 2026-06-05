# Working in this repo

Tom Hinsley's portfolio. **Domain language lives in [CONTEXT.md](CONTEXT.md)** (Discipline, Zone, Project, Post, Media, Shell, Bloom, etc.) — read it first. Content-authoring frontmatter is in [docs/schema.md](docs/schema.md). Decisions not to re-litigate are in `docs/adr/`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (`strict` + `noUncheckedIndexedAccess`) · SCSS modules · Radix Colors · motion 12 · Zod 4 · react-markdown · Vitest. Package manager **pnpm**, Node **20**.

## Commands

```
pnpm dev         # local dev
pnpm build       # production build (SSG)
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
pnpm test        # vitest run
```

CI (`.github/workflows/ci.yml`) runs typecheck + lint + test + build on every push and PR. Run them locally before pushing.

## Where things live

- `content/projects/*.md`, `content/blog/*.md` — the corpus (markdown + Zod frontmatter).
- `src/app` — routes. `src/lib` — content queries, `schemas` (Zod), `zone`, `disciplines`, `facets`, etc.
- `src/components` — grouped by domain: `layout`, `home`, `section`, `project`, `blog`, `about`, plus shared `ui` and `motion`. Bespoke project thumbnails in `project-thumbs`.
- `src/data` — editable copy + config (`copy.ts`, `site.ts`, `sections.ts`, `timeline.ts`, …).

## Conventions

- **Copy** — terse, no em dashes, never overstate scope. Editable strings live in `src/data/copy.ts` (+ `sections.ts` for per-Discipline CTAs); keep wording there, not inline.
- **Colour** — always Radix hue CSS vars (`var(--orange-9)` etc.), never fixed hex, so everything is theme-aware (light/dark). A Discipline maps to a hue in `lib/disciplines.ts`; the Zone resolves the `--accent` tokens. To recolour a hue, also import its scale in `app/layout.tsx`.
- **Server vs client** — default to server components; add `'use client'` only for hooks/interactivity. The Markdown renderer and `Chart` are server components (keeps `react-markdown` out of the client bundle).
- **Charts in posts** — a fenced ` ```chart ` block of JSON renders `ui/Chart` (Radix-coloured bars). See `docs/schema.md`.
- **Content reads** — `lib/content.ts` re-reads markdown on every call in dev (edits show without a restart) and memoises in production.
- **SSR-safe client reads** — reading `matchMedia` / intersection / a cached image's `complete` flag is done in an effect with a targeted `// eslint-disable-next-line react-hooks/set-state-in-effect` + comment. That's intentional, not a smell.
- **Images** — `next/image` via the `ui/Media` wrapper with an `IMG_SIZES` recipe; a pre-commit hook optimises new images to WebP.
- **Covers** — `ProjectThumb` / `PostThumb` resolve a cover: a bespoke vignette (project-thumbs registry / `BlogThumb` motif), else the image, else the Discipline gradient.

## Known, deliberate

- The fixed **Bloom** keeps a small Firefox repaint cost — owner's call, don't re-investigate.
- Solid accent chips (pills/CTAs, white on Radix step-9) intentionally miss WCAG AA contrast — kept for the brand look.
- Favicon is `src/app/icon.svg` (the code pixel-glyph).
