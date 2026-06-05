'use client';
// <PixelMark> — morphing 16×16 pixel brand mark. Bitmaps + geometry ported from
// the design handoff exactly. It draws itself in on first load and morphs
// glyph-to-glyph on route change, both via ONE continuous top-left→bottom-right
// diagonal sweep (an e-ink / flip-clock style refresh) — not the handoff's
// two-phase clear-then-draw, which read as a jerky double-take.
//
// Performance: every dot is a fixed node (constant set — never mounts/unmounts),
// each carries a STATIC per-cell delay (its position in the diagonal wave). A
// render only flips opacities; the browser runs plain CSS opacity transitions
// (the animated area is ~30px, so paint cost is negligible). No JS per-frame
// work, no global CSS, no deps.
//
// Two host adaptations: circle `fill` is set via CSS so a `var(--…)` accent +
// `currentColor` resolve in Safari; prefers-reduced-motion is read in an effect
// (SSR-safe) → instant swap, no animation.
import { useEffect, useState } from 'react';
import { ICONS, type IconKey } from './pixel-icons';
import { UNION, VIEW, CELL, RAD } from './pixel-geometry';

const EASE = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
const FADE = 150; // ms — a single cell's flip (at pace 1)

export interface PixelMarkProps {
  /** route key into ICONS; unknown/missing falls back to 'home' */
  icon?: IconKey;
  /** colour for accent ('*') pixels — pass the per-route accent */
  accent?: string;
  /** square size — a number (px) or any CSS length (e.g. '60%') for a responsive mark */
  size?: number | string;
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

  // `revealed` drives the initial draw-in: the mark renders empty on the server
  // and the first client paint, then the dots sweep on after mount. It stays true
  // afterwards, so route changes morph via the same opacity sweep (the browser
  // transitions only the cells whose opacity actually changes). `reduced` ⇒ no
  // transition (instant). Both default false so SSR and hydration agree.
  const [reduced, setReduced] = useState(false);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // SSR-safe client read: prefers-reduced-motion can't be read during render,
    // so sync it once on mount + subscribe to changes below
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    // next frame, so the empty state paints first and the 0→1 sweep actually runs
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => {
      mq.removeEventListener('change', onChange);
      cancelAnimationFrame(id);
    };
  }, []);

  const f = 1 / Math.max(0.1, pace);
  const fade = Math.round(FADE * f);

  const ink: React.ReactNode[] = [];
  const acc: React.ReactNode[] = [];
  for (const { r, c, d } of UNION) {
    const tv = data[r]?.[c] ?? 0;
    const isAcc = tv === 2;
    const style: React.CSSProperties = {
      opacity: revealed && tv !== 0 ? 1 : 0,
      transition: reduced ? 'none' : `opacity ${fade}ms ${EASE} ${Math.round(d * f)}ms`,
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
