/**
 * Breakpoints (device widths), in px — the single source of truth for JS and
 * for responsive-image `sizes`. Mirrors the SCSS `$bp-*` in
 * src/styles/mixins/_breakpoints.scss; keep the two in sync.
 */
export const BREAKPOINTS = {
  tablet: 768, // ≥ tablet
  desktop: 1200, // ≥ desktop
  wide: 1440, // ≥ wide
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** A `(min-width: Npx)` media condition for a named breakpoint. */
export const minWidth = (bp: Breakpoint) => `(min-width: ${BREAKPOINTS[bp]}px)`;

/**
 * Named responsive-image `sizes` recipes, built from BREAKPOINTS so the
 * breakpoint widths live in one place (no scattered 768/1200 literals). Pass to
 * `<Media sizes={IMG_SIZES.full} />` etc.
 */
export const IMG_SIZES = {
  /** full-bleed hero / cover / embed */
  full: `${minWidth('desktop')} 60vw, 100vw`,
  /** 3-up grid card / gallery */
  grid3: `${minWidth('desktop')} 30vw, ${minWidth('tablet')} 45vw, 90vw`,
  /** home deck card (slightly wider on tablet) */
  deck: `${minWidth('desktop')} 30vw, ${minWidth('tablet')} 40vw, 90vw`,
  /** featured post (2-up) */
  featured: `${minWidth('desktop')} 45vw, 100vw`,
  /** small thumb / recent card */
  thumb: `${minWidth('tablet')} 200px, 40vw`,
  /** about portrait */
  portrait: `${minWidth('tablet')} 360px, 90vw`,
} as const;
