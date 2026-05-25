# Portfolio

Tom Hinsley's personal portfolio: six creative-practice hubs, project detail pages, an About page with an interactive CV timeline, and a blog. Content is Markdown + Zod; the visual identity recolours itself per route.

## Language

### Disciplines & accent

**Discipline**:
One of six creative practices the work is organised under — code, music, sound, photo, video, blog. Each maps to a Radix hue (`lib/disciplines.ts`).
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
The image wrapper (`next/image`) that renders a cover, or — absent a `src` — falls back to the **Discipline** gradient. Takes a `sizes` recipe from `IMG_SIZES`.

**Pill**:
A small label chip; when given a `color`/`onColor` it is tinted by a specific **Discipline** rather than the **Zone**.

**LinkArrow**:
The brand boxicon arrow that marks "this navigates / opens" (1.2em default, `inline` = text-sized), replacing assorted unicode arrows.

**Entrance / Rolling**:
Motion primitives — `Entrance`/`EntranceTitle` play a first-load / per-route reveal; `Rolling` slides a value to its new value when it changes.

## Relationships

- A **Project** belongs to exactly one **Discipline**; a **Discipline** has many **Projects** (except **blog**, which has **Posts**, not **Projects**).
- A **Discipline** resolves to a **Discipline meta** (label, **Accent tokens**, gradient, route).
- A **Zone** is a **Discipline** or the default; it resolves the **Accent tokens**, the **Bloom** tint, and the **Nav** highlight.
- The **Shell** renders the **Nav**, **Bloom**, **Breadcrumb**, and **Footer** once, and owns the current **Zone**.
- A **Timeline entry** may reference a **Company**; a **Post** has one **Author**.
- **Media** renders a **Project**/**Post** cover, or the **Discipline** gradient when none exists.
- A **Project**/**Post** card's **Pill** is coloured by its own **Discipline**, never by the current **Zone** (only the Shell chrome follows the Zone).

## Example dialogue

> **Dev:** "When I navigate from `/code` to `/music`, does the Shell remount?"
> **Maintainer:** "No — the **Shell** persists; only the **Zone** changes, so the **Accent tokens** and the **Bloom** tint morph in place."
> **Dev:** "And a **Project** card on the home page — is it tinted by the current **Zone**?"
> **Maintainer:** "No. A card's **Pill** is coloured by the **Project**'s own **Discipline**. The **Zone** only drives the chrome — Nav highlight, Bloom, accented text."

## Flagged ambiguities

- **blog as Discipline vs. content type**: `blog` is a member of the `Discipline` enum (so it gets a hue, route, and Nav slot) but it holds **Posts**, not **Projects**. Treat it as a Discipline for chrome/routing, a content type for data.
- **"section"**: used loosely for both a Discipline hub route (`/code`) and a generic page region. Prefer **Discipline** for the hub; reserve "section" for layout regions only.
- **"accent" vs "brand"**: **Accent tokens** are **Zone**-relative; the tomato brand colour is just the default Zone's accent, not a fixed global.
