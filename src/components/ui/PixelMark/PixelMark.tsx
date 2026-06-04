'use client';
// <PixelMark> — morphing 16×16 pixel brand mark. Ported from the design handoff
// (pixel-mark.jsx) into the project's stack; geometry, timings and the dissolve
// are preserved exactly (see SPEC.md). Self-contained: React + inline styles +
// one <svg>, no global CSS, no deps.
//
// Two porting adaptations vs the reference (neither alters geometry/timing):
//  • circle `fill` is set via CSS (style) not the SVG attribute, so a CSS-var
//    accent (`var(--green-9)`) and `currentColor` resolve in Safari too;
//  • prefers-reduced-motion is read in an effect, so it renders cleanly on SSR.
import { useEffect, useRef, useState } from 'react';
import { ICONS, ORDERS, GRID, type IconKey } from './pixel-icons';

const VBOX = 256;
const CELL = VBOX / GRID; // 16
const RAD = CELL * 0.46; // round dots with breathing room
const EASE = 'cubic-bezier(0.2,0.7,0.3,1)';
// dissolve timing (ms) at pace = 1; scaled by 1/pace below
const T = { fade: 70, exitRange: 120, appearOffset: 150, appearRange: 300, accentExtra: 150 };

// Fixed cell union across every icon → a constant node set, so cells never
// mount/unmount — only their opacity (and the accent cells' fill) change.
const UNION: { r: number; c: number }[] = (() => {
  const used: Record<number, 1> = {};
  Object.values(ICONS).forEach((ic) => {
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) if (ic.data[r][c]) used[r * GRID + c] = 1;
  });
  return Object.keys(used).map((k) => {
    const n = +k;
    return { r: Math.floor(n / GRID), c: n % GRID };
  });
})();

type OrderFn = (r: number, c: number) => number;

function delayFor(prevV: number, tgtV: number, r: number, c: number, pOrd: OrderFn, tOrd: OrderFn): number {
  if (prevV === tgtV) return -1; // unchanged → no transition
  if (tgtV === 0) return (1 - pOrd(r, c)) * T.exitRange; // leaving → clear first
  return T.appearOffset + tOrd(r, c) * T.appearRange + (tgtV === 2 ? T.accentExtra : 0);
}

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
  pace = 0.7,
}: PixelMarkProps) {
  const cur = ICONS[icon] ?? ICONS.home;
  const data = cur.data;
  const order = cur.order;

  const prevRef = useRef({ data, order });
  useEffect(() => {
    prevRef.current = { data, order };
  }, [data, order]);
  const prev = prevRef.current;
  const pOrd = ORDERS[prev.order] ?? ORDERS.topDown;
  const tOrd = ORDERS[order] ?? ORDERS.topDown;

  // prefers-reduced-motion, read client-side so SSR renders cleanly; reduced ⇒
  // instant swap (no transitions). First paint never animates anyway (prev === current).
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const f = 1 / Math.max(0.1, pace);
  const trans = (d: number) => `opacity ${Math.round(T.fade * f)}ms ${EASE} ${Math.round(d * f)}ms`;

  const ink: React.ReactNode[] = [];
  const acc: React.ReactNode[] = [];
  for (const { r, c } of UNION) {
    const pv = prev.data[r][c];
    const tv = data[r][c];
    const isAcc = tv === 2;
    const d = delayFor(pv, tv, r, c, pOrd, tOrd);
    const style: React.CSSProperties = {
      opacity: tv !== 0 ? 1 : 0,
      transition: reduced || d < 0 ? 'none' : trans(d),
      fill: isAcc ? accent : color,
    };
    (isAcc ? acc : ink).push(
      <circle key={`${r}-${c}`} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={RAD} style={style} />,
    );
  }

  return (
    <svg
      viewBox={`0 0 ${VBOX} ${VBOX}`}
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
