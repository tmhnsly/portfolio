# Content schema

Frontmatter reference for authoring `content/projects/*.md` and `content/blog/*.md`. The file name (minus `.md`) is the slug. Validated by Zod at build — a bad field fails the build. **Source of truth: `src/lib/schemas.ts`**; tag vocabulary: `src/lib/tags.ts`.

## Project (`content/projects/*.md`)

```yaml
title: Chork                       # required
desc: A rock-climbing companion    # optional, short
discipline: code                   # required — code | audio | video | blog
date: "2026-03-01"                 # required — ISO yyyy-mm-dd (drives ordering)
tags: ["React", "Next.js"]         # must each exist in src/lib/tags.ts
featured: true                     # optional (default false) — see "featured" below
role: Design + build               # optional
year: 2026                         # optional (number)
status: "In development"           # optional
liveUrl: https://…                 # optional
repo: github.com/…                 # optional
links:                             # optional — extra links
  - label: Case study
    url: "https://…"
media:                             # optional, ordered; media[0] is the cover + hero
  - type: image
    src: /images/projects/…/cover.webp
    alt: "…"
    title: "…"                     # optional, shown in the carousel
  - type: youtube
    id: "aczbUlJXRo0"
    list: "PL…"                    # optional playlist
    poster: /images/…/poster.webp  # optional; falls back to YouTube's still
```

`media[0]` is the card thumbnail and the Media hero. With no `media`, a project listed in the `project-thumbs` registry draws its bespoke vignette; otherwise the Discipline gradient.

## Post (`content/blog/*.md`)

```yaml
title: "SCSS or Tailwind…"         # required
excerpt: "…"                       # required — one line, shown on cards
date: "2026-06-04"                 # required — ISO
category: Opinion                  # required — free text, drives the filter pills
tags: ["SCSS", "CSS", "AI"]        # must each exist in src/lib/tags.ts
featured: true                     # optional (default false) — leads the index
readingTime: 6                     # optional — computed from word count if absent
cover:                             # optional real image
  src: /images/blog/…
  alt: "…"
thumb: code                        # optional — fallback motif when there's no cover
```

### `thumb` (fallback cover motif)

When a post has no `cover.src`, `BlogThumb` draws a motif. Set `thumb` to pick one, else it's inferred from category + tags. Keys: `code`, `datacenter`, `motion`, `feed`, `audio`, `writing`, `reading`, `process`. Each carries a fitting hue (e.g. `datacenter` = blue).

### "featured"

`featured: true` leads the blog index (`splitFeatured`); otherwise the most-recent post leads. The home **deck** is curated separately in `lib/content.ts` (`featuredProjects`, `DECK_LEAD`).

## Charts (in post bodies)

A fenced ` ```chart ` block renders `ui/Chart` (Radix-coloured bars):

```chart
{ "title": "…", "unit": "ml", "note": "Sources / caveats",
  "data": [ { "label": "…", "value": 30, "hue": "blue", "display": "~10–50" } ] }
```

`hue` is a Radix scale imported in `app/layout.tsx` (`orange`, `blue`, `green`, `tomato`, `gray`); `display` overrides the printed value.
