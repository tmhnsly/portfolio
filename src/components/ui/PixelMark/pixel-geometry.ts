import { ICONS, GRID } from './pixel-icons';

/**
 * The pure geometry behind the PixelMark — no React, no animation, so it can be
 * unit-tested in isolation. Derives, from the icon bitmaps:
 *  - UNION: every cell used across ALL glyphs, each with a static sweep delay (its
 *    place in a top-left→bottom-right diagonal wave, 0..SWEEP ms at pace 1).
 *  - VIEW:  the viewBox cropped to the glyphs' shared bounding box (+ dot radius +
 *    breathing room) so the mark fills its box like a logo, not floating in the
 *    16-grid's empty margin.
 * CELL/RAD are exported for the renderer's circle positions.
 */
const VBOX = 256;
export const CELL = VBOX / GRID; // 16
export const RAD = CELL * 0.46; // round dots with breathing room
const SWEEP = 300; // ms — how long the diagonal wave takes to cross (at pace 1)

export interface UnionCell { r: number; c: number; d: number }
export interface ViewBox { x: number; y: number; side: number }

export const UNION: UnionCell[] = (() => {
  const used = new Set<number>();
  for (const ic of Object.values(ICONS)) {
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) if (ic.data[r]?.[c]) used.add(r * GRID + c);
  }
  const span = (GRID - 1) * 2; // max r+c
  return [...used].map((n) => {
    const r = Math.floor(n / GRID);
    const c = n % GRID;
    return { r, c, d: ((r + c) / span) * SWEEP };
  });
})();

export const VIEW: ViewBox = (() => {
  let minR = GRID, minC = GRID, maxR = 0, maxC = 0;
  for (const { r, c } of UNION) {
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    if (c < minC) minC = c;
    if (c > maxC) maxC = c;
  }
  const pad = RAD + CELL * 0.25;
  const x0 = minC * CELL + CELL / 2 - pad;
  const y0 = minR * CELL + CELL / 2 - pad;
  const x1 = maxC * CELL + CELL / 2 + pad;
  const y1 = maxR * CELL + CELL / 2 + pad;
  const side = Math.max(x1 - x0, y1 - y0);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return { x: cx - side / 2, y: cy - side / 2, side };
})();

/** Max sweep delay (ms at pace 1) — the wave's crossing time; exported for tests. */
export const SWEEP_MS = SWEEP;
