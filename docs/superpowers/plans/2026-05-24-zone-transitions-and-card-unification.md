# Zone Transitions + Discipline-Card Unification — Implementation Plan

> Two independent groups, two branches. Approved decisions: bloom = **crossfade + pulse**; nav zone signal = **subtle** (only monogram + CTA morph).

**Goal:** (1) Merge the About "what I work with" blocks and the home "Explore by discipline" cards into one clickable component with bigger tags, performant hover, and tasteful Radix shadows. (2) Make accent/bloom transition smoothly on route change ("zones"), and fix the blog bloom positioning.

**Tech:** Next 16 App Router, React 19, SCSS modules, motion v12 (`motion/react`), Radix colors, CSS `@property`.

---

## Group 1 — Unify & polish the discipline cards  (branch `feat/discipline-card-unify`)

### Context
- `src/components/about/Skills/Skills.tsx` renders `<GlassCard soft>` blocks: colored dot + `/discipline` label + `TechChip` tools. **Not links, no hover, no entrance.**
- `src/components/home/DisciplineScroller/DisciplineScroller.tsx` renders the *same* shape wrapped in `<Link>` + a `↗` arrow, `.slice(0,5)` tools. **Link, no hover, no entrance.**
- `src/components/section/ProjectCard/ProjectCard.module.scss` is the hover reference: `transform: translateY(-6px)` + `.media` `box-shadow` md→lg **with `transition: box-shadow`** — the box-shadow transition is the "rough/laggy" part (non-compositable repaint).
- `TechChip` tags are `--fs-mono-xs` (10px) — too small.
- Shadow tokens (`_color.scss`): `--shadow-md: 0 6px 16px black-a4`, `--shadow-lg: 0 14px 28px black-a4` (light). Colors already Radix `black-a*` (convention OK); issue is they're heavy on the translucent cards and hurt text.

### Tasks
1. **New `src/components/ui/DisciplineCard/`** (`DisciplineCard.tsx` + `.module.scss` + `index.ts`).
   - Props: `discipline: Discipline`, `tools: string[]`, `href?: string`, `showArrow?: boolean`, `maxTools?: number`.
   - Renders `<GlassCard soft>` content (dot from `DISCIPLINES[d].color` + `/discipline` label + chips). If `href`, wrap in `<Link>`; else plain.
   - Hover (only when `href`): `transform: translateY(-6px)` (compositable) + a **shadow crossfaded via `opacity` on a `::after` pseudo-element** (NOT animating `box-shadow`). Resting shadow lighter (`--shadow-sm`), hover shadow `--shadow-md`. `@include reduced-motion { transition:none; transform:none }`.
   - Focus-visible ring (a11y for the now-clickable card).
2. **Bigger tags** — `TechChip.module.scss`: `font-size: --fs-mono-xs → --fs-mono` (12px), padding `3px 9px → 4px 10px`.
3. **Swap callers** — `Skills.tsx` uses `<DisciplineCard href={DISCIPLINES[d].route} showArrow>`; `DisciplineScroller.tsx` uses `<DisciplineCard href={d.route} showArrow maxTools={5}>`. Delete the now-dead per-component markup; keep their grid wrappers.
4. **Fix ProjectCard hover perf** — replace `.media { transition: box-shadow }` md→lg with the same opacity-crossfade pseudo-element shadow technique (keep the `translateY(-6px)`), so the reference grid is smooth too.
5. **Entrance** — wrap card grids in the existing `Reveal`/`revealVariants` stagger (subtle, `whileInView`, reduced-motion safe).
6. Verify: `pnpm lint && typecheck && test && build`; Playwright screenshot About + home scroller (light/dark) — tags readable, hover lifts smoothly, shadows don't muddy text.

---

## Group 2 — Zone route transitions + blog bloom fix  (branch `feat/zone-transitions`)

### Context
- Every page repeats: `<Page discipline><Nav active/><Container><Stack/></Container><Footer/></Page>`. `Page` sets `--accent` inline + renders `<Bloom/>`. So Nav/Bloom/accent **remount per route** → no cross-route animation, instant color swap.
- Blog bloom "different position" = `Bloom` is `position:absolute; inset:0` inside `.page` (full document height) with **% vertical offsets** → on the tall blog page the glows spread out. Fix = anchor to viewport.

### Tasks
1. **`src/components/layout/Shell/Shell.tsx`** (`'use client'`) — persistent wrapper rendered once in `layout.tsx`:
   - `const discipline = disciplineFromPathname(usePathname())` — `/` & `/about` → undefined (tomato default); `/blog*` → `blog`; else first segment if a discipline.
   - Sets `--accent`/`--accent-glow` on its root from the discipline. `usePathname()` resolves during SSR ⇒ correct first paint (no flash).
   - Renders: `<Bloom/>` (behind) + `<Nav active={discipline}/>` + `<main>{children}</main>` + `<Footer/>`.
   - Skip the accent transition on first mount (useRef flag) so it doesn't animate on load.
2. **`@property --accent`** (+ `--accent-glow`) in `globals.scss`: `syntax:'<color>'; inherits:true; initial-value:<tomato9>`. Add `transition: --accent var(--duration-bloom) var(--ease-standard)` on the Shell root (gated behind the after-mount flag / `prefers-reduced-motion`). → monogram, CTA, bloom, accent text all crossfade together.
3. **Bloom rework** (`Bloom.tsx` + `.module.scss`):
   - Anchor to viewport: `.bloom { position: fixed; inset: 0 }` (or `100vw/100vh` sizing) so it's height-independent (fixes blog). Keep `pointer-events:none`, `z-index:var(--z-base)`, `contain:paint`.
   - Make it a motion element keyed/triggered on `discipline`: **crossfade + pulse** — on change, `scale 1→0.94` + `opacity` dip, then back to `scale 1`/full as the new accent crossfades in (color comes from the `@property` transition). `DURATION.bloom`. `useReducedMotion` ⇒ no scale/opacity anim (color still swaps).
4. **Page composition refactor** — `layout.tsx` renders `<ThemeProvider><Shell>{children}</Shell></ThemeProvider>`. Strip `<Page><Nav/><Footer/>` from every route (`page.tsx`, `[discipline]/page.tsx`, `[discipline]/[slug]/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `about/page.tsx`, `not-found.tsx`); pages render just `<Container><Stack>…</Stack></Container>`. Discipline still flows to content components (SectionHero etc.) from params as today.
   - Retire/repurpose `Page`: move `min-height/overflow-x:clip` to Shell; move `background: var(--bg)` to `body` so the persistent (behind-content) bloom shows. Verify content sections are transparent over the bloom.
5. **Nav (subtle)** — monogram + CTA already `background: var(--accent)`; now persistent + inheriting the transitioning `--accent` ⇒ they morph automatically. No nav-item recolor.
6. Verify: build green; Playwright — navigate code→music→blog, confirm bloom pulses + accent crossfades together, blog bloom now matches other pages' placement, no first-load flash/animation, reduced-motion swaps instantly.

---

## Sequencing
Group 1 first (self-contained, low risk) → merge. Then Group 2 (architectural) → merge. Screenshot-verify each before merge; keep `lint/typecheck/test/build` green.
