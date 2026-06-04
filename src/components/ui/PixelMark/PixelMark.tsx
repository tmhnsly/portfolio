'use client';
// <PixelMark> — morphing 16×16 pixel brand mark. Bitmaps + geometry ported from
// the design handoff exactly; the dissolve is reworked into ONE continuous
// diagonal sweep (an e-ink / flip-clock style refresh) instead of the handoff's
// two-phase clear-then-draw, which read as a jerky double-take.
//
// Performance: every dot is a fixed node (constant set — never mounts/unmounts),
// each carries a STATIC per-cell delay (its position in the diagonal wave). A
// route change only flips opacities; the browser runs plain CSS opacity
// transitions (the animated area is ~30px, so paint cost is negligible). No JS
// per-frame work, no global CSS, no deps.
//
// Two host adaptations: circle `fill` is set via CSS so a `var(--…)` accent +
// `currentColor` resolve in Safari; prefers-reduced-motion is read in an effect
// (SSR-safe) → instant swap, no animation.
import { useEffect, useRef, useState } from 'react';
import { ICONS, GRID, type IconKey } from './pixel-icons';

const VBOX = 256;
const CELL = VBOX / GRID; // 16
const RAD = CELL * 0.46; // round dots with breathing room
const EASE = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
const FADE = 150; // ms — a single cell's flip (at pace 1)
const SWEEP = 300; // ms — how long the diagonal wave takes to cross (at pace 1)

// The fixed union of every cell used across all icons, each with its static delay
// = its place in a top-left→bottom-right diagonal sweep (0..1 × SWEEP). Precomputed
// once, so a render only sets opacities.
const UNION: { r: number; c: number; d: number }[] = (() => {
  const used = new Set<number>();
  for (const ic of Object.values(ICONS)) {
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) if (ic.data[r][c]) used.add(r * GRID + c);
  }
  const span = (GRID - 1) * 2; // max r+c
  return [...used].map((n) => {
    const r = Math.floor(n / GRID);
    const c = n % GRID;
    return { r, c, d: ((r + c) / span) * SWEEP };
  });
})();

// Crop the viewBox to the glyphs' shared bounding box (+ the dot radius and a
// little breathing room) so the mark fills its box like a logo instead of
// floating in the 16-grid's empty margin — keeps it optically aligned with, and
// evenly spaced from, the wordmark beside it.
const VIEW = (() => {
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

export interface PixelMarkProps {
  /** route key into ICONS; unknown/missing falls back to 'home' */
  icon?: IconKey;
  /** colour for accent ('*') pixels — pass the per-route accent */
  accent?: string;
  /** px (square) */
  size?: number;
  /** colour for ink ('#') pixels — defaults to currentColor (inherits nav text) */
  color?: string;
  /** speed multiplier; <1 = slower */
  pace?: number;
}

export function PixelMark({
  icon = 'home',
  accent = '#e54d2e',
  size = 30,
  color = 'currentColor',
  pace = 1,
}: PixelMarkProps) {
  const data = (ICONS[icon] ?? ICONS.home).data;
  const prevRef = useRef(data);
  useEffect(() => {
    prevRef.current = data;
  }, [data]);
  const prev = prevRef.current;

  // prefers-reduced-motion, read client-side so SSR renders cleanly; reduced ⇒
  // instant swap. First paint never animates anyway (prev === current).
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const f = 1 / Math.max(0.1, pace);
  const fade = Math.round(FADE * f);

  const ink: React.ReactNode[] = [];
  const acc: React.ReactNode[] = [];
  for (const { r, c, d } of UNION) {
    const tv = data[r][c];
    const changed = prev[r][c] !== tv;
    const isAcc = tv === 2;
    const style: React.CSSProperties = {
      opacity: tv !== 0 ? 1 : 0,
      transition: reduced || !changed ? 'none' : `opacity ${fade}ms ${EASE} ${Math.round(d * f)}ms`,
      fill: isAcc ? accent : color,
    };
    (isAcc ? acc : ink).push(
      <circle key={`${r}-${c}`} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={RAD} style={style} />,
    );
  }

  return (
    <svg
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.side} ${VIEW.side}`}
      width={size}
      height={size}
      shapeRendering="geometricPrecision"
      aria-hidden
      style={{ display: 'block' }}
    >
      {ink}
      {acc}
    </svg>
  );
}
