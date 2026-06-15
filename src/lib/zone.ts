import type { Discipline } from '@/types';
import { DISCIPLINES, isDiscipline } from './disciplines';

/**
 * The "Zone" — the active accent context for a route (a Discipline, or the
 * default home/About). Single home for "pathname → Discipline → accent tokens",
 * which the Shell, Nav and Breadcrumb otherwise each re-derive.
 */

/** The three accent CSS-var strings a Zone resolves to. */
export interface ZoneAccent {
  accent: string; // --accent: step-9 solid fill
  accentInk: string; // --accent-ink: step-11 legible coloured text
  accentHover: string; // --accent-hover: step-10 solid hover
  onAccent: string; // --on-accent: text drawn on the accent fill
}

export interface Zone extends ZoneAccent {
  discipline?: Discipline; // undefined for the default zone (home/About)
  active?: string; // first path segment — drives the Nav highlight (undefined on home)
}

/** Default zone accent = tomato brand (home, About, anything non-discipline). */
const DEFAULT_ACCENT: ZoneAccent = {
  accent: 'var(--tomato-9)',
  accentInk: 'var(--tomato-11)',
  accentHover: 'var(--tomato-10)',
  onAccent: 'var(--white-a12)',
};

/** The first path segment, narrowed to a Discipline when it is one. */
export function disciplineFromPath(pathname: string): Discipline | undefined {
  const seg = pathname.split('/')[1] ?? '';
  return isDiscipline(seg) ? seg : undefined;
}

/** Accent tokens for a Discipline, or the tomato default when undefined. */
export function zoneAccent(discipline?: Discipline): ZoneAccent {
  if (!discipline) return DEFAULT_ACCENT;
  const m = DISCIPLINES[discipline];
  return { accent: m.color, accentInk: m.ink, accentHover: m.hover, onAccent: m.onAccent };
}

/** Resolve the current Zone (discipline + nav-active segment + accent tokens). */
export function resolveZone(pathname: string): Zone {
  const seg = pathname.split('/')[1] ?? '';
  const discipline = disciplineFromPath(pathname);
  return {
    discipline,
    active: seg || undefined, // home ('') → no nav highlight
    ...zoneAccent(discipline),
  };
}
