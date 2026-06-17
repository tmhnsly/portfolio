import type { MediaItem, Project } from '@/types';
import { DISCIPLINES } from './disciplines';
import { youTubePoster } from './youtube';
import { projectHref } from './routes';

/**
 * The presentation facts a Project card needs — resolved from the Project's own
 * Discipline (NOT the page zone). Concentrates the `DISCIPLINES[p.discipline]`
 * reads that the bespoke home cards (CardDeck face, RecentWork featured/thumb)
 * otherwise each repeat. `color`/`onColor` match the <Pill> prop names.
 */
export interface ProjectPresentation {
  href: string; // route to the project
  label: string; // discipline label (e.g. "Code")
  gradient: string; // <Media> fallback gradient
  color: string; // discipline accent fill → <Pill color>
  onColor: string; // contrast text on the fill → <Pill onColor>
}

export function projectPresentation(project: Project): ProjectPresentation {
  const d = DISCIPLINES[project.discipline];
  return {
    href: projectHref(project.discipline, project.slug),
    label: d.label,
    gradient: d.gradient,
    color: d.color,
    onColor: d.onAccent,
  };
}

/** The still used for a project's card thumbnail and hero poster: the first
    media item's image, or a youtube item's poster (falling back to YouTube's
    hosted still). `src` is undefined when there's no usable image, so callers
    render the discipline gradient via <Media grad>. */
export function coverImage(project: Project): { src?: string; alt: string } {
  const first = project.media[0];
  if (!first) return { src: undefined, alt: project.title };
  if (first.type === 'image') return { src: first.src, alt: first.alt ?? project.title };
  return { src: youTubePoster(first.id, first.poster), alt: first.alt ?? first.title ?? project.title };
}

type YouTubeItem = Extract<MediaItem, { type: 'youtube' }>;

/**
 * How a Project's ordered `media` presents in the Media hero — the pure branch
 * the hero renders from:
 *   - `gradient`: no media → the discipline gradient (via ProjectThumb)
 *   - `video`: a lone YouTube item → plays inline (no pop-out carousel)
 *   - `poster`: the cover still (`media[0]`) → clickable, opens the Media carousel;
 *      `isVideo` flags a video cover (play badge), `count` drives the "1 / N" badge.
 * Pure over the media list, so the three-way choice is table-testable without
 * mounting the hero (where it previously hid as inline conditionals).
 */
export type MediaHeroView =
  | { mode: 'gradient' }
  | { mode: 'video'; item: YouTubeItem }
  | { mode: 'poster'; cover: { src?: string; alt: string }; isVideo: boolean; count: number };

export function mediaHeroView(project: Project): MediaHeroView {
  const { media } = project;
  const first = media[0];
  if (!first) return { mode: 'gradient' };
  if (media.length === 1 && first.type === 'youtube') return { mode: 'video', item: first };
  return { mode: 'poster', cover: coverImage(project), isVideo: first.type === 'youtube', count: media.length };
}
