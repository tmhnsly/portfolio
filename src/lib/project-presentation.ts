import type { Project } from '@/types';
import { DISCIPLINES } from './disciplines';
import { youTubeThumbnail } from './youtube';

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
    href: `/${project.discipline}/${project.slug}`,
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
  return { src: first.poster ?? youTubeThumbnail(first.id), alt: first.alt ?? first.title ?? project.title };
}
