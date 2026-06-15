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
  /**
   * full-bleed hero / cover / embed. Also carries the same cover-zoom as the
   * cards: cinematic posters (~2.39:1) sit in 16/9 (hero, carousel, YouTube
   * poster) and 16/10 (featured card) boxes, so cover scales up ~1.35-1.5x.
   * Box-width vw values are inflated to match (source caps at 2000px, so the
   * optimizer never serves more than the file holds).
   */
  full: `${minWidth('desktop')} 85vw, 135vw`,
  /*
   * grid3 / deck / thumb show cinematic posters (~2.39:1) inside squarer boxes
   * (4/3, 5/4) via `object-fit: cover`, so cover scales the image UP ~1.8-1.9x
   * to fill the box. `sizes` describes the BOX, not the zoomed image, so the
   * box-width vw values are inflated by the worst-case cover factor — otherwise
   * the browser fetches a candidate sized for the box and cover upscales it into
   * a blur (worst on smooth/dark frames). Over-fetches mildly for non-wide media.
   */
  /** 3-up grid card (4/3, cover-zoom ~1.8x) / gallery */
  grid3: `${minWidth('desktop')} 54vw, ${minWidth('tablet')} 85vw, 100vw`,
  /** home deck card (5/4, cover-zoom ~1.9x; slightly wider on tablet) */
  deck: `${minWidth('desktop')} 57vw, ${minWidth('tablet')} 76vw, 100vw`,
  /** featured post (2-up) */
  featured: `${minWidth('desktop')} 45vw, 100vw`,
  /** small thumb / recent card (4/3, cover-zoom ~1.8x) */
  thumb: `${minWidth('tablet')} 360px, 72vw`,
  /** about portrait */
  portrait: `${minWidth('tablet')} 360px, 90vw`,
} as const;
