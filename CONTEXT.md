# Portfolio

Tom Hinsley's personal portfolio: four creative-practice hubs, project detail pages, an About page with an interactive CV timeline, and a blog. Content is Markdown + Zod; the visual identity recolours itself per route.

## Language

### Disciplines & accent

**Discipline**:
One of four creative practices the work is organised under — code, audio, video, blog. Each maps to a Radix hue (`lib/disciplines.ts`).
_Avoid_: category, section, tag.

**Discipline meta**:
The resolved presentation facts for a Discipline — label, accent `color` (step-9 fill), `ink` (step-11 text), `onAccent`, gradient, swatches, route. Source: `DISCIPLINES`.
_Avoid_: theme, config, palette.

**Zone**:
The active accent context for the current route — a Discipline, or the default (home / About → tomato brand). Drives the **Accent** tokens, the **Bloom** tint, and the **Nav** highlight. Derived from the pathname by `resolveZone` in `lib/zone.ts` (the **Shell** calls it once and passes the accent tokens down).
_Avoid_: section, page, route, mode, theme.

**Accent tokens**:
The three CSS custom properties a **Zone** resolves to: `--accent` (step-9 solid fill), `--accent-ink` (step-11 legible coloured text), `--on-accent` (text drawn on the accent fill).
_Avoid_: primary/brand colour (those name only the default Zone's tomato).

### Content

**Project**:
A portfolio item belonging to exactly one **Discipline**, authored as Markdown + Zod-validated frontmatter in `content/projects/*.md`.
_Avoid_: work, case study, post.

**Post**:
A blog article in `content/blog/*.md` (Markdown + Zod), with a reading-time estimate and an **Author**.
_Avoid_: article, blog, entry.

**Timeline entry**:
One career/education step in the About CV timeline; may carry a `companyUrl` linking out to a **Company**.
_Avoid_: job, role, experience.

**Company**:
A recurring employer/establishment with a canonical website URL, kept once in `data/companies.ts` so links update in one place.
_Avoid_: client, employer, org.

**Skill group**:
A **Discipline** paired with its tool list (the About "what I work with" cards).

**Media item**:
One entry in a **Project**'s ordered `media` list: an image or an externally-hosted YouTube video, each with an optional title. `media[0]` is the project's cover poster and card thumbnail. Modelled as a Zod discriminated union (`MediaItem`); built to extend to Vimeo / self-hosted / audio later.
_Avoid_: cover, gallery, asset, attachment.

### Shell & chrome

**Shell**:
The single persistent client layout (Nav + Bloom + Breadcrumb + main + Footer) rendered once in the root layout; it survives navigation and owns the current **Zone**, so accent and bloom morph in place instead of remounting.
_Avoid_: layout, wrapper, page, frame.

**Bloom**:
The fixed full-viewport ambient glow, tinted by the current **Zone** and crossfaded on Zone change.
_Avoid_: background, gradient, glow.

**Breadcrumb**:
The persistent, clickable route trail (Home / Section / Leaf) derived from the pathname; the changing segment slides via **Rolling**.
_Avoid_: nav, eyebrow.

### Building blocks

**Media**:
The image wrapper (`next/image`) that renders a still (a **Project**'s cover poster, resolved from `media[0]` by `coverImage`, or a **Post** cover); absent a `src` it falls back to the **Discipline** gradient. Takes a `sizes` recipe from `IMG_SIZES`.

**Cover thumbnail**:
A content item's card/hero cover, resolved once per type by parallel modules over **Media**: **ProjectThumb** renders a **Project**'s bespoke vector vignette (slug → a registry of hand-drawn thumbs) or its `media[0]` image; **PostThumb** renders a **Post**'s cover image or, absent one, a generated motif (**BlogThumb**, chosen from the Post's content). Both fall through to the **Discipline** gradient when there's nothing. The two differ on purpose — Projects curate by slug, Posts generate from metadata — but share this shape so a new content type follows it.
_Avoid_: thumbnail, image, asset.

**Media hero**:
The project page's top "pride of place" poster (`media[0]`); clicking it opens the **Media carousel**. Replaced the former cover embed. Its three view modes — gradient (no media), inline lone-video, and clickable poster — are chosen by the pure `mediaHeroView` seam in `lib/project-presentation.ts`, not by inline conditionals in the component.
_Avoid_: embed, banner.

**Media carousel**:
The fullscreen glass lightbox over a **Project**'s `media`: scroll-snap slides (photos via **Media**, videos via the **YouTube facade**), arrow/Esc keys, a counter, and swipe-down-to-dismiss.
_Avoid_: gallery, slider, modal.

**YouTube facade**:
A click-to-load video: a poster (custom, or YouTube's hosted still) that swaps in the player `<iframe>` only on click, so no YouTube script loads until play.
_Avoid_: embed, player.

**Chart**:
A horizontal bar chart for **Post** bodies, authored in markdown as a fenced ```chart block (JSON: title, unit, note, data[]). Server-rendered HTML coloured from Radix hue vars, so it adapts to light/dark; each bar may pick a hue. See `ui/Chart`.

**Pill**:
A small label chip; when given a `color`/`onColor` it is tinted by a specific **Discipline** rather than the **Zone**.

**LinkArrow**:
The brand boxicon arrow that marks "this navigates / opens" (1.2em default, `inline` = text-sized), replacing assorted unicode arrows.

**Motion primitives**:
The reusable animation building blocks — pick by trigger:
- **Entrance** (`Entrance`/`EntranceItem`/`EntranceTitle`) — a first-load / per-route reveal, CSS-driven, plays once per page load.
- **Reveal** — a scroll-triggered fade-up wrapper, **Motion**-driven (`whileInView`, fires at ~20% visible); for ordinary content blocks.
- **RevealThumb** (over **`useReveal`**) — a scroll-triggered reveal for the bespoke project thumbs, **CSS-class**-driven (it toggles an `.inview` class the thumb's own SCSS keyframes hang off). Reach for this, not `Reveal`, when the entrance is authored in the component's stylesheet.
- **Rolling** — slides a value to its new value when it changes.
- **Marquee** — a continuous horizontal scroll, paused off-screen (via `useInView`).
- **ZoneCrossfade** — dissolves a tinted layer to its new colour when the **Zone** changes (opacity crossfade, not colour interpolation — an OKLab tween would pass through muddy midpoints). Drives the **Bloom** tint and the **Nav** accent fill.

`Reveal` (Motion) and `RevealThumb`/`useReveal` (CSS) are deliberately **separate mechanisms, not duplicates** — see ADR-0002.

## Relationships

- A **Project** belongs to exactly one **Discipline**; a **Discipline** has many **Projects** (except **blog**, which has **Posts**, not **Projects**).
- A **Discipline** resolves to a **Discipline meta** (label, **Accent tokens**, gradient, route).
- A **Zone** is a **Discipline** or the default; it resolves the **Accent tokens**, the **Bloom** tint, and the **Nav** highlight.
- The **Shell** renders the **Nav**, **Bloom**, **Breadcrumb**, and **Footer** once, and owns the current **Zone**.
- A **Timeline entry** may reference a **Company**; a **Post** has one **Author**.
- A **Project** has an ordered list of **Media items** (images and YouTube videos); the first is its cover/hero poster, and the set opens in the **Media carousel**.
- **Media** (the wrapper) renders a **Project**'s poster (from `media[0]`) or a **Post** cover, or the **Discipline** gradient when none exists.
- A **Project**/**Post** card's **Pill** is coloured by its own **Discipline**, never by the current **Zone** (only the Shell chrome follows the Zone).

## Example dialogue

> **Dev:** "When I navigate from `/code` to `/audio`, does the Shell remount?"
> **Maintainer:** "No — the **Shell** persists; only the **Zone** changes, so the **Accent tokens** and the **Bloom** tint morph in place."
> **Dev:** "And a **Project** card on the home page — is it tinted by the current **Zone**?"
> **Maintainer:** "No. A card's **Pill** is coloured by the **Project**'s own **Discipline**. The **Zone** only drives the chrome — Nav highlight, Bloom, accented text."

## Flagged ambiguities

- **blog as Discipline vs. content type**: `blog` is a member of the `Discipline` enum (so it gets a hue, route, and Nav slot) but it holds **Posts**, not **Projects**. Treat it as a Discipline for chrome/routing, a content type for data.
- **"section"**: used loosely for both a Discipline hub route (`/code`) and a generic page region. Prefer **Discipline** for the hub; reserve "section" for layout regions only.
- **"accent" vs "brand"**: **Accent tokens** are **Zone**-relative; the tomato brand colour is just the default Zone's accent, not a fixed global.
