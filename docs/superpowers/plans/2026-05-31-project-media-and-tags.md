# Unified Project Media + Tags Rename — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace per-project `cover` + `gallery` with one ordered `media` list (photos + YouTube), surfaced as a "pride of place" hero that opens a fullscreen glass carousel, and rename project `tech` to `tags`.

**Architecture:** A Zod 4 discriminated union (`image` | `youtube`) drives a `MediaHero` (poster, replaces `ProjectEmbed`) which opens a `MediaCarousel` (CSS scroll-snap lightbox, ported from Mandy Dennis Art's `ArtworkLightbox`, restyled with our glass tokens). A `YouTubeEmbed` facade loads the iframe only on click. The schema change is additive first; `cover`/`gallery` are deleted only after every reader is rewired, so the build stays green at each task.

**Tech Stack:** Next.js 16 / Turbopack, React 19, Zod 4, motion 12, SCSS modules, vitest + jsdom + @testing-library/react, react-icons.

**Spec:** `docs/superpowers/specs/2026-05-31-project-media-and-tags-design.md`

---

## File Structure

**New files**
- `src/lib/youtube.ts` — pure embed-URL + thumbnail-URL builders.
- `src/lib/gesture.ts` — pure swipe-down dismiss threshold.
- `src/components/project/YouTubeEmbed/YouTubeEmbed.tsx` + `.module.scss` — click-to-load facade.
- `src/components/project/MediaCarousel/MediaCarousel.tsx` + `.module.scss` — fullscreen glass lightbox.
- `src/components/project/MediaHero/MediaHero.tsx` + `.module.scss` — top poster block (replaces `ProjectEmbed`).
- Test files alongside: `src/lib/youtube.test.ts`, `src/lib/gesture.test.ts`, `src/lib/project-presentation.test.ts`, and `*.test.tsx` for the three components.

**Modified**
- `src/lib/schemas.ts` — `tech`→`tags`, drop standalone `tags`, drop `cover`/`gallery`, add `media` union + `MediaItem` type.
- `src/types/index.ts` — re-export `MediaItem`.
- `src/lib/project-presentation.ts` — add `coverImage(project)`.
- `src/lib/schemas.test.ts` — update default assertions.
- `src/components/section/ProjectCard/ProjectCard.tsx` — `tech`→`tags`, `cover`→`coverImage`.
- `src/components/project/ProjectBody/ProjectBody.tsx` — `tech`→`tags`, label "Tags".
- `src/components/home/RecentWork/RecentWork.tsx` — `cover`→`coverImage`.
- `src/components/home/CardDeck/CardDeck.tsx` — `cover`→`coverImage`.
- `src/app/[discipline]/[slug]/page.tsx` — `ProjectEmbed`→`MediaHero`, remove `Gallery`.
- `content/projects/*.md` (12 files) — `tech:`→`tags:`.
- `content/projects/wake.md` — add `media`.

**Deleted (final task)**
- `src/components/project/ProjectEmbed/` and `src/components/project/Gallery/`.

---

## Task 1: Rename `tech` → `tags`

**Files:**
- Modify: `src/lib/schemas.ts`
- Modify: `src/lib/schemas.test.ts:7`
- Modify: `src/components/project/ProjectBody/ProjectBody.tsx:22-33`
- Modify: `src/components/section/ProjectCard/ProjectCard.tsx:27`
- Modify: `content/projects/*.md` (12 files)

- [ ] **Step 1: Update the schema test to expect `tags`**

In `src/lib/schemas.test.ts`, change line 7 from `expect(fm.tech).toEqual([]);` to:

```ts
    expect(fm.tags).toEqual([]);        // default (was `tech`)
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/schemas.test.ts`
Expected: FAIL — `fm.tech` no longer asserted but schema still has `tech`, so `fm.tags` is `undefined`.

- [ ] **Step 3: Rename the field in the schema**

In `src/lib/schemas.ts`, inside `projectFrontmatterSchema`, delete the `tech` line and the standalone `tags` line, and add a single `tags` with a default. Result block:

```ts
export const projectFrontmatterSchema = z.object({
  title: z.string(),
  desc: z.string().optional(),
  discipline: disciplineSchema,
  date: z.string(),               // ISO yyyy-mm-dd
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  role: z.string().optional(),
  year: z.number().optional(),
  status: z.string().optional(),
  repo: z.string().optional(),
  liveUrl: z.string().optional(),
  cover: imageRef.optional(),
  gallery: z.array(galleryFrame).default([]),
});
```

(Note: `cover`/`gallery` stay for now — removed in Task 9. The old `tags: z.array(z.string()).optional()` is gone, merged into the new default `tags`.)

- [ ] **Step 4: Run the schema test to verify it passes**

Run: `npx vitest run src/lib/schemas.test.ts`
Expected: PASS.

- [ ] **Step 5: Rename `tech:` to `tags:` in all 12 content files**

Run:

```bash
sed -i '' 's/^tech:/tags:/' content/projects/*.md
grep -rn "^tech:" content/projects/ || echo "no tech: keys remain"
```

Expected: "no tech: keys remain".

- [ ] **Step 6: Update the components that read `project.tech`**

In `src/components/section/ProjectCard/ProjectCard.tsx` line 27, change `project.tech` to `project.tags`:

```tsx
        <div className={styles.chips}>{project.tags.map((t) => <TechChip key={t} label={t} />)}</div>
```

In `src/components/project/ProjectBody/ProjectBody.tsx`, change the sidebar block (lines 22-33) to read `project.tags` and relabel the eyebrow to "Tags":

```tsx
        {project.tags.length > 0 && (
          <div className={styles.sideSection}>
            <Eyebrow>Tags</Eyebrow>
            <ul className={styles.techList}>
              {project.tags.map((t) => (
                <li key={t} className={styles.techRow}>
                  <TechChip label={t} />
                </li>
              ))}
            </ul>
          </div>
        )}
```

- [ ] **Step 7: Typecheck + full test run**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS, no type errors (no remaining `.tech` references).

- [ ] **Step 8: Commit**

```bash
git add src/lib/schemas.ts src/lib/schemas.test.ts src/components/project/ProjectBody/ProjectBody.tsx src/components/section/ProjectCard/ProjectCard.tsx content/projects
git commit -m "refactor(projects): rename tech field to tags"
```

---

## Task 2: Add the `media` union to the schema (additive)

**Files:**
- Modify: `src/lib/schemas.ts`
- Modify: `src/types/index.ts:1-4`
- Modify: `src/lib/schemas.test.ts`

- [ ] **Step 1: Write the failing test**

Add two tests to `src/lib/schemas.test.ts` inside the `describe('schemas', …)` block:

```ts
  it('defaults media to an empty array', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'X', discipline: 'code', date: '2026-03-01' });
    expect(fm.media).toEqual([]);
  });
  it('parses image and youtube media items and rejects unknown types', () => {
    const fm = projectFrontmatterSchema.parse({
      title: 'X', discipline: 'video', date: '2026-03-01',
      media: [
        { type: 'image', src: '/a.jpg', alt: 'a', title: 'A' },
        { type: 'youtube', id: 'abc123', poster: '/p.jpg', title: 'Clip' },
      ],
    });
    expect(fm.media).toHaveLength(2);
    expect(() => projectFrontmatterSchema.parse({
      title: 'X', discipline: 'video', date: '2026-03-01',
      media: [{ type: 'audio', src: '/a.mp3' }],
    })).toThrow();
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/schemas.test.ts`
Expected: FAIL — `fm.media` is `undefined`; unknown-type does not throw.

- [ ] **Step 3: Add the union + field + type**

In `src/lib/schemas.ts`, after the existing `galleryFrame` definition add the media schemas:

```ts
const mediaImage = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string().optional(),
  title: z.string().optional(),
});
const mediaYouTube = z.object({
  type: z.literal('youtube'),
  id: z.string(),
  poster: z.string().optional(),
  alt: z.string().optional(),
  title: z.string().optional(),
});
const mediaItem = z.discriminatedUnion('type', [mediaImage, mediaYouTube]);
export type MediaItem = z.infer<typeof mediaItem>;
```

Add `media` to `projectFrontmatterSchema` (place it next to `gallery`):

```ts
  media: z.array(mediaItem).default([]),
```

- [ ] **Step 4: Re-export the type**

In `src/types/index.ts`, add `MediaItem` to the export list:

```ts
export type {
  Discipline, DisciplineMeta, Project, ProjectFrontmatter, MediaItem,
  BlogPost, PostFrontmatter, Author, TimelineEntry, SkillGroup, SiteConfig,
} from '@/lib/schemas';
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/lib/schemas.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/schemas.ts src/types/index.ts src/lib/schemas.test.ts
git commit -m "feat(schema): add project media union (image | youtube)"
```

---

## Task 3: `lib/youtube.ts` — pure URL builders

**Files:**
- Create: `src/lib/youtube.ts`
- Test: `src/lib/youtube.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { youTubeEmbedUrl, youTubeThumbnail } from './youtube';

describe('youtube', () => {
  it('builds a privacy-friendly embed url with minimal chrome', () => {
    const url = youTubeEmbedUrl('abc123');
    expect(url).toContain('youtube-nocookie.com/embed/abc123');
    expect(url).toContain('rel=0');
    expect(url).toContain('modestbranding=1');
    expect(url).not.toContain('autoplay');
  });
  it('adds autoplay when requested', () => {
    expect(youTubeEmbedUrl('abc123', { autoplay: true })).toContain('autoplay=1');
  });
  it('builds the hosted thumbnail url', () => {
    expect(youTubeThumbnail('abc123')).toBe('https://i.ytimg.com/vi/abc123/maxresdefault.jpg');
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/youtube.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
/** Pure builders for embedding YouTube without pulling in any SDK. */

/** Privacy-friendly embed URL with related videos off and reduced branding. */
export function youTubeEmbedUrl(id: string, { autoplay = false }: { autoplay?: boolean } = {}): string {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1', playsinline: '1' });
  if (autoplay) params.set('autoplay', '1');
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** The high-res still YouTube hosts for a video id (may 404 on old uploads — a
    custom `poster` is preferred; the discipline gradient is the final fallback). */
export function youTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/youtube.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/youtube.ts src/lib/youtube.test.ts
git commit -m "feat(youtube): add embed + thumbnail url builders"
```

---

## Task 4: `lib/gesture.ts` — swipe-down threshold

**Files:**
- Create: `src/lib/gesture.ts`
- Test: `src/lib/gesture.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { dismissOnDragDown } from './gesture';

describe('dismissOnDragDown', () => {
  it('commits a dismiss past the threshold', () => {
    expect(dismissOnDragDown(140)).toBe(true);
  });
  it('springs back below the threshold', () => {
    expect(dismissOnDragDown(40)).toBe(false);
  });
  it('respects a custom threshold', () => {
    expect(dismissOnDragDown(60, 50)).toBe(true);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/gesture.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
/** A downward drag of `dy` px commits a dismiss once it passes `threshold`. */
export function dismissOnDragDown(dy: number, threshold = 100): boolean {
  return dy > threshold;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/gesture.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/gesture.ts src/lib/gesture.test.ts
git commit -m "feat(gesture): add swipe-down dismiss threshold"
```

---

## Task 5: `coverImage()` helper

**Files:**
- Modify: `src/lib/project-presentation.ts`
- Test: `src/lib/project-presentation.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { coverImage } from './project-presentation';
import { projectFrontmatterSchema } from './schemas';
import type { Project, MediaItem } from '@/types';

function project(media: MediaItem[]): Project {
  return { ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'music', date: '2015-02-01', media }), slug: 'wake', body: '' };
}

describe('coverImage', () => {
  it('uses the first image item', () => {
    expect(coverImage(project([{ type: 'image', src: '/a.jpg', alt: 'A' }]))).toEqual({ src: '/a.jpg', alt: 'A' });
  });
  it('uses a youtube poster when present', () => {
    expect(coverImage(project([{ type: 'youtube', id: 'abc', poster: '/p.jpg', title: 'Clip' }])).src).toBe('/p.jpg');
  });
  it('falls back to the youtube thumbnail when no poster', () => {
    expect(coverImage(project([{ type: 'youtube', id: 'abc' }])).src).toBe('https://i.ytimg.com/vi/abc/maxresdefault.jpg');
  });
  it('returns no src (gradient fallback) when there is no media', () => {
    expect(coverImage(project([]))).toEqual({ src: undefined, alt: 'Wake' });
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/project-presentation.test.ts`
Expected: FAIL — `coverImage` is not exported.

- [ ] **Step 3: Implement `coverImage`**

In `src/lib/project-presentation.ts`, add the import and the function:

```ts
import { youTubeThumbnail } from './youtube';
```

```ts
/** The still used for a project's card thumbnail and hero poster: the first
    media item's image, or a youtube item's poster (falling back to YouTube's
    hosted still). `src` is undefined when there's no usable image, so callers
    render the discipline gradient via <Media grad>. */
export function coverImage(project: Project): { src?: string; alt: string } {
  const first = project.media[0];
  if (!first) return { src: undefined, alt: project.title };
  if (first.type === 'image') return { src: first.src, alt: first.alt ?? project.title };
  return { src: first.poster ?? youTubeThumbnail(first.id), alt: first.alt ?? first.title ?? project.title };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/project-presentation.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/project-presentation.ts src/lib/project-presentation.test.ts
git commit -m "feat(presentation): add coverImage resolver for media[0]"
```

---

## Task 6: `YouTubeEmbed` facade

**Files:**
- Create: `src/components/project/YouTubeEmbed/YouTubeEmbed.tsx`
- Create: `src/components/project/YouTubeEmbed/YouTubeEmbed.module.scss`
- Create: `src/components/project/YouTubeEmbed/index.ts`
- Test: `src/components/project/YouTubeEmbed/YouTubeEmbed.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { YouTubeEmbed } from './YouTubeEmbed';

const renderEmbed = () => render(<ThemeProvider><YouTubeEmbed id="abc123" title="Wake" /></ThemeProvider>);

describe('YouTubeEmbed', () => {
  it('shows a play button before playing', () => {
    renderEmbed();
    expect(screen.getByRole('button', { name: /play wake/i })).toBeTruthy();
    expect(document.querySelector('iframe')).toBeNull();
  });
  it('loads the iframe on click', () => {
    renderEmbed();
    fireEvent.click(screen.getByRole('button', { name: /play wake/i }));
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe!.getAttribute('src')).toContain('embed/abc123');
    expect(iframe!.getAttribute('src')).toContain('autoplay=1');
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/project/YouTubeEmbed/YouTubeEmbed.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

`src/components/project/YouTubeEmbed/YouTubeEmbed.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { Media } from '@/components/ui/Media';
import { IMG_SIZES } from '@/lib/breakpoints';
import { youTubeEmbedUrl, youTubeThumbnail } from '@/lib/youtube';
import styles from './YouTubeEmbed.module.scss';

export function YouTubeEmbed({ id, poster, title, grad }: { id: string; poster?: string; title?: string; grad?: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={youTubeEmbedUrl(id, { autoplay: true })}
          title={title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className={styles.facade} onClick={() => setPlaying(true)} aria-label={title ? `Play ${title}` : 'Play video'}>
      <Media grad={grad} src={poster ?? youTubeThumbnail(id)} alt={title ?? ''} ratio="16/9" sizes={IMG_SIZES.full} className={styles.poster}>
        <span className={styles.play} aria-hidden>▶</span>
      </Media>
    </button>
  );
}
```

`src/components/project/YouTubeEmbed/index.ts`:

```ts
export { YouTubeEmbed } from './YouTubeEmbed';
```

`src/components/project/YouTubeEmbed/YouTubeEmbed.module.scss`:

```scss
@use '../../../styles/mixins/glass' as *;

.facade { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; }
.poster { width: 100%; }
.frame { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: var(--radius-xl); overflow: hidden; }
.iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

.play {
  position: absolute; inset: 0; margin: auto;
  width: 64px; height: 64px; display: grid; place-items: center;
  border-radius: 999px; color: #fff; font-size: 1.3rem; line-height: 1;
  @include glass(rgba(0, 0, 0, 0.35), 8px);
  transition: transform 0.15s ease;
}
.facade:hover .play { transform: scale(1.06); }
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/project/YouTubeEmbed/YouTubeEmbed.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/project/YouTubeEmbed
git commit -m "feat(media): add click-to-load YouTube facade"
```

---

## Task 7: `MediaCarousel` fullscreen glass lightbox

**Files:**
- Create: `src/components/project/MediaCarousel/MediaCarousel.tsx`
- Create: `src/components/project/MediaCarousel/MediaCarousel.module.scss`
- Create: `src/components/project/MediaCarousel/index.ts`
- Test: `src/components/project/MediaCarousel/MediaCarousel.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import type { MediaItem } from '@/types';
import { MediaCarousel } from './MediaCarousel';

beforeAll(() => {
  // jsdom implements neither — the component calls them for slide sync.
  Element.prototype.scrollIntoView = vi.fn();
});

const items: MediaItem[] = [
  { type: 'image', src: '/a.jpg', alt: 'A', title: 'First' },
  { type: 'youtube', id: 'abc', title: 'Second' },
  { type: 'image', src: '/c.jpg', alt: 'C', title: 'Third' },
];

function renderCarousel(onClose = vi.fn()) {
  render(<ThemeProvider><MediaCarousel items={items} startIndex={0} gradient="linear-gradient(black,black)" onClose={onClose} /></ThemeProvider>);
  return onClose;
}

describe('MediaCarousel', () => {
  it('renders a dialog with a slide per item and a counter', () => {
    renderCarousel();
    expect(screen.getByRole('dialog', { name: /media viewer/i })).toBeTruthy();
    expect(screen.getByText('01 / 03')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Third')).toBeTruthy();
  });
  it('advances the counter on the next button', () => {
    renderCarousel();
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('02 / 03')).toBeTruthy();
  });
  it('advances on ArrowRight and wraps', () => {
    renderCarousel();
    fireEvent.keyDown(document, { key: 'ArrowLeft' }); // wrap backwards from 0 -> last
    expect(screen.getByText('03 / 03')).toBeTruthy();
  });
  it('closes on Escape', () => {
    const onClose = renderCarousel();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/project/MediaCarousel/MediaCarousel.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

`src/components/project/MediaCarousel/MediaCarousel.tsx`:

```tsx
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';
import type { MediaItem } from '@/types';
import { IMG_SIZES } from '@/lib/breakpoints';
import { dismissOnDragDown } from '@/lib/gesture';
import { Media } from '@/components/ui/Media';
import { YouTubeEmbed } from '@/components/project/YouTubeEmbed';
import styles from './MediaCarousel.module.scss';

const pad = (n: number) => String(n).padStart(2, '0');

export function MediaCarousel({ items, startIndex = 0, gradient, onClose }: {
  items: MediaItem[]; startIndex?: number; gradient: string; onClose: () => void;
}) {
  const n = items.length;
  const canNav = n > 1;
  const [index, setIndex] = useState(startIndex);
  const backdropRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; locked: 'v' | 'h' | null; active: boolean }>({ x: 0, y: 0, locked: null, active: false });

  const go = useCallback((next: number) => {
    const clamped = (next + n) % n;
    (trackRef.current?.children[clamped] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setIndex(clamped);
  }, [n]);

  // Mount: jump to the start slide, focus the dialog, lock body scroll.
  useEffect(() => {
    (trackRef.current?.children[startIndex] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
    backdropRef.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, [startIndex]);

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'ArrowLeft') go(index - 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, go, onClose]);

  // Sync index from native scroll-snap once it settles.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const detect = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== index && i >= 0 && i < n) setIndex(i);
    };
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => { clearTimeout(t); t = setTimeout(detect, 90); };
    el.addEventListener('scrollend', detect);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scrollend', detect); el.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, [index, n]);

  // Swipe-down-to-dismiss (vertical lock; horizontal stays native scroll-snap).
  const onTouchStart = (e: React.TouchEvent) => { drag.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, locked: null, active: true }; };
  const onTouchMove = (e: React.TouchEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.touches[0].clientX - d.x;
    const dy = e.touches[0].clientY - d.y;
    if (!d.locked) {
      if (Math.abs(dy) > 8 || Math.abs(dx) > 8) d.locked = Math.abs(dy) > Math.abs(dx) ? 'v' : 'h';
      else return;
    }
    if (d.locked !== 'v' || dy <= 0) return;
    const track = trackRef.current, backdrop = backdropRef.current;
    if (!track || !backdrop) return;
    const progress = Math.min(dy / 300, 1);
    track.style.transition = 'none';
    track.style.transform = `translateY(${dy}px) scale(${1 - progress * 0.15})`;
    backdrop.style.setProperty('--dismiss', String(1 - progress));
  };
  const onTouchEnd = () => {
    const track = trackRef.current, backdrop = backdropRef.current;
    const dy = track ? parseFloat((track.style.transform.match(/translateY\(([\d.]+)px\)/) ?? [])[1] ?? '0') : 0;
    if (track && backdrop) {
      if (dismissOnDragDown(dy)) {
        track.style.transition = 'transform 0.2s ease-out';
        track.style.transform = 'translateY(100vh) scale(0.85)';
        backdrop.style.setProperty('--dismiss', '0');
        window.setTimeout(onClose, 200);
        drag.current.active = false;
        return;
      }
      track.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)';
      track.style.transform = '';
      backdrop.style.setProperty('--dismiss', '1');
    }
    drag.current = { x: 0, y: 0, locked: null, active: false };
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.top}>
        <button type="button" className={styles.btn} aria-label="Close" onClick={onClose}><BiX aria-hidden /></button>
      </div>

      <div ref={trackRef} className={styles.track}>
        {items.map((item, i) => (
          <div key={i} className={styles.slide}>
            <div className={styles.stage}>
              {item.type === 'image'
                ? <Media src={item.src} alt={item.alt ?? item.title ?? ''} grad={gradient} ratio="16/9" sizes={IMG_SIZES.full} className={styles.media} />
                : <YouTubeEmbed id={item.id} poster={item.poster} title={item.title} grad={gradient} />}
            </div>
            {item.title && <p className={styles.caption}>{item.title}</p>}
          </div>
        ))}
      </div>

      {canNav && (
        <div className={styles.bottom}>
          <button type="button" className={styles.btn} aria-label="previous" onClick={() => go(index - 1)}><BiChevronLeft aria-hidden /></button>
          <span className={styles.counter}>{pad(index + 1)} / {pad(n)}</span>
          <button type="button" className={styles.btn} aria-label="next" onClick={() => go(index + 1)}><BiChevronRight aria-hidden /></button>
        </div>
      )}
    </div>,
    document.body,
  );
}
```

`src/components/project/MediaCarousel/index.ts`:

```ts
export { MediaCarousel } from './MediaCarousel';
```

- [ ] **Step 4: Write the styles**

`src/components/project/MediaCarousel/MediaCarousel.module.scss`:

```scss
.backdrop {
  position: fixed; inset: 0; z-index: var(--z-modal, 1000);
  display: flex; flex-direction: column;
  background: rgba(0, 0, 0, calc(0.9 * var(--dismiss, 1)));
  backdrop-filter: blur(8px);
  outline: none;
}

.track {
  flex: 1; min-height: 0;
  display: flex; overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x mandatory; scroll-behavior: smooth;
  scrollbar-width: none;
}
.track::-webkit-scrollbar { display: none; }

.slide {
  flex: 0 0 100%; min-width: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-3, 0.75rem);
  scroll-snap-align: start;
  padding: clamp(0.75rem, 3vw, 2rem);
}
.stage { width: 100%; max-width: min(1100px, 92vw); }
.media { width: 100%; }

.caption {
  margin: 0; color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem; letter-spacing: 0.02em; text-align: center;
}

.top { position: absolute; top: 0; right: 0; padding: var(--space-3, 0.75rem); z-index: 2; }
.bottom {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: var(--space-4, 1rem);
}

.btn {
  width: 44px; height: 44px; display: grid; place-items: center;
  border-radius: 999px; cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  font-size: 1.1rem;
  transition: background 0.15s ease;
}
.btn:hover { background: rgba(255, 255, 255, 0.2); }

.counter {
  min-width: 4rem; text-align: center;
  padding: 0.4rem 0.75rem; border-radius: 999px;
  color: rgba(255, 255, 255, 0.7); font-size: 0.8rem; font-variant-numeric: tabular-nums;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}
```

(If `--z-modal` / `--space-*` tokens are absent, the fallbacks in the `var(…, fallback)` calls apply — confirm against `src/styles/tokens/_z.scss` and `_space.scss` and drop the fallback if a token exists.)

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/components/project/MediaCarousel/MediaCarousel.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/project/MediaCarousel
git commit -m "feat(media): add fullscreen glass media carousel"
```

---

## Task 8: `MediaHero` (replaces `ProjectEmbed`)

**Files:**
- Create: `src/components/project/MediaHero/MediaHero.tsx`
- Create: `src/components/project/MediaHero/MediaHero.module.scss`
- Create: `src/components/project/MediaHero/index.ts`
- Test: `src/components/project/MediaHero/MediaHero.test.tsx`
- Reference: `src/components/project/ProjectEmbed/ProjectEmbed.tsx` (boucle branch to port), `src/components/project/ProjectEmbed/ProjectEmbed.module.scss`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { projectFrontmatterSchema } from '@/lib/schemas';
import type { Project, MediaItem } from '@/types';
import { MediaHero } from './MediaHero';

beforeAll(() => { Element.prototype.scrollIntoView = vi.fn(); });

function project(media: MediaItem[], slug = 'wake'): Project {
  return { ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'music', date: '2015-02-01', media }), slug, body: '' };
}

describe('MediaHero', () => {
  it('opens the carousel when the poster is clicked', () => {
    render(<ThemeProvider><MediaHero project={project([{ type: 'youtube', id: 'abc', title: 'Wake' }])} /></ThemeProvider>);
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /play video|view media/i }));
    expect(screen.getByRole('dialog', { name: /media viewer/i })).toBeTruthy();
  });
  it('renders a plain gradient embed when there is no media', () => {
    render(<ThemeProvider><MediaHero project={project([])} /></ThemeProvider>);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/project/MediaHero/MediaHero.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component (and port the boucle branch)**

Open `src/components/project/ProjectEmbed/ProjectEmbed.tsx`. Copy its `boucle` branch verbatim into a local `BoucleEmbed` block below (the JSX inside `if (project.slug === 'boucle') { return (…) }`, lines 13-61), keeping the same class names. Write `src/components/project/MediaHero/MediaHero.tsx`:

```tsx
'use client';
import { useState } from 'react';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Media } from '@/components/ui/Media';
import { coverImage } from '@/lib/project-presentation';
import { MediaCarousel } from '@/components/project/MediaCarousel';
import styles from './MediaHero.module.scss';

const ACTIVE_PADS = new Set([0, 4, 6, 10, 11, 13]);

export function MediaHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];
  const [open, setOpen] = useState(false);

  // ── Bespoke interactive embed, ported verbatim from ProjectEmbed ──
  if (project.slug === 'boucle') {
    return (
      <div className={styles.embed}>
        <div className={styles.boucle} style={{ background: d.gradient }}>
          <div className={styles.hatch} aria-hidden />

          <div className={styles.chromaTop}>
            <span className={styles.chromaTitle}>Boucle · v0.4</span>
            <div className={styles.chromaRight}>
              <span>● rec</span>
              <span>120 bpm</span>
              <span>4/4</span>
            </div>
            <span>open in new tab <LinkArrow inline /></span>
          </div>

          <div className={styles.stage}>
            <div className={styles.dialLeft}>
              <div className={styles.dial}>
                <div className={styles.dialMark} style={{ transform: 'translateX(-50%) rotate(-45deg)' }} />
              </div>
              <span className={styles.dialLabel}>tempo · <strong>120</strong></span>
            </div>

            <div className={styles.padGrid}>
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className={`${styles.pad} ${ACTIVE_PADS.has(i) ? styles.padActive : ''}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            <div className={styles.dialRight}>
              <div className={styles.dial}>
                <div className={styles.dialMark} style={{ transform: 'translateX(-50%) rotate(60deg)' }} />
              </div>
              <span className={styles.dialLabel}>character · <strong>68</strong></span>
            </div>
          </div>

          <div className={styles.chromaBottom}>
            <span>▶ play · ⏵ shuffle · ⏺ record</span>
            <span className={styles.chromaTime}>00:00:14:02</span>
            <span>shift + space</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.media.length === 0) {
    return (
      <div className={styles.embed}>
        <Media grad={d.gradient} alt={project.title} ratio="16/9" sizes={IMG_SIZES.full} />
      </div>
    );
  }

  const cover = coverImage(project);
  const isVideo = project.media[0].type === 'youtube';
  const count = project.media.length;

  return (
    <div className={styles.embed}>
      <button type="button" className={styles.poster} onClick={() => setOpen(true)} aria-label={isVideo ? 'Play video' : 'View media'}>
        <Media grad={d.gradient} src={cover.src} alt={cover.alt} ratio="16/9" sizes={IMG_SIZES.full} priority>
          {isVideo && <span className={styles.play} aria-hidden>▶</span>}
          {count > 1 && <span className={styles.badge} aria-hidden>1 / {count}</span>}
        </Media>
      </button>
      {open && <MediaCarousel items={project.media} startIndex={0} gradient={d.gradient} onClose={() => setOpen(false)} />}
    </div>
  );
}
```

Move the boucle styles too: copy `src/components/project/ProjectEmbed/ProjectEmbed.module.scss` to `src/components/project/MediaHero/MediaHero.module.scss`, then append the new poster classes:

```scss
@use '../../../styles/mixins/glass' as *;

/* keep the ported .embed and all boucle/* rules above this line */

.poster { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; }

.play {
  position: absolute; inset: 0; margin: auto;
  width: 72px; height: 72px; display: grid; place-items: center;
  border-radius: 999px; color: #fff; font-size: 1.4rem; line-height: 1;
  @include glass(rgba(0, 0, 0, 0.35), 8px);
  transition: transform 0.15s ease;
}
.poster:hover .play { transform: scale(1.06); }

.badge {
  position: absolute; bottom: 0.75rem; right: 0.75rem;
  padding: 0.3rem 0.6rem; border-radius: 999px;
  color: #fff; font-size: 0.72rem; font-variant-numeric: tabular-nums;
  @include glass(rgba(0, 0, 0, 0.35), 8px);
}
```

`src/components/project/MediaHero/index.ts`:

```ts
export { MediaHero } from './MediaHero';
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/project/MediaHero/MediaHero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/project/MediaHero
git commit -m "feat(media): add MediaHero poster that opens the carousel"
```

---

## Task 9: Wire the page + rewire card thumbnails

**Files:**
- Modify: `src/app/[discipline]/[slug]/page.tsx`
- Modify: `src/components/section/ProjectCard/ProjectCard.tsx:15-16`
- Modify: `src/components/home/RecentWork/RecentWork.tsx:54,70`
- Modify: `src/components/home/CardDeck/CardDeck.tsx:35-42`

- [ ] **Step 1: Swap the page to MediaHero and drop Gallery**

In `src/app/[discipline]/[slug]/page.tsx`: replace the `ProjectEmbed` import with `MediaHero`, remove the `Gallery` import, and update the JSX:

```tsx
import { MediaHero } from '@/components/project/MediaHero';
```

```tsx
      <Stack>
        <ProjectHero project={project} />
        <MediaHero project={project} />
        <ProjectBody project={project} />
        <PrevNext discipline={project.discipline} prev={prev} next={next} />
        <RelatedWork projects={related} />
      </Stack>
```

(Delete the `import { Gallery } … ` line and the `<Gallery frames={project.gallery} />` line.)

- [ ] **Step 2: Rewire `ProjectCard` thumbnail**

In `src/components/section/ProjectCard/ProjectCard.tsx`, add the import and use `coverImage`:

```tsx
import { coverImage } from '@/lib/project-presentation';
```

Replace lines 15-16's `<Media …>` opening tag:

```tsx
      <Media grad={d.gradient} src={coverImage(project).src} alt={coverImage(project).alt}
        ratio="4/3" sizes={IMG_SIZES.grid3} className={styles.media}>
```

- [ ] **Step 3: Rewire `RecentWork` thumbnails**

In `src/components/home/RecentWork/RecentWork.tsx`, import `coverImage` (it lives in the already-imported `project-presentation` module):

```tsx
import { projectPresentation, coverImage } from '@/lib/project-presentation';
```

Line 54 (featured) becomes:

```tsx
            <Media grad={fp.gradient} src={coverImage(featured).src} alt={coverImage(featured).alt}
              ratio="16/10" sizes={IMG_SIZES.full} className={styles.featuredMedia} />
```

Line 70 (thumb) becomes:

```tsx
                  <Media grad={tp.gradient} src={coverImage(p).src} alt={coverImage(p).alt}
                    ratio="4/3" sizes={IMG_SIZES.thumb} className={styles.thumbMedia} />
```

- [ ] **Step 4: Rewire `CardDeck` face**

In `src/components/home/CardDeck/CardDeck.tsx`, import `coverImage`:

```tsx
import { projectPresentation, coverImage } from '@/lib/project-presentation';
```

In `CardFace`, replace the `<Media …>` (lines 35-42) with:

```tsx
      <Media
        grad={p.gradient}
        src={coverImage(project).src}
        alt={coverImage(project).alt}
        ratio="5/4"
        sizes={IMG_SIZES.deck}
        className={styles.thumb}
      />
```

- [ ] **Step 5: Typecheck + full test run**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS. Nothing now reads `project.cover` or `project.gallery` except the still-present `ProjectEmbed`/`Gallery` components (removed next task).

- [ ] **Step 6: Commit**

```bash
git add src/app/\[discipline\]/\[slug\]/page.tsx src/components/section/ProjectCard/ProjectCard.tsx src/components/home/RecentWork/RecentWork.tsx src/components/home/CardDeck/CardDeck.tsx
git commit -m "feat(media): render MediaHero, source card thumbnails from media"
```

---

## Task 10: Remove `cover` / `gallery` + delete dead components

**Files:**
- Modify: `src/lib/schemas.ts`
- Modify: `src/lib/schemas.test.ts:9`
- Delete: `src/components/project/ProjectEmbed/`
- Delete: `src/components/project/Gallery/`

- [ ] **Step 1: Update the schema test (drop the gallery default assertion)**

In `src/lib/schemas.test.ts`, remove the line `expect(fm.gallery).toEqual([]);`. The first test now reads:

```ts
  it('accepts valid project frontmatter and applies defaults', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'Boucle', discipline: 'code', date: '2026-03-01' });
    expect(fm.tags).toEqual([]);        // default
    expect(fm.featured).toBe(false);    // default
    expect(fm.media).toEqual([]);       // default
  });
```

- [ ] **Step 2: Remove the fields + dead schema bits**

In `src/lib/schemas.ts`: delete `cover: imageRef.optional(),` and `gallery: z.array(galleryFrame).default([]),` from `projectFrontmatterSchema`, and delete the now-unused `const galleryFrame = …` line. Keep `imageRef` (the blog `postFrontmatterSchema.cover` still uses it).

- [ ] **Step 3: Delete the dead components**

Run:

```bash
git rm -r src/components/project/ProjectEmbed src/components/project/Gallery
```

- [ ] **Step 4: Typecheck + full test run + build**

Run: `npx tsc --noEmit && npx vitest run && npx next build`
Expected: PASS — no references to `ProjectEmbed`, `Gallery`, `cover`, or `gallery` remain.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(media): remove cover/gallery fields and dead components"
```

---

## Task 11: Add Wake's media

**Files:**
- Modify: `content/projects/wake.md`

> **Input needed:** the YouTube id for the Wake film (the `XXXX` in `youtube.com/watch?v=XXXX`). Ask the owner if not provided. A custom `poster` image is optional; without it the hero falls back to YouTube's thumbnail.

- [ ] **Step 1: Add the `media` block to the frontmatter**

In `content/projects/wake.md`, add to the frontmatter (replace `WAKE_YOUTUBE_ID` with the real id):

```yaml
media:
  - type: youtube
    id: "WAKE_YOUTUBE_ID"
    title: "Wake — full film"
```

- [ ] **Step 2: Verify it parses and renders**

Run: `npx vitest run && npx next build`
Expected: PASS. Manually: `npm run dev`, open `/music/wake`, confirm the hero poster shows and clicking it opens the fullscreen carousel with the film.

- [ ] **Step 3: Commit**

```bash
git add content/projects/wake.md
git commit -m "content(wake): add the film as project media"
```

---

## Manual verification (whole feature)

- [ ] `npm run dev`, open a project with media: hero poster shows with a play badge (video) or `1 / N` badge (multiple).
- [ ] Click the hero: fullscreen glass carousel opens. Arrows/←/→ change slides and the counter; Esc closes; on a touch device, swipe down dismisses and a short drag springs back.
- [ ] A video slide plays inline on click (native YouTube controls). A photo slide shows the image with its title.
- [ ] Cards on home + section pages use the media poster as the thumbnail; projects with no media show the discipline gradient.
- [ ] `ProjectBody` sidebar shows the "Tags" label with the chips. `npx next build` is clean.

## Phase 2 (deferred — return to owner)

Evaluate a fully on-brand player: YouTube IFrame API with custom controls, Vimeo, or self-hosted MP4 via a native `<video>`. Decide based on how intrusive the residual YouTube chrome feels in practice.
