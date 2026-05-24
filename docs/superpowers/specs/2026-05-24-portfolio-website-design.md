# Portfolio Website — Design Spec

_Date: 2026-05-24 · Status: approved · Source: Claude Design handoff (`docs/design-reference/`)_

## 1. Overview

A personal site for **Tom Hinsley** — a frontend engineer in London with side
practices in music, sound, photography, video and writing. It showcases work
across six **disciplines** and a blog, with an interactive scroll-revealed CV
timeline.

The visual language (settled over ~8 design rounds — see
`docs/design-reference/chats/chat1.md`) is **glassy depth + Swiss structure with
a touch of brutalist line-work**: frosted glass surfaces, generous whitespace,
mono chrome/meta, a card-deck hero, and per-section colour identity.

This spec is the source of truth for implementation. The original HTML/JS
prototypes live in `docs/design-reference/project/` and should be matched for
visual output (not copied structurally — they are React-on-a-canvas mockups).

## 2. Locked decisions

| Decision | Choice |
| --- | --- |
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **SCSS Modules**, with **CSS custom properties** as the runtime token source |
| Colour | **Radix Colors**; **tomato** is the primary accent (`#e54d2e`) |
| Animation | **Motion (Framer Motion) + CSS hybrid**, driven by shared motion tokens |
| Dark mode | **System default + persisted manual toggle**, no flash-of-wrong-theme |
| Content | **No external CMS.** Markdown files (Zod-validated frontmatter) for long-form content + typed TS constants. Images self-hosted. |
| Types | **Zod schemas are the source of truth** — TS types are inferred (`z.infer`), schemas also validate content at load |
| Build scope | **Full flow straight through** — all templates, responsive + dark + animations |
| Package manager / runtime | **pnpm**, Node 20 (`.nvmrc`) |
| Fonts | **Space Grotesk** (display + body) + **Space Mono** (chrome/meta) via `next/font` |

## 3. Token system

Single sources of truth, no drift. Component SCSS reads `var(--token)` only —
**no magic numbers**.

### 3.1 Semantic colour (CSS vars: `:root` light, `:root[data-theme="dark"]` dark)

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#f0ece2` | `#161615` |
| `--bg-subtle` | `#ebe6d8` | `#1c1c1a` |
| `--surface` | `rgba(255,253,247,0.78)` | `rgba(40,40,38,0.65)` |
| `--surface-soft` | `rgba(255,253,247,0.55)` | `rgba(28,28,26,0.55)` |
| `--surface-edge` | `rgba(255,255,255,0.85)` | `rgba(255,255,255,0.08)` |
| `--text` | `#1c1b18` | `#ededec` |
| `--text-mid` | `rgba(28,27,24,0.78)` | `rgba(237,237,236,0.78)` |
| `--text-soft` | `rgba(28,27,24,0.62)` | `rgba(237,237,236,0.62)` |
| `--text-muted` | `rgba(28,27,24,0.42)` | `rgba(237,237,236,0.42)` |
| `--text-on-accent` | `#ffffff` | `#ffffff` |
| `--rule-soft` | `rgba(28,27,24,0.12)` | `rgba(255,255,255,0.08)` |
| `--rule` | `rgba(28,27,24,0.24)` | `rgba(255,255,255,0.16)` |
| `--rule-strong` | `rgba(28,27,24,0.36)` | `rgba(255,255,255,0.32)` |
| `--accent` | `#e54d2e` | `#e54d2e` |
| `--accent-hover` | `#dd4425` | `#ec6142` |
| `--accent-subtle` | `#ffdcd3` | `#4e1511` |
| `--accent-glow` | `rgba(229,77,46,0.22)` | `rgba(229,77,46,0.30)` |
| `--shadow-sm` | `0 4px 12px rgba(28,27,24,0.06)` | `0 4px 12px rgba(0,0,0,0.18)` |
| `--shadow-md` | `0 12px 30px rgba(28,27,24,0.08)` | `0 12px 30px rgba(0,0,0,0.28)` |
| `--shadow-lg` | `0 22px 50px rgba(28,27,24,0.14)` | `0 22px 50px rgba(0,0,0,0.40)` |
| `--shadow-xl` | `0 36px 70px rgba(28,27,24,0.20)` | `0 36px 70px rgba(0,0,0,0.55)` |

`--accent` is **overridden per page** by the active discipline (see 3.4). Default
(`/`, `/about`) uses tomato. Radix scales (`@radix-ui/colors`) back the accent +
discipline hues; the warm "sand" surfaces are the design's bespoke neutrals.

### 3.2 Type scale (Space Grotesk display/body, Space Mono chrome)

Sizes (px): `displayXXL 156, displayXL 120, displayL 72, display 56, h1 42,
h2 28, h3 22, h4 18, bodyL 19, body 16, bodyS 14, caption 13, mono 12, monoS 11,
monoXS 10`. Weights `400 / 500 / 600` (never bold body). Letter-spacing tightens
on display (`-0.045em` → `-0.02em`); mono eyebrows use `+0.14em` uppercase.
Line-height: `display 0.92, heading 1.15, body 1.55, mono 1.6`. Exposed as
`--font-size-*`, `--ls-*`, `--lh-*`, `--font-display`, `--font-mono`.

### 3.3 Spacing / radius / shadow scales

- **Space** (4px base): `--space-1…14` = `4,8,12,16,20,24,32,40,48,56,64,80,96,128`.
- **Radius**: `xs 4, sm 6, md 8, lg 10, xl 14, 2xl 18, 3xl 24, full 999`.
  Pill nav = 2xl, card chrome = xl, chips = sm, buttons = lg.
- **Shadow**: four tiers (see table) — reserved for hierarchy, never hover-only.

### 3.4 Disciplines (single source: `lib/disciplines.ts`)

Six disciplines, each with `label`, `color` (Radix step 9), `gradient`,
`swatches` (3), and `route`:

| Slug | Label | Color | Radix |
| --- | --- | --- | --- |
| `code` | Code | `#e54d2e` | tomato |
| `music` | Music | `#3e63dd` | indigo |
| `sound` | Sound | `#5b5bd6` | iris |
| `photo` | Photo | `#ad7f58` | brown |
| `video` | Video | `#00a2c7` | cyan |
| `blog` | Blog | `#46a758` | grass |

Gradients/swatches as in `docs/design-reference/project/pages/_tokens.jsx`
(e.g. code grad `linear-gradient(135deg,#ec8e7b,#5c271f)`, swatches
`#fdbdaf/#e54d2e/#5c271f`). The page shell sets `--accent` and the bloom colour
from this map via `data-discipline`, so nav CTA, period dots, eyebrows and the
background bloom all read `var(--accent)`.

### 3.5 Motion tokens (`_motion.scss` ⇄ `lib/motion/tokens.ts`)

Durations (ms): `fast 160, base 240, medium 320, reveal 420, bloom 520,
hover 260, marquee 40000`. Easing: `standard cubic-bezier(0.2,0.7,0.3,1)`,
`out ease-out`, `in-out ease-in-out`, `linear`. Offsets: `revealY 20,
hoverLift -6, deckX 280, deckRotate 8`. Stagger: `layers 32, entries 60`.
CSS vars and the TS module mirror each other (documented pair).

## 4. File organisation

```
src/
  app/
    layout.tsx · globals.scss · page.tsx (Home /) · not-found.tsx
    [discipline]/page.tsx              → Section hub  /code /music /sound /photo /video
    [discipline]/[slug]/page.tsx       → Project detail
    blog/page.tsx · blog/[slug]/page.tsx
    about/page.tsx
  styles/
    tokens/  _color _space _radius _type _shadow _motion _index.scss
    mixins/  _breakpoints _glass _typography.scss
    _reset.scss
  lib/
    theme/    ThemeProvider.tsx · theme-script.ts · useTheme.ts
    motion/   tokens.ts · variants.ts
    schemas.ts        (Zod schemas — source of truth; types inferred)
    content.ts        (markdown loaders: gray-matter + Zod .parse)
    disciplines.ts · format.ts
  types/      index.ts  (re-exports inferred types from lib/schemas)
  data/       timeline · skills · site · sections.ts   (TS constants, Zod-validated)
content/                          (repo root, outside src)
  projects/<slug>.md              (frontmatter + markdown body)
  blog/<slug>.md
  components/
    layout/   Page · Container · Nav · Footer · Bloom
    ui/       Button · TechChip · FilterPills · Pill · GlassCard · Eyebrow · DisciplineDot
    motion/   Reveal · Marquee
    home/     Hero · CardDeck · DisciplineScroller · RecentWork
    section/  SectionHero · ProjectGrid · ProjectCard · OtherDisciplines
    project/  ProjectHero · ProjectEmbed · ProjectBody · Gallery · PrevNext · RelatedWork
    about/    AboutHero · Intro · Timeline · Skills · ContactCTA
    blog/     BlogHero · FeaturedPost · PostList · PostCard · PostBody · PullQuote · CodeBlock · AuthorCard
```

## 5. Data model & content

**Zod schemas in `src/lib/schemas.ts` are the single source of truth.** TS types
are inferred (`type X = z.infer<typeof xSchema>`); the same schemas `.parse()`
content at load so bad data fails the build loudly. No `Block` union — long-form
bodies are **Markdown strings** rendered by a `Markdown` component (react-markdown
+ remark-gfm) whose component map styles headings, blockquotes (pull-quote),
code fences (dark `CodeBlock`), links and images with our tokens.

Inferred types (shapes):

- `Discipline = 'code' | 'music' | 'sound' | 'photo' | 'video' | 'blog'`
- `DisciplineMeta { slug; label; color; gradient; swatches: [string,string,string]; route }`
- `Project = ProjectFrontmatter & { slug: string; body: string /*markdown*/ }` where
  `ProjectFrontmatter { title; desc?; discipline; date /*ISO*/; tech: string[]; featured?; role?; year?; status?; repo?; liveUrl?; cover?: {src?;grad?}; gallery: {src?;grad?;caption}[]; tags?: string[] }`
- `BlogPost = PostFrontmatter & { slug; body: string; readingTime: number; author: Author }` where
  `PostFrontmatter { title; excerpt; date /*ISO*/; category; readingTime?; tags: string[]; cover?: {src?;grad?} }`
- `TimelineEntry { id; period; role; place; description; tags: string[]; accent }`
- `SkillGroup { discipline; tools: string[] }` · `Author { name; role; bio }`
- `SiteConfig { name; role; email; location; socials:{label;href}[]; nav:NavItem[]; colophon }`

**Content sources:**

- **Markdown** in `content/projects/<slug>.md` and `content/blog/<slug>.md` —
  YAML frontmatter (validated by the frontmatter schemas) + markdown body. Loaders
  in `src/lib/content.ts` (`getAllProjects/getProject/getAllPosts/getPost`) read at
  build time; `slug` derives from the filename; `readingTime` is computed from word
  count when absent.
- **TS constants** in `src/data/` for structured, non-prose data — `timeline.ts`,
  `skills.ts`, `site.ts`, `sections.ts` (per-discipline intro + tools) — each
  declared `satisfies` its inferred type (and parsed by its schema in a test).
- Content reproduces the prototype copy (Boucle + the 9 `/code` projects, the cross-
  discipline items, 9 blog posts, 7 timeline entries, 6 skill groups).
  `email = hello@tomhinsley.com`; colophon: "Set in Space Grotesk + Space Mono.
  Built with Next.js. Colours from Radix."
- **Images** are self-hosted: any `src` is a `public/…` path or a URL the owner
  controls. Where no image exists yet, the discipline gradient is the placeholder.

## 6. Pages / templates

Five templates cover every route. Each renders: background bloom (discipline-
tinted) → glass pill `Nav` → page sections → marquee `Footer`. All have
desktop (1440) / tablet (768) / mobile (390) layouts and light/dark.

1. **Home `/`** — eyebrow + headline ("Tom Hinsley, _digital creative_."), card-
   deck of featured work (prev/next + counter), "Explore by discipline"
   horizontal scroller (6 cards), "Recent" = featured + 3 thumbs + filter pills.
2. **Section hub `/[discipline]`** — big discipline title + tools row, filter
   pills + sort, 3-col project grid, "Also see" other-discipline row. `/code` is
   the canonical pattern; all disciplines reuse it. Accent + bloom = discipline.
3. **Project detail `/[discipline]/[slug]`** — breadcrumb, title + meta strip,
   custom embed (e.g. Boucle pad-grid), body + "Built with"/Links sidebar,
   3-frame gallery, prev/next, related work.
4. **About `/about`** — hero (portrait + intro), "Currently" intro panel,
   **scroll-revealed CV timeline** (vertical spine + colour markers), skills
   grouped by discipline, contact CTA.
5. **Blog index `/blog`** — title + filter pills, featured (latest) post, list
   of older posts (date/excerpt/tags/read-time), pagination. Grass accent.
6. **Blog post `/blog/[slug]`** — article hero (author + tags), cover, long-form
   body (H2s, pull-quote, dark code block), tags, author bio card, prev/next,
   related.
7. **404 `/not-found`** — large 404, broken-path URL bar, six discipline
   shortcut cards, contact CTA.

Layout intent, dimensions and content per page are captured in the prototypes:
`docs/design-reference/project/pages/{home,section,project,about,blog-index,blog-post,not-found}.jsx`
and their `*-responsive.jsx` counterparts. Margins: **16 / 24 / 40px** at
mobile / tablet / desktop, applied consistently to nav, content and footer.

## 7. Animation system (Motion + CSS, tokenized)

Per `docs/design-reference/project/pages/animations.jsx`. Principles:
**Restrained · Functional · Quiet · Respectful.** Transform + opacity only,
60fps target, all gated by `prefers-reduced-motion` (Motion `useReducedMotion`
+ CSS media query → instant/no motion fallback).

1. **Deck flip** (hero) — `320ms`, standard ease. Top card `translateX(+280) +
   rotate(8deg) + fade`; back cards step up (`rotate -2deg`, opacity +0.16),
   `32ms` stagger. Triggers: click · arrow keys · swipe · auto every 8s if idle.
   Motion `AnimatePresence`.
2. **Discipline scroller** — CSS `scroll-snap-type: x mandatory`, snap point
   `232 + 14px`, drag friction `0.92`, arrows advance 1 card / `400ms`, 80px
   right fade edge.
3. **Timeline reveal** — `IntersectionObserver`/`whileInView` threshold `0.4`;
   entry `translateY(20)→0`, `opacity 0→1`, `420ms` ease-out, `60ms` stagger;
   one-time marker pulse `scale 1→1.18→1`; spine `scaleY(0→1)` tied to scroll.
4. **Route bloom shift** — bloom + nav accent interpolate prev→new discipline
   colour over `520ms` ease-in-out (custom prop); instant if reduced motion.
5. **Card hover lift** — pure CSS, `260ms`, `translateY(-6px)`, shadow-md→lg.
   Never scale, never rotate.
6. **Footer marquee** — CSS keyframes `40s` linear infinite, right-to-left,
   seamless, `animation-play-state: paused` on hover.

## 8. Responsive, media & dark mode

- Fluid layouts via `_breakpoints` mixins anchored to **390 / 768 / 1440**;
  consistent gutters 16 / 24 / 40px.
- **Images**: a single `Media` component wraps `next/image` (`fill` inside an
  aspect-ratio box) for responsive `srcset` + AVIF/WebP + lazy-loading, with the
  discipline gradient as the fallback when no `src` exists yet. Every image
  surface uses it — never a bare `<img>`. Self-hosted files live under
  `public/images/{projects,blog,about,og}/…`; each `src` carries an `alt`. Per-
  usage `sizes` hints tune the responsive set (full-bleed vs grid vs thumb).
  `next.config` enables AVIF/WebP. Art-directed per-breakpoint sources can be
  layered onto `Media` later if needed.
- `ThemeProvider` + inline pre-paint script sets `data-theme` before first paint
  (no flash); nav toggle persists to `localStorage`; falls back to
  `prefers-color-scheme`.

## 9. Accessibility

- Radix step-9 hues + semantic tokens chosen for contrast in both modes.
- Honour `prefers-reduced-motion` everywhere (section 7).
- Semantic HTML, keyboard-operable deck/scroller/nav, visible focus states,
  alt text on images, discipline conveyed by label + colour (not colour alone).

## 10. Out of scope (this pass)

- **No external CMS** (no Sanity/Studio/GROQ). Content is Markdown + TS constants,
  loaded at build time and validated by Zod. The loaders in `src/lib/content.ts`
  are the seam if a CMS is ever wanted later — a data-layer swap, no UI change.
- Real media assets beyond what the owner self-hosts (discipline gradients are the
  placeholder until real `src`s are added).
- Contact form backend (CTA is a `mailto:`/link for now).
