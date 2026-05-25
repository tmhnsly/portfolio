import type { Project } from '@/types';
import { DISCIPLINES } from './disciplines';

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
