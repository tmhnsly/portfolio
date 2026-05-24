# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Tom Hinsley's portfolio site — six discipline hubs, project details, an interactive CV timeline, and a blog — in Next.js, matching the approved Claude Design mockups, running entirely on local Markdown + typed constants (no external CMS).

**Architecture:** Next.js App Router + TypeScript. SCSS Modules per component; CSS custom properties are the runtime token source so light/dark and per-discipline accent are pure variable swaps. A single TS `DISCIPLINES` map is the source of truth for the six hues; pages set `--accent`/bloom from it. Motion (Framer Motion) drives orchestrated animation, CSS drives ambient motion, both off a shared motion-token module. Content is Markdown (Zod-validated frontmatter) + typed TS constants in `src/data/`; Zod schemas are the source of truth for all types. Images are self-hosted under `public/images/` and rendered responsively via a `Media` (`next/image`) wrapper.

**Tech Stack:** Next.js (App Router), TypeScript (strict), Sass (SCSS Modules), `@radix-ui/colors`, `motion`, `next/font`, Vitest + React Testing Library, pnpm, Node 20.

**Reference:** Exact values, copy, layout and dimensions for every page are in `docs/design-reference/project/pages/*.jsx`. The spec is `docs/superpowers/specs/2026-05-24-portfolio-website-design.md`. These files exist in the repo — open the named prototype when a task says "match the prototype".

**Conventions for every task:** component lives in its own folder (`Component/Component.tsx` + `Component.module.scss` + `index.ts`). SCSS uses `var(--token)` only — never a raw px/hex that a token exists for. **SCSS `@use` of tokens/mixins must use RELATIVE paths** (e.g. `@use '../../styles/mixins/breakpoints' as *;`) — Next 16 uses Turbopack, which ignores `sassOptions.includePaths`, so bare paths like `'styles/tokens'` fail to resolve. **Every image surface renders through the `Media` component (Task 15b): responsive `next/image` when a `src` is present, the discipline gradient as fallback — never a bare `<img>`.** Image files live under `public/images/…`. Commit after each task with the message shown.

---

## Phase 0 — Scaffold & tooling

### Task 1: Scaffold the Next.js app

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.scss`

- [ ] **Step 1: Create the app non-interactively**

Run from repo root (it already contains `.gitignore`, `.nvmrc`, `docs/`):
```bash
pnpm dlx create-next-app@latest . --ts --app --src-dir --eslint --no-tailwind --import-alias "@/*" --use-pnpm --skip-install --yes
```
If it refuses because the dir is non-empty, scaffold in a temp dir and copy:
```bash
pnpm dlx create-next-app@latest /tmp/th-scaffold --ts --app --src-dir --eslint --no-tailwind --import-alias "@/*" --use-pnpm --skip-install --yes
cp -R /tmp/th-scaffold/{package.json,tsconfig.json,next.config.ts,eslint.config.mjs,next-env.d.ts} . 2>/dev/null
cp -R /tmp/th-scaffold/src/app/layout.tsx /tmp/th-scaffold/src/app/page.tsx src/app/ 2>/dev/null
```

- [ ] **Step 2: Add deps and dev tooling**

```bash
pnpm add motion @radix-ui/colors sass zod gray-matter react-markdown remark-gfm
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm install
```

- [ ] **Step 3: Rename the global stylesheet to SCSS**

Delete any `src/app/globals.css`; create `src/app/globals.scss` (empty for now — filled in Phase 1). Update the import in `src/app/layout.tsx` to `import './globals.scss';`.

- [ ] **Step 4: Configure Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```
Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```
Add scripts to `package.json`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run"
}
```

- [ ] **Step 5: Verify it boots**

Run: `pnpm typecheck && pnpm build`
Expected: type check passes; build succeeds with the default starter page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with sass, motion, radix, vitest"
```

---

## Phase 1 — Token & SCSS foundation

### Task 2: Define design tokens as CSS variables

**Files:**
- Create: `src/styles/tokens/_color.scss`, `_space.scss`, `_radius.scss`, `_type.scss`, `_shadow.scss`, `_motion.scss`, `_index.scss`

- [ ] **Step 1: `_color.scss`** — semantic, mode-aware (values from spec §3.1)

```scss
:root {
  --bg: #f0ece2;
  --bg-subtle: #ebe6d8;
  --surface: rgba(255, 253, 247, 0.78);
  --surface-soft: rgba(255, 253, 247, 0.55);
  --surface-edge: rgba(255, 255, 255, 0.85);
  --text: #1c1b18;
  --text-mid: rgba(28, 27, 24, 0.78);
  --text-soft: rgba(28, 27, 24, 0.62);
  --text-muted: rgba(28, 27, 24, 0.42);
  --text-on-accent: #ffffff;
  --rule-soft: rgba(28, 27, 24, 0.12);
  --rule: rgba(28, 27, 24, 0.24);
  --rule-strong: rgba(28, 27, 24, 0.36);
  --accent: #e54d2e;
  --accent-hover: #dd4425;
  --accent-subtle: #ffdcd3;
  --accent-glow: rgba(229, 77, 46, 0.22);
  --shadow-sm: 0 4px 12px rgba(28, 27, 24, 0.06);
  --shadow-md: 0 12px 30px rgba(28, 27, 24, 0.08);
  --shadow-lg: 0 22px 50px rgba(28, 27, 24, 0.14);
  --shadow-xl: 0 36px 70px rgba(28, 27, 24, 0.20);
}
:root[data-theme='dark'] {
  --bg: #161615;
  --bg-subtle: #1c1c1a;
  --surface: rgba(40, 40, 38, 0.65);
  --surface-soft: rgba(28, 28, 26, 0.55);
  --surface-edge: rgba(255, 255, 255, 0.08);
  --text: #ededec;
  --text-mid: rgba(237, 237, 236, 0.78);
  --text-soft: rgba(237, 237, 236, 0.62);
  --text-muted: rgba(237, 237, 236, 0.42);
  --rule-soft: rgba(255, 255, 255, 0.08);
  --rule: rgba(255, 255, 255, 0.16);
  --rule-strong: rgba(255, 255, 255, 0.32);
  --accent-hover: #ec6142;
  --accent-subtle: #4e1511;
  --accent-glow: rgba(229, 77, 46, 0.30);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.18);
  --shadow-md: 0 12px 30px rgba(0, 0, 0, 0.28);
  --shadow-lg: 0 22px 50px rgba(0, 0, 0, 0.40);
  --shadow-xl: 0 36px 70px rgba(0, 0, 0, 0.55);
}
```

- [ ] **Step 2: `_space.scss`, `_radius.scss`, `_shadow.scss` are folded into the scales**

`_space.scss`:
```scss
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-7: 32px; --space-8: 40px;
  --space-9: 48px; --space-10: 56px; --space-11: 64px; --space-12: 80px;
  --space-13: 96px; --space-14: 128px;
}
```
`_radius.scss`:
```scss
:root {
  --radius-xs: 4px; --radius-sm: 6px; --radius-md: 8px; --radius-lg: 10px;
  --radius-xl: 14px; --radius-2xl: 18px; --radius-3xl: 24px; --radius-full: 999px;
}
```
(`_shadow.scss` not needed — shadows are defined in `_color.scss` because they differ per mode.)

- [ ] **Step 3: `_type.scss`** (values from spec §3.2)

```scss
:root {
  --font-display: var(--font-space-grotesk), -apple-system, sans-serif;
  --font-mono: var(--font-space-mono), 'JetBrains Mono', ui-monospace, monospace;
  --fs-display-xxl: 156px; --fs-display-xl: 120px; --fs-display-l: 72px; --fs-display: 56px;
  --fs-h1: 42px; --fs-h2: 28px; --fs-h3: 22px; --fs-h4: 18px;
  --fs-body-l: 19px; --fs-body: 16px; --fs-body-s: 14px; --fs-caption: 13px;
  --fs-mono: 12px; --fs-mono-s: 11px; --fs-mono-xs: 10px;
  --ls-display-xxl: -0.045em; --ls-display-xl: -0.04em; --ls-display-l: -0.04em; --ls-display: -0.035em;
  --ls-h1: -0.03em; --ls-h2: -0.025em; --ls-h3: -0.02em; --ls-body: -0.005em;
  --ls-mono: 0.02em; --ls-eyebrow: 0.14em;
  --lh-display: 0.92; --lh-heading: 1.15; --lh-body: 1.55; --lh-mono: 1.6;
}
```
(`--font-space-grotesk` / `--font-space-mono` come from `next/font` in Task 9.)

- [ ] **Step 4: `_motion.scss`** (spec §3.5)

```scss
:root {
  --duration-fast: 160ms; --duration-base: 240ms; --duration-medium: 320ms;
  --duration-reveal: 420ms; --duration-bloom: 520ms; --duration-hover: 260ms;
  --ease-standard: cubic-bezier(0.2, 0.7, 0.3, 1);
  --ease-out: ease-out; --ease-in-out: ease-in-out;
  --marquee-duration: 40s;
}
```

- [ ] **Step 5: `_index.scss`** forwards everything

```scss
@forward 'color';
@forward 'space';
@forward 'radius';
@forward 'type';
@forward 'motion';
```

- [ ] **Step 6: Commit**

```bash
git add src/styles/tokens
git commit -m "feat(styles): add design tokens as css custom properties"
```

### Task 3: Reset, mixins, and global stylesheet

**Files:**
- Create: `src/styles/_reset.scss`, `src/styles/mixins/_breakpoints.scss`, `src/styles/mixins/_glass.scss`, `src/styles/mixins/_typography.scss`
- Modify: `src/app/globals.scss`

- [ ] **Step 1: `mixins/_breakpoints.scss`** (mobile-first; design anchors 390/768/1440)

```scss
$bp-tablet: 768px;
$bp-desktop: 1200px;
@mixin tablet-up { @media (min-width: $bp-tablet) { @content; } }
@mixin desktop-up { @media (min-width: $bp-desktop) { @content; } }
@mixin reduced-motion { @media (prefers-reduced-motion: reduce) { @content; } }
```

- [ ] **Step 2: `mixins/_glass.scss`** — the frosted card treatment used everywhere

```scss
@mixin glass($surface: var(--surface), $blur: 24px, $saturate: 170%) {
  background: $surface;
  border: 1px solid var(--surface-edge);
  backdrop-filter: blur($blur) saturate($saturate);
  -webkit-backdrop-filter: blur($blur) saturate($saturate);
}
```

- [ ] **Step 3: `mixins/_typography.scss`** — eyebrow + display helpers

```scss
@mixin eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-s);
  letter-spacing: var(--ls-eyebrow);
  text-transform: uppercase;
  color: var(--text-muted);
}
@mixin display($size: var(--fs-display), $ls: var(--ls-display)) {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: $size;
  letter-spacing: $ls;
  line-height: var(--lh-display);
}
```

- [ ] **Step 4: `_reset.scss`** — minimal modern reset

```scss
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html, body { height: 100%; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-display);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
img, svg { display: block; max-width: 100%; }
ul { list-style: none; padding: 0; }
```

- [ ] **Step 5: `globals.scss`** pulls it together

```scss
@use 'styles/tokens';
@use 'styles/reset';
```
Update `tsconfig.json` `compilerOptions` to include sass paths is unnecessary; instead set `next.config.ts` to add `src` to the SCSS include path:
```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  sassOptions: { includePaths: ['./src'] },
  images: { formats: ['image/avif', 'image/webp'] },
};
export default nextConfig;
```

- [ ] **Step 6: Verify**

Run: `pnpm build`
Expected: build succeeds; `globals.scss` compiles with no "file not found" for `@use`.

- [ ] **Step 7: Commit**

```bash
git add src/styles src/app/globals.scss next.config.ts
git commit -m "feat(styles): add reset, breakpoint/glass/type mixins, wire globals"
```

---

## Phase 2 — Types & data

### Task 4: Zod schemas + inferred domain types

**Files:**
- Create: `src/lib/schemas.ts`, `src/types/index.ts`
- Test: `src/lib/schemas.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { projectFrontmatterSchema, postFrontmatterSchema, disciplineSchema } from './schemas';

describe('schemas', () => {
  it('accepts valid project frontmatter and applies defaults', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'Boucle', discipline: 'code', date: '2026-03-01' });
    expect(fm.tech).toEqual([]);        // default
    expect(fm.featured).toBe(false);    // default
    expect(fm.gallery).toEqual([]);     // default
  });
  it('rejects an unknown discipline', () => {
    expect(() => disciplineSchema.parse('cooking')).toThrow();
  });
  it('requires a post excerpt', () => {
    expect(() => postFrontmatterSchema.parse({ title: 'x', date: '2026-01-01', category: 'Code' })).toThrow();
  });
});
```

- [ ] **Step 2: Run → FAIL** (`pnpm test`, "Cannot find module './schemas'").

- [ ] **Step 3: Implement `src/lib/schemas.ts`** (source of truth; types inferred — spec §5)

```ts
import { z } from 'zod';

export const disciplineSchema = z.enum(['code', 'music', 'sound', 'photo', 'video', 'blog']);
export type Discipline = z.infer<typeof disciplineSchema>;

// Static map shape (not parsed from content — see Task 5).
export interface DisciplineMeta {
  slug: Discipline; label: string; color: string; gradient: string;
  swatches: [string, string, string]; route: string;
}

const imageRef = z.object({ src: z.string().optional(), grad: z.string().optional(), alt: z.string().optional() });
const galleryFrame = imageRef.extend({ caption: z.string() });

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  desc: z.string().optional(),
  discipline: disciplineSchema,
  date: z.string(),               // ISO yyyy-mm-dd
  tech: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  role: z.string().optional(),
  year: z.number().optional(),
  status: z.string().optional(),
  repo: z.string().optional(),
  liveUrl: z.string().optional(),
  cover: imageRef.optional(),
  gallery: z.array(galleryFrame).default([]),
  tags: z.array(z.string()).optional(),
});
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type Project = ProjectFrontmatter & { slug: string; body: string }; // body = markdown

export const authorSchema = z.object({ name: z.string(), role: z.string(), bio: z.string() });
export type Author = z.infer<typeof authorSchema>;

export const postFrontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  category: z.string(),
  readingTime: z.number().optional(), // computed from word count if absent
  tags: z.array(z.string()).default([]),
  cover: imageRef.optional(),
});
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type BlogPost = PostFrontmatter & { slug: string; body: string; readingTime: number; author: Author };

export const timelineEntrySchema = z.object({
  id: z.string(), period: z.string(), role: z.string(), place: z.string(),
  description: z.string(), tags: z.array(z.string()), accent: z.string(),
});
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

export const skillGroupSchema = z.object({ discipline: disciplineSchema, tools: z.array(z.string()) });
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const siteConfigSchema = z.object({
  name: z.string(), role: z.string(), email: z.string(), location: z.string(),
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  colophon: z.string(),
});
export type SiteConfig = z.infer<typeof siteConfigSchema>;
```
`src/types/index.ts` (ergonomic public type surface; components import from `@/types`):
```ts
export type {
  Discipline, DisciplineMeta, Project, ProjectFrontmatter,
  BlogPost, PostFrontmatter, Author, TimelineEntry, SkillGroup, SiteConfig,
} from '@/lib/schemas';
```

- [ ] **Step 4: Run → PASS; `pnpm typecheck` → PASS.**

- [ ] **Step 5: Commit**

```bash
git add src/lib/schemas.ts src/lib/schemas.test.ts src/types/index.ts
git commit -m "feat(schemas): zod schemas as source of truth + inferred domain types"
```

### Task 5: Disciplines map (single source of truth)

**Files:**
- Create: `src/lib/disciplines.ts`
- Test: `src/lib/disciplines.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { DISCIPLINES, DISCIPLINE_ORDER, isDiscipline } from './disciplines';

describe('disciplines', () => {
  it('has all six in order', () => {
    expect(DISCIPLINE_ORDER).toEqual(['code','music','sound','photo','video','blog']);
  });
  it('every entry is self-consistent', () => {
    for (const slug of DISCIPLINE_ORDER) {
      const d = DISCIPLINES[slug];
      expect(d.slug).toBe(slug);
      expect(d.route).toBe(`/${slug}`);
      expect(d.swatches).toHaveLength(3);
      expect(d.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
  it('narrows unknown strings', () => {
    expect(isDiscipline('code')).toBe(true);
    expect(isDiscipline('nope')).toBe(false);
  });
});
```

- [ ] **Step 2: Run → FAIL** (`pnpm test`, "Cannot find module './disciplines'").

- [ ] **Step 3: Implement** (values from spec §3.4 / `_tokens.jsx`)

```ts
import type { Discipline, DisciplineMeta } from '@/types';

export const DISCIPLINES: Record<Discipline, DisciplineMeta> = {
  code:  { slug: 'code',  label: 'Code',  color: '#e54d2e', gradient: 'linear-gradient(135deg, #ec8e7b, #5c271f)', swatches: ['#fdbdaf', '#e54d2e', '#5c271f'], route: '/code' },
  music: { slug: 'music', label: 'Music', color: '#3e63dd', gradient: 'linear-gradient(135deg, #5072e4, #1f2d5c)', swatches: ['#7d96e8', '#3e63dd', '#1f2d5c'], route: '/music' },
  sound: { slug: 'sound', label: 'Sound', color: '#5b5bd6', gradient: 'linear-gradient(135deg, #6e6ade, #2a2570)', swatches: ['#9b8cf2', '#5b5bd6', '#2f265f'], route: '/sound' },
  photo: { slug: 'photo', label: 'Photo', color: '#ad7f58', gradient: 'linear-gradient(135deg, #c8a17a, #4a3526)', swatches: ['#d6b48a', '#ad7f58', '#4a3526'], route: '/photo' },
  video: { slug: 'video', label: 'Video', color: '#00a2c7', gradient: 'linear-gradient(135deg, #4cb9d4, #0a3344)', swatches: ['#7fd3e5', '#00a2c7', '#0a3344'], route: '/video' },
  blog:  { slug: 'blog',  label: 'Blog',  color: '#46a758', gradient: 'linear-gradient(135deg, #5db66b, #1c3f23)', swatches: ['#94d4a0', '#46a758', '#1c3f23'], route: '/blog' },
};

export const DISCIPLINE_ORDER: Discipline[] = ['code', 'music', 'sound', 'photo', 'video', 'blog'];
export const isDiscipline = (s: string): s is Discipline => Object.prototype.hasOwnProperty.call(DISCIPLINES, s);
```

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit**

```bash
git add src/lib/disciplines.ts src/lib/disciplines.test.ts
git commit -m "feat(lib): add disciplines map with type guard + tests"
```

### Task 6: Formatting helpers

**Files:**
- Create: `src/lib/format.ts`
- Test: `src/lib/format.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from 'vitest';
import { formatMonthYear, readingLabel } from './format';

describe('format', () => {
  it('formats ISO date as "Mon YYYY"', () => {
    expect(formatMonthYear('2026-03-01')).toBe('Mar 2026');
  });
  it('renders a reading-time label', () => {
    expect(readingLabel(6)).toBe('6 min read');
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement**

```ts
export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
export function readingLabel(minutes: number): string {
  return `${minutes} min read`;
}
```

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/lib/format.ts src/lib/format.test.ts
git commit -m "feat(lib): add date + reading-time formatting helpers"
```

### Task 7: Content — markdown files, typed loaders, and TS constants

**Files:**
- Create: `content/projects/*.md`, `content/blog/*.md`
- Create: `src/lib/content.ts`, `src/data/site.ts`, `timeline.ts`, `skills.ts`, `sections.ts`, `index.ts`
- Test: `src/lib/content.test.ts`, `src/data/data.test.ts`

- [ ] **Step 1: Author the markdown content.** One `.md` per project/post; `slug` = filename. Frontmatter is validated by the Task 4 schemas. Example `content/projects/boucle.md` (body prose from `project.jsx`):

```md
---
title: Boucle
desc: A generative drum kit in the browser
discipline: code
date: 2026-03-01
featured: true
tech: [React, TypeScript, WebAudio, "Three.js"]
role: Design + engineering
year: 2026
status: "Live · v0.4"
repo: github.com/th/boucle
liveUrl: https://boucle.tomhinsley.com
gallery:
  - { grad: "linear-gradient(135deg, #dd4a2e, #6b1d1a)", caption: "The empty grid. Sixteen pads, one knob." }
  - { grad: "linear-gradient(135deg, #e85f3d, #832418)", caption: "Mid-session. Active pads pulse with audio." }
  - { grad: "linear-gradient(135deg, #b03e26, #441510)", caption: "The character dial, mapped to four dozen params." }
---

A generative drum kit that lives in the browser. Sixteen pads, one knob for
character, no two sessions the same.

## A way to make noise without opening Ableton

Boucle pairs a small grid sequencer with a procedural sample bank…

> The most interesting software is the kind nobody talks about.
```

For code samples inside a body, use a standard fenced code block — the `Markdown` component (Task 21) maps fences to the dark `CodeBlock`. Create the remaining projects from `section.jsx` `CODE_PROJECTS` (`tide-tables`, `site-for-l`, `marble`, `caustics`, `cycle`, `snip`, `studio-site`, `notes-prototype`) plus the cross-discipline items on Home/Related (`tape-loops-vol-3` music, `lisbon` photo, `walks` video, `rooms-sfx-library` sound). Convert "Mar 2026" → `2026-03-01`. Non-Boucle bodies are 1–2 short paragraphs; omit `gallery` to fall back to the discipline gradient. `content/blog/*.md` — one per post from `blog-index.jsx` `POSTS`; the featured `studio-log-04` and `notes-on-building-tools-that-arent-startups` get full bodies transcribed from `blog-post.jsx` (lead paragraph, two `##` headings, a `>` pull-quote, a fenced `bash` block, closing note).

- [ ] **Step 2: Write the failing loader test**

```ts
import { describe, it, expect } from 'vitest';
import { getAllProjects, getProject, getAllPosts } from './content';

describe('content loaders', () => {
  it('loads + validates projects, derives slug from filename', () => {
    expect(getAllProjects().length).toBeGreaterThan(0);
    const boucle = getProject('boucle');
    expect(boucle?.featured).toBe(true);
    expect(boucle?.body).toContain('Boucle');
  });
  it('loads posts and computes reading time when absent', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.readingTime > 0)).toBe(true);
  });
});
```

- [ ] **Step 3: Run → FAIL.**

- [ ] **Step 4: Implement `src/lib/content.ts`**

```ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projectFrontmatterSchema, postFrontmatterSchema } from './schemas';
import type { Project, BlogPost, Author } from './schemas';

const ROOT = path.join(process.cwd(), 'content');
const AUTHOR: Author = {
  name: 'Tom Hinsley',
  role: 'A digital creative in London',
  bio: 'A digital creative in London. Mostly writes about code, sometimes about everything else.',
};
const WORDS_PER_MIN = 220;
const estimateReading = (body: string) => Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MIN));

function read(sub: string, file: string) {
  const raw = fs.readFileSync(path.join(ROOT, sub, file), 'utf8');
  return { slug: file.replace(/\.md$/, ''), ...matter(raw) };
}
function listMd(sub: string) {
  return fs.readdirSync(path.join(ROOT, sub)).filter((f) => f.endsWith('.md'));
}

export function getAllProjects(): Project[] {
  return listMd('projects')
    .map((file) => {
      const { slug, data, content } = read('projects', file);
      return { ...projectFrontmatterSchema.parse(data), slug, body: content };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
export function getAllPosts(): BlogPost[] {
  return listMd('blog')
    .map((file) => {
      const { slug, data, content } = read('blog', file);
      const fm = postFrontmatterSchema.parse(data);
      return { ...fm, slug, body: content, readingTime: fm.readingTime ?? estimateReading(content), author: AUTHOR };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
```

- [ ] **Step 5: Implement TS constants** (each `.parse()`d by its schema so bad data throws)

- `site.ts`: `export const SITE = siteConfigSchema.parse({ name:'Tom Hinsley', role:'Frontend engineer', email:'hello@tomhinsley.com', location:'London', nav:[Code,Music,Sound,Photo,Video,Blog,About as {label,href}], socials:[Github,Are.na,Read.cv,Bluesky], colophon:'Set in Space Grotesk + Space Mono. Built with Next.js. Colours from Radix.' })`.
- `timeline.ts`: `export const TIMELINE = z.array(timelineEntrySchema).parse([... 7 entries from about.jsx, period = its year ...])`.
- `skills.ts`: `export const SKILLS = z.array(skillGroupSchema).parse([... 6 groups from about.jsx])`.
- `sections.ts`: `export const SECTIONS: Record<Discipline, { intro: string; tools: string[] }>` — code intro/tools from `section.jsx`, one-line intros for the rest.
- `index.ts`: `export { SITE } from './site'; export { TIMELINE } from './timeline'; export { SKILLS } from './skills'; export { SECTIONS } from './sections';`

- [ ] **Step 6: Write the data test**

```ts
import { describe, it, expect } from 'vitest';
import { SITE, TIMELINE, SKILLS } from './index';
describe('data constants', () => {
  it('site + timeline + skills loaded and valid', () => {
    expect(SITE.email).toBe('hello@tomhinsley.com');
    expect(TIMELINE.length).toBeGreaterThan(0);
    expect(SKILLS.length).toBe(6);
  });
});
```

- [ ] **Step 7: Run → PASS; `pnpm typecheck` → PASS.**

- [ ] **Step 8: Commit**

```bash
git add content src/lib/content.ts src/lib/content.test.ts src/data
git commit -m "feat(content): markdown content + typed loaders + zod-validated constants"
```

---

## Phase 3 — Theme & motion systems

### Task 8: Theme provider + pre-paint script

**Files:**
- Create: `src/lib/theme/theme-script.ts`, `ThemeProvider.tsx`, `useTheme.ts`, `index.ts`
- Test: `src/lib/theme/ThemeProvider.test.tsx`

- [ ] **Step 1: `theme-script.ts`** (runs before paint, set `data-theme`)

```ts
export const THEME_STORAGE_KEY = 'th-theme';
export const THEME_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme', s|| (m?'dark':'light'));}catch(e){}})();`;
```

- [ ] **Step 2: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './index';

function Probe() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>theme:{theme}</button>;
}

describe('ThemeProvider', () => {
  it('reads data-theme and toggles it', async () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('theme:light');
    await userEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
```

- [ ] **Step 3: Run → FAIL.**

- [ ] **Step 4: Implement** `ThemeProvider.tsx` + `useTheme.ts` (code as drafted in spec §8; `'use client'`, context with `{theme, toggle}`, `useEffect` reads the attribute set by the script, `toggle` writes attribute + `localStorage`). `index.ts` re-exports `ThemeProvider`, `useTheme`, `THEME_SCRIPT`.

- [ ] **Step 5: Run → PASS. Commit**

```bash
git add src/lib/theme
git commit -m "feat(theme): add no-flash theme provider with persisted toggle"
```

### Task 9: Wire fonts, theme, and root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Implement layout** — `next/font` for the two families exposing CSS vars, inject the theme script, wrap in `ThemeProvider`.

```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider, THEME_SCRIPT } from '@/lib/theme';
import './globals.scss';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-space-grotesk', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400','700'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Tom Hinsley — digital creative',
  description: 'Frontend engineer based in London. Side practices in music, sound, photography and film.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
```

- [ ] **Step 2: Verify** — `pnpm build` succeeds; run `pnpm dev`, confirm `data-theme` is present on `<html>` with no flash and tokens resolve (inspect `--accent`).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(app): wire fonts, theme script, and provider into root layout"
```

### Task 10: Motion token module + shared variants

**Files:**
- Create: `src/lib/motion/tokens.ts`, `variants.ts`, `index.ts`
- Test: `src/lib/motion/tokens.test.ts`

- [ ] **Step 1: Failing test** (locks the values that mirror `_motion.scss`)

```ts
import { describe, it, expect } from 'vitest';
import { DURATION, STAGGER, OFFSET } from './tokens';

describe('motion tokens', () => {
  it('durations are in seconds and match the spec', () => {
    expect(DURATION.medium).toBeCloseTo(0.32);
    expect(DURATION.reveal).toBeCloseTo(0.42);
  });
  it('offsets match the spec', () => {
    expect(OFFSET.deckX).toBe(280);
    expect(OFFSET.hoverLift).toBe(-6);
    expect(STAGGER.entries).toBeCloseTo(0.06);
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** `tokens.ts`

```ts
export const DURATION = { fast: 0.16, base: 0.24, medium: 0.32, reveal: 0.42, bloom: 0.52, hover: 0.26 } as const;
export const EASING = { standard: [0.2, 0.7, 0.3, 1] as const, out: 'easeOut', inOut: 'easeInOut', linear: 'linear' } as const;
export const OFFSET = { revealY: 20, hoverLift: -6, deckX: 280, deckRotate: 8 } as const;
export const STAGGER = { layers: 0.032, entries: 0.06 } as const;
export const MARQUEE_SECONDS = 40;
```
`variants.ts` — shared reveal variant:
```ts
import type { Variants } from 'motion/react';
import { DURATION, EASING, OFFSET, STAGGER } from './tokens';
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: OFFSET.revealY },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASING.standard } },
};
export const staggerParent: Variants = {
  hidden: {}, visible: { transition: { staggerChildren: STAGGER.entries } },
};
```
`index.ts` re-exports both.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/lib/motion
git commit -m "feat(motion): add motion tokens mirroring _motion.scss + shared variants"
```

### Task 11: `Reveal` and `Marquee` motion wrappers

**Files:**
- Create: `src/components/motion/Reveal/Reveal.tsx` + `index.ts`
- Create: `src/components/motion/Marquee/Marquee.tsx` + `Marquee.module.scss` + `index.ts`
- Test: `src/components/motion/Reveal/Reveal.test.tsx`

- [ ] **Step 1: Failing test** (renders children; respects reduced motion by still showing content)

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from './index';

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal><p>hello</p></Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `Reveal.tsx`** — `whileInView` reveal, reduced-motion aware.

```tsx
'use client';
import { motion, useReducedMotion } from 'motion/react';
import { revealVariants } from '@/lib/motion';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay }}
    >{children}</motion.div>
  );
}
```
`Marquee.tsx` — CSS keyframes marquee, duplicated children, pause-on-hover, reduced-motion stops it:
```tsx
import styles from './Marquee.module.scss';
export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden>{children}</div>
      </div>
    </div>
  );
}
```
`Marquee.module.scss`:
```scss
@use '../../../styles/mixins/breakpoints' as *;
.viewport { overflow: hidden; white-space: nowrap; }
.track { display: inline-flex; animation: scroll var(--marquee-duration) linear infinite;
  &:hover { animation-play-state: paused; }
  @include reduced-motion { animation: none; } }
.group { display: inline-flex; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/motion
git commit -m "feat(motion): add Reveal (whileInView) and Marquee wrappers"
```

---

## Phase 4 — Layout shell

### Task 12: `Container` and `Page` shell

**Files:**
- Create: `src/components/layout/Container/` (tsx, scss, index)
- Create: `src/components/layout/Bloom/` (tsx, scss, index)
- Create: `src/components/layout/Page/` (tsx, scss, index)
- Test: `src/components/layout/Page/Page.test.tsx`

- [ ] **Step 1: Failing test** — Page sets the discipline accent variable.

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Page } from './index';

describe('Page', () => {
  it('exposes the discipline accent on its root', () => {
    const { container } = render(<Page discipline="blog">x</Page>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--accent')).toBe('#46a758');
  });
  it('defaults to tomato accent when no discipline', () => {
    const { container } = render(<Page>x</Page>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--accent')).toBe('#e54d2e');
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement.** `Container.tsx` applies responsive gutters via a `--gutter` var (16/24/40) and a max width; `Bloom.tsx` renders the three blurred radial blobs + dot-grid from `_shared.jsx` `PageBg`, the primary bloom using `var(--accent)`; `Page.tsx` sets `style={{ '--accent': DISCIPLINES[discipline].color }}` (default tomato `#e54d2e`), renders `<Bloom/>` then `children`, `position: relative; overflow: hidden`. Props: `{ discipline?: Discipline; children }`.

`Container.module.scss`:
```scss
@use '../../../styles/mixins/breakpoints' as *;
.container {
  --gutter: 16px;
  width: 100%; margin-inline: auto; max-width: 1440px;
  padding-inline: var(--gutter);
  @include tablet-up { --gutter: 24px; }
  @include desktop-up { --gutter: 40px; }
}
```

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/layout/Container src/components/layout/Bloom src/components/layout/Page
git commit -m "feat(layout): add Page shell (discipline accent + bloom) and Container"
```

### Task 13: `Nav`

**Files:**
- Create: `src/components/layout/Nav/` (tsx, scss, index)
- Test: `src/components/layout/Nav/Nav.test.tsx`

- [ ] **Step 1: Failing test** — renders nav items + email CTA, marks active.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from './index';

describe('Nav', () => {
  it('renders the discipline + about links and email CTA', () => {
    render(<Nav active="code" />);
    expect(screen.getByRole('link', { name: /code/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hello@tomhinsley\.com/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** — glass pill nav (`@include glass`), `TH` monogram square filled with `var(--accent)`, items from `SITE.nav` as `next/link`, active item gets inverted bg (`var(--text)`/`var(--bg)`), email CTA uses `var(--accent)`, plus a dark-mode toggle button calling `useTheme().toggle`. `'use client'` (uses theme + pathname). Match dimensions/spacing in `_shared.jsx` `PageNav` (height 56, radius `--radius-2xl`, top/side offsets via Container). Props `{ active?: Discipline | 'about' }`.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/layout/Nav
git commit -m "feat(layout): add glass pill nav with active state + theme toggle"
```

### Task 14: `Footer`

**Files:**
- Create: `src/components/layout/Footer/` (tsx, scss, index)
- Test: `src/components/layout/Footer/Footer.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';
describe('Footer', () => {
  it('shows the colophon + sections', () => {
    render(<Footer />);
    expect(screen.getByText(/Colophon/i)).toBeInTheDocument();
    expect(screen.getByText(/hello@tomhinsley\.com/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** — `Marquee` of `Tom Hinsley ● hello@… ● London 51.5°N ● Get in touch` (88px display, `●` in `var(--accent)`), top/bottom rules, then the 5-column grid (`Tom Hinsley / Sections / Elsewhere / Colophon / © 2026`) from `_shared.jsx` `PageFooter`. Pull content from `SITE`.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/layout/Footer
git commit -m "feat(layout): add footer with marquee + column grid"
```

---

## Phase 5 — UI primitives

### Task 15: UI primitives — `Eyebrow`, `DisciplineDot`, `TechChip`, `Pill`, `Button`, `GlassCard`, `FilterPills`

**Files (one folder each, with `.module.scss` + `index.ts`):**
- Create: `src/components/ui/{Eyebrow,DisciplineDot,TechChip,Pill,Button,GlassCard,FilterPills}/`
- Test: `src/components/ui/ui.test.tsx`

- [ ] **Step 1: Failing test** (one render assertion per primitive)

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechChip } from './TechChip';
import { Button } from './Button';
import { FilterPills } from './FilterPills';

describe('ui primitives', () => {
  it('TechChip shows its label', () => { render(<TechChip label="React" />); expect(screen.getByText('React')).toBeInTheDocument(); });
  it('Button renders variant class', () => { render(<Button variant="primary">Go</Button>); expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument(); });
  it('FilterPills marks the active item', () => {
    render(<FilterPills items={[{ label: 'All', count: 12 }, { label: 'Code', count: 4 }]} active={0} />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement each primitive** mapping the prototype's inline styles to module SCSS using tokens. Interfaces:
  - `Eyebrow`: `{ children; withDot?: boolean }` — mono uppercase label, optional `DisciplineDot`.
  - `DisciplineDot`: `{ size?: number }` — circle filled `var(--accent)` with `0 0 0 4px var(--accent-glow)`.
  - `TechChip`: `{ label: string }` — mono 10px, `@include glass`, `--radius-sm`.
  - `Pill`: `{ label: string; tone?: 'discipline' | 'solid' }` — rounded-full label; discipline tone uses `var(--accent)`.
  - `Button`: `{ variant: 'primary'|'secondary'|'ghost'|'icon'; href?; children }` — renders `<a>` if `href` else `<button>`; primary = `var(--accent)` + glow shadow, secondary = `var(--text)`/`var(--bg)`, ghost = border `var(--rule-soft)`, icon = 38×38 square.
  - `GlassCard`: `{ children; soft?: boolean; className? }` — `@include glass` (soft uses `var(--surface-soft)`), `--radius-xl`, inset highlight + `var(--shadow-md)`.
  - `FilterPills`: `{ items: { label: string; count?: number }[]; active?: number; onSelect?: (i:number)=>void }` — glass container, active item inverted.

- [ ] **Step 4: Run → PASS; `pnpm typecheck` → PASS. Commit**

```bash
git add src/components/ui
git commit -m "feat(ui): add eyebrow, dot, chip, pill, button, glass card, filter pills"
```

### Task 15b: `Media` (responsive image) + `public/` image structure

Every image in the design sits in an aspect-ratio box with a gradient fallback. `Media` renders a responsive `next/image` when a `src` is present, otherwise the discipline gradient — so pages work now and light up automatically as real images land in `public/`.

**Files:**
- Create: `src/components/ui/Media/Media.tsx` + `Media.module.scss` + `index.ts`
- Create: `public/images/{projects,blog,about,og}/.gitkeep`
- Test: `src/components/ui/Media.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Media } from './index';

describe('Media', () => {
  it('renders an img with alt when src is present', () => {
    render(<Media src="/images/projects/boucle/cover.jpg" alt="Boucle cover" ratio="16/10" sizes="100vw" />);
    expect(screen.getByRole('img', { name: 'Boucle cover' })).toBeInTheDocument();
  });
  it('falls back to a gradient placeholder when no src', () => {
    const { container } = render(<Media grad="linear-gradient(135deg,#dd4a2e,#6b1d1a)" ratio="4/3" alt="" />);
    expect(container.querySelector('img')).toBeNull();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Create the `public/` structure** (commit `.gitkeep`s so folders exist)

```bash
mkdir -p public/images/projects public/images/blog public/images/about public/images/og
touch public/images/projects/.gitkeep public/images/blog/.gitkeep public/images/about/.gitkeep public/images/og/.gitkeep
```
Convention: `public/images/projects/<slug>/cover.{webp,jpg}` (+ `gallery-01…`), `public/images/blog/<slug>/cover.…`, `public/images/about/portrait.…`. Frontmatter references the absolute path, e.g. `cover: { src: "/images/projects/boucle/cover.jpg", alt: "…" }`.

- [ ] **Step 4: Implement `Media.tsx`** (uses `fill` so it adapts to the aspect-ratio box; `sizes` drives the responsive `srcset`)

```tsx
import Image from 'next/image';
import styles from './Media.module.scss';

export interface MediaProps {
  src?: string;
  grad?: string;
  alt?: string;
  ratio?: string;   // e.g. '16/10', '4/3'
  sizes?: string;   // responsive hint, see note below
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode; // overlays: labels, swatches, big number, hatch
}

export function Media({ src, grad, alt = '', ratio = '4/3', sizes = '100vw', priority, rounded = true, className, children }: MediaProps) {
  const cls = [styles.frame, rounded ? styles.rounded : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ aspectRatio: ratio, ...(grad && !src ? { background: grad } : null) }}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />}
      {children}
    </div>
  );
}
```
`Media.module.scss`:
```scss
.frame { position: relative; width: 100%; overflow: hidden; }
.rounded { border-radius: var(--radius-xl); }
.img { object-fit: cover; }
```

**Responsive `sizes` to pass at each usage** (resolution-responsive via one source set; art-direction with per-breakpoint sources can be layered on later):
- Full-bleed hero/cover/embed: `sizes="(min-width: 1200px) 60vw, 100vw"`
- 3-up grid card / gallery frame: `sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 90vw"`
- Recent thumb / small card: `sizes="(min-width: 768px) 200px, 40vw"`

- [ ] **Step 5: Run → PASS.**

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Media public/images
git commit -m "feat(ui): add responsive Media component + public/images structure"
```

> From here on, every component that currently describes a "gradient panel / thumb / cover" (CardDeck, RecentWork, ProjectCard, ProjectEmbed, Gallery, RelatedWork, AboutHero portrait, FeaturedPost, PostCard, blog cover, 404 cards) renders that surface as `<Media grad={DISCIPLINES[d].gradient} src={img?.src} alt={img?.alt} ratio="…" sizes="…">{overlays}</Media>`.

---

## Phase 6 — Home page

### Task 16: `CardDeck` (hero deck-flip animation)

**Files:**
- Create: `src/components/home/CardDeck/` (tsx, scss, index)
- Test: `src/components/home/CardDeck/CardDeck.test.tsx`

- [ ] **Step 1: Failing test** — advances on next click + counter.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDeck } from './index';
import { getAllProjects } from '@/lib/content';

describe('CardDeck', () => {
  it('shows a counter and advances on next', async () => {
    render(<CardDeck items={getAllProjects().slice(0, 4)} />);
    expect(screen.getByText(/01 \/ 04/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/02 \/ 04/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** — `'use client'`. State `index`; `next`/`prev` wrap. Render 4 stacked cards (top = active) using `motion` + `AnimatePresence`; top card exits with `x: OFFSET.deckX, rotate: OFFSET.deckRotate, opacity: 0`, `transition.duration = DURATION.medium`, `ease: EASING.standard`; back cards translate/scale per `home.jsx` `HomeDeck` offsets (`rotate -4/-2/2`, `scale .9/.95/.98`, opacity ladder). Arrow keys (`keydown`) + swipe (`drag="x"` with `onDragEnd` threshold) + auto-advance every 8s when not `useReducedMotion` and not hovered. Counter `NN / NN`, progress ticks, prev/next icon `Button`s (`aria-label="previous"/"next"`). Card face = discipline gradient panel + big faint number + label `Pill` + swatches + title/desc/`TechChip`s/date — port from `HomeCard` in `home.jsx`. Reduced motion: no auto-advance, instant index change. Props `{ items: Project[] }`.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/home/CardDeck
git commit -m "feat(home): add card-deck hero with deck-flip animation"
```

### Task 17: `DisciplineScroller`

**Files:**
- Create: `src/components/home/DisciplineScroller/` (tsx, scss, index)
- Test: `.../DisciplineScroller.test.tsx`

- [ ] **Step 1: Failing test** — renders all six discipline cards as links.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DisciplineScroller } from './index';
describe('DisciplineScroller', () => {
  it('renders six discipline links', () => {
    render(<DisciplineScroller />);
    expect(screen.getByRole('link', { name: /\/code/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\/blog/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** — header ("Explore by discipline · Drag or scroll →" + prev/next icon `Button`s); a horizontally scrollable row (`scroll-snap-type: x mandatory`, each card `scroll-snap-align: start`, `flex: 0 0 232px`, gap `--space-4`), pointer-drag to scroll, arrows scroll by `232 + 14`px, 80px right fade-edge gradient to `var(--bg)`. Each card (`GlassCard soft`): `DisciplineDot` in the discipline colour (inline `--accent` override per card) + `/slug` + tool `TechChip`s — tools list from `home.jsx` `HomeDisciplines`. Map over `DISCIPLINE_ORDER`. `'use client'`.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/home/DisciplineScroller
git commit -m "feat(home): add explore-by-discipline scroll-snap scroller"
```

### Task 18: `RecentWork` + `Hero` + Home route

**Files:**
- Create: `src/components/home/RecentWork/`, `src/components/home/Hero/`
- Modify: `src/app/page.tsx`
- Test: `src/app/home.test.tsx`

- [ ] **Step 1: Failing test** — Home renders headline, deck, scroller, recent.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';
describe('Home /', () => {
  it('renders the identity headline and selected work', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tom Hinsley/);
    expect(screen.getByText(/Selected work/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement.**
  - `Hero` — eyebrow (`Tom Hinsley · London` with dot), `<h1>` "Tom Hinsley,\n*digital creative*." (second line `var(--text-soft)`, period `var(--accent)`) using the display mixin at `--fs-display-xxl` scaled responsively, sub-paragraph copy from `home.jsx`. Right column = "Featured deck" label + `CardDeck items={featured}`.
  - `RecentWork` — "Selected work / Recent." header + `FilterPills` (All/Code/Music/Sound/Photo/Video/Blog with counts), grid `1.55fr 1fr`: left featured Boucle card (16/10 gradient + meta + tech), right 3 thumb rows (`GlassCard soft`, 140px gradient + title/desc/tech/date) — port `HomeRecent`. Footer line "4 of 12 · 91 in the archive" + "Everything →".
  - `page.tsx`:
```tsx
import { Page, Nav, Footer, Container } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { DisciplineScroller } from '@/components/home/DisciplineScroller';
import { RecentWork } from '@/components/home/RecentWork';
import { getAllProjects } from '@/lib/content';
export default function Home() {
  const projects = getAllProjects();
  const deck = projects.slice(0, 4); // featured deck (already date-sorted)
  return (
    <Page>
      <Nav />
      <Container>
        <Hero featured={deck} />
        <DisciplineScroller />
        <RecentWork projects={projects} />
      </Container>
      <Footer />
    </Page>
  );
}
```
(Add a `src/components/layout/index.ts` barrel exporting `Page, Container, Nav, Footer, Bloom`.)

- [ ] **Step 4: Run → PASS; `pnpm build` → succeeds. Manually check `pnpm dev` at `/` against `home.jsx`.**

- [ ] **Step 5: Commit**

```bash
git add src/components/home src/components/layout/index.ts src/app/page.tsx src/app/home.test.tsx
git commit -m "feat(home): assemble hero, recent work, and home route"
```

---

## Phase 7 — Section hub & Project detail

### Task 19: `ProjectCard` + `ProjectGrid` + `SectionHero` + `OtherDisciplines`

**Files:**
- Create: `src/components/section/{ProjectCard,ProjectGrid,SectionHero,OtherDisciplines}/`
- Test: `src/components/section/ProjectCard.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { getAllProjects } from '@/lib/content';
describe('ProjectCard', () => {
  it('links to the project and shows title', () => {
    const p = getAllProjects()[0];
    render(<ProjectCard project={p} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/${p.discipline}/${p.slug}`);
    expect(screen.getByText(p.title)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** (port `section.jsx`):
  - `ProjectCard` — `next/link` to `/${discipline}/${slug}`; 4/3 gradient thumb (`DISCIPLINES[d].gradient`) + 45° hatch overlay + big faint number + label `Pill` + swatches; title/date row, desc, `TechChip`s. **Hover lift** via CSS only: `transition: transform var(--duration-hover) var(--ease-standard), box-shadow …; &:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); } @include reduced-motion { transition: none; &:hover { transform: none; } }`. Props `{ project: Project; index?: number }`.
  - `ProjectGrid` — `repeat(3,1fr)` (1 col mobile / 2 tablet / 3 desktop) of `ProjectCard`s wrapped in `Reveal`. Props `{ projects: Project[] }`.
  - `SectionHero` — eyebrow "Section · /code · N projects", big discipline title (`Code.` period in `var(--accent)`), intro copy, "Working with" tools row. Props `{ discipline: Discipline; count: number; intro: string; tools: string[] }`.
  - `OtherDisciplines` — "Also see" row of the other five `GlassCard`s linking to their routes. Props `{ current: Discipline }`.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/section
git commit -m "feat(section): add project card/grid, section hero, other-disciplines"
```

### Task 20: Section hub route `/[discipline]`

**Files:**
- Create: `src/app/[discipline]/page.tsx`
- Test: `src/app/section.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionPage from './[discipline]/page';
describe('Section hub', () => {
  it('renders the code section title', () => {
    render(<SectionPage params={{ discipline: 'code' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Code/);
  });
});
```
(Note: in the app this is an async server component reading `params`; for the test, call it with a plain object — keep the component body synchronous over `params` so the test can render it directly. If using Next 15 async params, the test awaits the element: `render(await SectionPage({ params: Promise.resolve({ discipline: 'code' }) }))`.)

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** — validate `params.discipline` with `isDiscipline` else `notFound()`. Pull intro/tools from `SECTIONS` (Task 7); `getAllProjects().filter(p => p.discipline === d)`; compose `Page discipline={d}` → `Nav active={d}` → `Container` → `SectionHero` + `FilterPills` + sort label + `ProjectGrid` + `OtherDisciplines` → `Footer`. Add `export function generateStaticParams()` returning the six slugs.

- [ ] **Step 4: Run → PASS; `pnpm build` → six routes prerendered. Spot-check `/code`, `/music`, `/blog` accent + bloom differ.**

- [ ] **Step 5: Commit**

```bash
git add src/app/[discipline]/page.tsx src/app/section.test.tsx
git commit -m "feat(section): add /[discipline] hub route with static params"
```

### Task 21: Project detail components + route `/[discipline]/[slug]`

**Files:**
- Create: `src/components/project/{ProjectHero,ProjectEmbed,ProjectBody,Gallery,PrevNext,RelatedWork}/`
- Create: `src/components/ui/Markdown/`, `src/components/ui/CodeBlock/`
- Create: `src/app/[discipline]/[slug]/page.tsx`
- Test: `src/components/ui/Markdown.test.tsx`, `src/app/project.test.tsx`

- [ ] **Step 1: Failing tests**

```tsx
// Markdown.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Markdown } from './Markdown';
describe('Markdown', () => {
  it('renders headings, paragraphs and blockquotes', () => {
    render(<Markdown>{'## Title\n\nBody text\n\n> Quote'}</Markdown>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title');
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText(/Quote/)).toBeInTheDocument();
  });
});
```
```tsx
// project.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectPage from './[discipline]/[slug]/page';
import { getProject } from '@/lib/content';
describe('Project detail', () => {
  it('renders Boucle', () => {
    const p = getProject('boucle')!;
    render(<ProjectPage params={{ discipline: p.discipline, slug: p.slug }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Boucle/);
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** (port `project.jsx`):
  - `Markdown` (ui) — `react-markdown` + `remark-gfm` with a `components` map: `h2`/`h3`, `p`, `blockquote`→left-accent-border pull-quote, `pre`/`code`→dark `CodeBlock` (fenced) or inline code chip, `a`, `img`→`Media` (Task 15b). Renders the markdown `body` string; body column max-width 780px. `ProjectBody` wraps `<Markdown>{project.body}</Markdown>` plus the "Built with" (`project.tech`) / Links (`repo`, `liveUrl`) sidebar.
  - `CodeBlock` (ui) — dark panel `#1a1c22`, mono; accepts raw code text.
  - `ProjectHero` — discipline `Pill` + "Live" status pill + live URL, huge title (period `var(--accent)`), desc, meta strip (Role/Year/Status/Repo).
  - `ProjectEmbed` — the Boucle pad-grid placeholder (4×4 pads with active set, two dials, top/bottom chrome) on `DISCIPLINES.code.gradient`. Generic fallback: gradient panel with title if a project has no custom embed.
  - `Gallery` — 3 frames from `project.gallery` (gradient + `Fig. NN` + caption).
  - `PrevNext` — prev/next within the same discipline (compute from filtered+sorted `PROJECTS`).
  - `RelatedWork` — 3 cross-discipline cards.
  - `page.tsx` — resolve via `getProject(slug)` (`notFound()` if missing or its discipline ≠ the route); compose `Page discipline` → `Nav active` → `Container` → breadcrumb + hero + embed + body(+sidebar) + gallery + prevnext + related → `Footer`. `generateStaticParams()` maps `getAllProjects()` → `{ discipline, slug }`.

- [ ] **Step 4: Run → PASS; `pnpm build` → succeeds. Check `/code/boucle`.**

- [ ] **Step 5: Commit**

```bash
git add src/components/project src/components/ui/Markdown src/components/ui/CodeBlock src/app/[discipline]/[slug]
git commit -m "feat(project): add project detail template, block renderer, route"
```

---

## Phase 8 — About + CV timeline

### Task 22: `Timeline` (scroll-reveal) + About sections + route

**Files:**
- Create: `src/components/about/{AboutHero,Intro,Timeline,Skills,ContactCTA}/`
- Create: `src/app/about/page.tsx`
- Test: `src/components/about/Timeline.test.tsx`, `src/app/about.test.tsx`

- [ ] **Step 1: Failing tests**

```tsx
// Timeline.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';
import { TIMELINE } from '@/data';
describe('Timeline', () => {
  it('renders every entry role', () => {
    render(<Timeline entries={TIMELINE} />);
    for (const e of TIMELINE) expect(screen.getByText(new RegExp(e.role))).toBeInTheDocument();
  });
});
```
```tsx
// about.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './about/page';
describe('About', () => {
  it('renders the timeline heading', () => {
    render(<About />);
    expect(screen.getByText(/Where I.ve been/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** (port `about.jsx`):
  - `Timeline` — `'use client'`. Grid `200px 40px 1fr` per row (date / marker / content). Wrap each row in `Reveal delay={i*STAGGER.entries}`; marker dot in `entry.accent` with one-time pulse on reveal (`motion` keyframes `scale: [1,1.18,1]`, reduced-motion → none). Vertical spine centered on the marker column; spine `scaleY` tied to scroll via `useScroll`/`useTransform` (reduced-motion → static full height). Each entry: period (mono), `role · place`, description, `TechChip`s.
  - `AboutHero` — portrait gradient panel + huge "Tom Hinsley." + intro + skill chips.
  - `Intro` — "Currently" panel + two paragraphs.
  - `Skills` — 3-col grid of `GlassCard`s, one per discipline, `DisciplineDot` + `/slug` + tool chips (from `SKILLS`).
  - `ContactCTA` — big glass panel "Working on something I should know about?" + email `Button`.
  - `page.tsx` — `Page` (default tomato accent) → `Nav active="about"` → `Container` → the five sections → `Footer`.

- [ ] **Step 4: Run → PASS; `pnpm build` → succeeds; check timeline reveals while scrolling `/about`.**

- [ ] **Step 5: Commit**

```bash
git add src/components/about src/app/about/page.tsx src/app/about.test.tsx
git commit -m "feat(about): add about page with scroll-revealed CV timeline"
```

---

## Phase 9 — Blog

### Task 23: Blog index components + route `/blog`

**Files:**
- Create: `src/components/blog/{BlogHero,FeaturedPost,PostList,PostCard}/`
- Create: `src/app/blog/page.tsx`
- Test: `src/app/blog-index.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Blog from './blog/page';
import { getAllPosts } from '@/lib/content';
describe('Blog index', () => {
  it('features the latest post and lists older ones', () => {
    render(<Blog />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Blog/);
    expect(screen.getByText(getAllPosts()[0].title)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** (port `blog-index.jsx`) — `BlogHero` (grass accent title + filter pills with counts), `FeaturedPost` (latest: gradient cover + title/excerpt/tags + "Read the post →"), `PostList` of `PostCard` rows (`120px 1fr 240px`: date/cat · title/excerpt/tags · read-time/read→), pagination controls. Route: `Page discipline="blog"` → `Nav active="blog"` → sections → `Footer`. `getAllPosts()` is already sorted by date desc.

- [ ] **Step 4: Run → PASS. Commit**

```bash
git add src/components/blog src/app/blog/page.tsx src/app/blog-index.test.tsx
git commit -m "feat(blog): add blog index with featured + list"
```

### Task 24: Blog post components + route `/blog/[slug]`

**Files:**
- Create: `src/components/blog/{PostBody,AuthorCard}/` (pull-quote + code come from the `Markdown` map; reuse `Markdown`/`CodeBlock`)
- Create: `src/app/blog/[slug]/page.tsx`
- Test: `src/app/blog-post.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Post from './blog/[slug]/page';
import { getAllPosts } from '@/lib/content';
describe('Blog post', () => {
  it('renders the post title + author', () => {
    const p = getAllPosts().find(x => x.body.length > 0)!;
    render(<Post params={{ slug: p.slug }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(new RegExp(p.title.slice(0, 12)));
    expect(screen.getAllByText(/Tom Hinsley/).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement** (port `blog-post.jsx`) — breadcrumb, article hero (category `Pill` + date/read meta + big title with grass period + author row + tags), cover image, `PostBody` (renders the markdown `body` via `Markdown`; first paragraph styled as the lead), end matter (tags + "Send a note"), `AuthorCard`, prev/next, related posts. Route resolves post by slug (`notFound()` if missing or empty body), `Page discipline="blog"`. `generateStaticParams()` from posts that have a body.

- [ ] **Step 4: Run → PASS; `pnpm build` → succeeds; check a post route.**

- [ ] **Step 5: Commit**

```bash
git add src/components/blog src/app/blog/[slug] src/app/blog-post.test.tsx
git commit -m "feat(blog): add long-form blog post template + route"
```

---

## Phase 10 — 404

### Task 25: `not-found`

**Files:**
- Create: `src/app/not-found.tsx` + `not-found.module.scss`

- [ ] **Step 1: Implement** (port `not-found.jsx`) — `Page` (default accent) → `Nav` → big `404` + faux URL bar showing a broken path + six discipline shortcut `GlassCard`s (map `DISCIPLINE_ORDER`, each linking to its route with its own accent) + "Send a note" CTA → `Footer`.

- [ ] **Step 2: Verify** — `pnpm build`; visit an unknown path in `pnpm dev` → renders. (Next renders `not-found.tsx` for unmatched routes.)

- [ ] **Step 3: Commit**

```bash
git add src/app/not-found.tsx src/app/not-found.module.scss
git commit -m "feat(404): add not-found page with discipline shortcuts"
```

---

## Phase 11 — Responsive, a11y & final sweep

### Task 26: Responsive pass

**Files:** Modify the `.module.scss` of Hero, CardDeck, RecentWork, SectionHero, ProjectGrid, ProjectHero, ProjectBody, Timeline, BlogHero, FeaturedPost, PostList, PostBody, Footer.

- [ ] **Step 1:** For each, add mobile-first base styles and `@include tablet-up` / `@include desktop-up` overrides so layouts match `*-responsive.jsx` (e.g. hero grids collapse to one column on mobile; display sizes step down via `clamp()` or breakpoint overrides; nav condenses). Keep gutters from `Container` (16/24/40).
- [ ] **Step 2:** Verify at 390 / 768 / 1440 in `pnpm dev` against the `*-responsive.jsx` prototypes for each page.
- [ ] **Step 3: Commit** `git commit -am "feat(responsive): tablet + mobile layouts across all pages"`

### Task 27: Accessibility & reduced-motion sweep

- [ ] **Step 1:** Confirm one `<h1>` per page, logical heading order, `next/link` for nav, `aria-label`s on icon buttons (deck/scroller/pagination), visible `:focus-visible` rings (add a global focus style in `_reset.scss` using `var(--accent)`), and that discipline is always conveyed by text label + colour.
- [ ] **Step 2:** Grep for any `motion` usage missing a `useReducedMotion` guard and any CSS animation missing the `@include reduced-motion` escape; fix.
- [ ] **Step 3:** Run an axe check (optional) `pnpm dlx @axe-core/cli http://localhost:3000` while `pnpm dev` runs; address violations.
- [ ] **Step 4: Commit** `git commit -am "fix(a11y): focus states, labels, reduced-motion guards"`

### Task 28: Final verification

- [ ] **Step 1:** Run `pnpm typecheck && pnpm test && pnpm lint && pnpm build`.
- [ ] **Step 2:** Expected: type check clean, all Vitest suites pass, lint clean, build prerenders `/`, `/[discipline]` (×6), `/[discipline]/[slug]` (all projects), `/about`, `/blog`, `/blog/[slug]` (posts with bodies), `/_not-found`.
- [ ] **Step 3:** Open `pnpm dev`, click through every route, toggle dark mode (no flash), tab through nav. Compare against the prototypes.
- [ ] **Step 4: Commit any fixes**, then the branch is ready for review/PR.

```bash
git commit -am "chore: final verification fixes"
```

---

## Self-review notes (for the implementer)

- **No external CMS** — `src/lib/content.ts` is the seam. Content is markdown (Zod-validated) + TS constants; if a CMS is ever wanted, swap the loader internals to return the same inferred types — no component changes.
- Bodies are **markdown strings** rendered by `Markdown`; keep long-form copy in `content/*.md`, never inline it in components.
- **Images** go through `Media` (Task 15b): `next/image` when `src` exists, discipline gradient otherwise. Real files live under `public/images/…`; reference them from frontmatter `cover`/`gallery` (`src` + `alt`).
- Motion values live in **two mirrored places** (`_motion.scss` + `lib/motion/tokens.ts`) — change both together.
- `--accent` is set by `Page` from `DISCIPLINES`; never hardcode a discipline hex in component SCSS — read `var(--accent)` (page-level) or set a local `--accent` override (per-card, e.g. scroller/404 cards).
