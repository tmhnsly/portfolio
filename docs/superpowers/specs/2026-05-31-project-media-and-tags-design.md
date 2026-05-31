# Unified project media model + tags rename

Date: 2026-05-31
Status: Approved (phase 1)
Branch: `feat/unified-media-tags`

## Problem

Project media is split across three places and cannot hold video or audio:

- `cover` is a single image (hero block + card thumbnail).
- `gallery` is a separate captioned image grid at the bottom of the page.
- Externally hosted video (YouTube) has nowhere to live. `ProjectEmbed` only renders a `cover` image or a hardcoded `boucle` special case.

Separately, the project schema carries both `tech` (rendered as the chips) and a `tags` field that nothing reads. `tech` is effectively the tags.

No project currently sets `cover`, `gallery`, or `tags`, so there is no media data to migrate. This is the cheap moment to consolidate.

## Goals

- One ordered `media` list per project that holds photos and externally hosted video, each with an optional title.
- The first media item's poster is the hero ("pride of place") at the top of the page AND the card thumbnail. One asset, dual purpose.
- A fullscreen, on-brand (glassmorphic) carousel/lightbox over a project's media: tap the hero to enter, swipe down to dismiss, left/right buttons, arrow-key and Esc keyboard nav, mixed photo + video slides.
- Unify the tagging vocabulary: rename project `tech` to `tags` and surface it under a "Tags" label.

## Non-goals (phase 1)

- A fully custom / brandless video player. v1 uses the YouTube facade with native controls once playing. Evaluating custom player packages (YouTube IFrame API custom controls, Vimeo, self-hosted MP4) is phase 2.
- Audio, Vimeo, and self-hosted video. The schema is designed so these are added later as new union cases with no refactor.
- Any change to the blog, which keeps its own `cover` and `tags`.

## Decisions

1. **Slide navigation: native CSS scroll-snap** (as in Mandy Dennis Art's `ArtworkLightbox`). A horizontal `snap-mandatory` track gives swipe-between and momentum for free. motion 12 is used only for the open/close transition. The swipe-down-to-dismiss touch handler is ported and restyled.
   - Rejected: motion-driven drag (as in `CardDeck`). Heavier, and the stacked-deck physics are wrong for full-width fullscreen media.
2. **v1 video = facade + native controls.** Custom poster, click loads the iframe with `rel=0&modestbranding=1`; YouTube's own controls drive playback. Custom on-brand controls are phase 2.
3. **`media[0]` is the canonical cover** for both the hero and the card thumbnail.
4. **Retire the separate `Gallery` grid.** All media lives in `media` and is presented through the hero + lightbox (one source of truth).

## Data model (Zod 4)

On `projectFrontmatterSchema`:

- Rename `tech` to `tags` (string array, default `[]`). Remove the unused standalone `tags`.
- Remove `cover` and `gallery`. Add `media`.

```
const mediaImage   = { type: 'image',   src: string, alt?: string, title?: string }
const mediaYouTube = { type: 'youtube', id: string,  poster?: string, alt?: string, title?: string }

media: z.array(z.discriminatedUnion('type', [mediaImage, mediaYouTube])).default([])
tags:  z.array(z.string()).default([])
```

`media` is ordered. `media[0]` is the hero and the card thumbnail. Extensible: `vimeo`, `mp4`, and `audio` are future union cases.

Soft guideline of ~12 items per project. No hard schema cap; if a future need arises it is a one-line `.max()`.

## Components

- **`MediaCarousel`** (client, new) — fullscreen glass lightbox. Scroll-snap track of full-width slides; glass nav buttons and an `n / total` counter; arrow-key + Esc keyboard nav; swipe-between (native snap); swipe-down-to-dismiss (ported touch handler, threshold in a pure helper). Rendered in a portal with `role="dialog"`, `aria-modal`, focus trap, and body-scroll lock. Photo slides render via `Media`; video slides via `YouTubeEmbed`. Each slide shows its `title`.
- **`MediaHero`** (new, replaces `ProjectEmbed`) — the top poster block (`media[0]`). Play badge when the first item is a video; `1 / N` badge when there is more than one item. Click opens `MediaCarousel` at index 0. Ports the existing `boucle` special-case embed unchanged.
- **`YouTubeEmbed`** (new, the facade) — custom poster, click swaps in the iframe (`rel=0&modestbranding=1`). Poster fallback chain: custom `poster` -> `https://i.ytimg.com/vi/{id}/maxresdefault.jpg` -> discipline gradient. Used by both the hero (single video) and carousel slides.
- **`lib/youtube.ts`** (new) — pure builders for the embed URL and the thumbnail URL. Unit-tested.
- **`coverImage(project)`** added to `lib/project-presentation.ts` — resolves `media[0]` to `{ src?, alt }` for cards, with the discipline gradient as the fallback.

## Page flow

`src/app/[discipline]/[slug]/page.tsx`: `MediaHero` (top) -> `ProjectBody` -> `PrevNext` / `RelatedWork`. `Gallery` is removed from the page. `MediaCarousel` mounts once at page level and is opened by the hero.

## Rewired call sites

- `ProjectCard`, `CardDeck`, `RecentWork`: `project.cover?.src` -> `coverImage(project)`.
- `ProjectBody`: the "Built with" sidebar list -> `project.tags`, eyebrow label changed to "Tags". `ProjectCard` chips -> `project.tags`.
- `schemas.test.ts`: the `fm.tech` default assertion -> `fm.tags`.
- Delete: `Gallery` component, `ProjectEmbed` (becomes `MediaHero`), the project `cover`/`gallery`/old `tags` schema fields.

## Testing (vitest + jsdom)

- Pure units: `lib/youtube` URL + thumbnail builders; `coverImage`; schema parsing (media union accepts both cases and rejects unknown `type`; `tags` and `media` default to `[]`); the swipe-down threshold helper.
- Components: `MediaHero` renders the poster and opens the carousel on click; `MediaCarousel` renders the slides, the counter, advances on arrow keys, closes on Esc.
- Caveat: jsdom cannot simulate real scroll-snap momentum or touch gestures. The swipe-down commit logic is extracted to a pure, unit-tested helper; the gesture itself is verified manually.

## Suggested build order

1. `tech` -> `tags` rename (schema, 12 content files, components, test). Small and independent; land first.
2. Schema: add the `media` union, remove `cover`/`gallery`.
3. `lib/youtube.ts` + `YouTubeEmbed` facade (+ tests).
4. `coverImage` helper; rewire card thumbnails.
5. `MediaHero` (replaces `ProjectEmbed`; port `boucle`).
6. `MediaCarousel` (lightbox, nav, gestures).
7. Wire the page, delete `Gallery`, add Wake's YouTube media to `wake.md`.

## Phase 2 (after phase 1 ships)

Come back to the owner to evaluate a fully on-brand player: YouTube IFrame API with custom controls, Vimeo, or self-hosted MP4 with a native `<video>` element. Driven by how much the residual YouTube chrome bothers him in practice.
