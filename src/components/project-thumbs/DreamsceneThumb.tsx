'use client';
import type { CSSProperties } from 'react';
import { RevealThumb } from './RevealThumb';
import styles from './DreamsceneThumb.module.scss';

/**
 * Bespoke card thumbnail for Dreamscene — a story-development app whose idea is
 * chaos to order: ideas start as loose cards and find their place on Dan Harmon's
 * Story Circle. Four story cards (its own demo copy, in an editorial serif) drift in
 * scattered and tilted, then settle around the circle as it draws in. Pure SVG/CSS,
 * theme-aware (panel/cards/text flip; the crimson and card edges are brand-fixed).
 * Decorative — the card link carries the label.
 */

// Geometry: the panel is 16:11 and the circle is 90% of its height with r = 40/50 of
// that, so the ring's radius is 36% of the panel height, which is 24.75% of its width.
// Each card is centred exactly on a diagonal beat (45°, 135°, 225°, 315°), so the
// cards cover those four dots and the other four (top, right, bottom, left) show.
const RX = 24.75; // ring radius, % of panel width
const RY = 36;    // ring radius, % of panel height
const onRing = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: 50 + RX * Math.sin(a), y: 50 - RY * Math.cos(a) };
};

// w: card width; r: resting tilt; dx/dy/r0: where it drifts in from.
const CARDS = [
  { kind: 'Scene', text: 'INT. DINER', edge: 'var(--ds-amber)', ...onRing(315), r: -3, dx: -14, dy: -10, r0: -16 },
  { kind: 'Dialogue', text: '“You kept the tapes.”', edge: 'var(--ds-green)', ...onRing(45), r: 3, dx: 14, dy: -12, r0: 14 },
  { kind: 'Question', text: 'What is she hiding?', edge: 'var(--ds-pink)', ...onRing(135), r: -2, dx: 16, dy: 12, r0: -12 },
  { kind: 'Theme', text: 'Grief runs in loops', edge: 'var(--ds-violet)', ...onRing(225), r: 2, dx: -12, dy: 12, r0: 10 },
];

// Beat markers around the circle (degrees); the first is the crimson "you are here".
const BEATS = [0, 45, 90, 135, 180, 225, 270, 315];

export function DreamsceneThumb() {
  return (
    <RevealThumb root={styles.root} inview={styles.inview}>
      <div className={styles.panel}>
        <svg viewBox="0 0 100 100" className={styles.circle} aria-hidden>
          <circle cx="50" cy="50" r="40" className={styles.track} pathLength={1} transform="rotate(-90 50 50)" />
          {BEATS.map((deg, i) => {
            const a = ((deg - 90) * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={50 + 40 * Math.cos(a)}
                cy={50 + 40 * Math.sin(a)}
                r={i === 0 ? 3 : 2.2}
                className={i === 0 ? styles.here : styles.beat}
              />
            );
          })}
        </svg>
        {CARDS.map((c) => (
          <div
            key={c.kind}
            className={styles.card}
            style={{
              '--x': `${c.x}%`, '--y': `${c.y}%`, '--r': `${c.r}deg`, '--edge': c.edge,
              '--dx': `${c.dx}cqmin`, '--dy': `${c.dy}cqmin`, '--r0': `${c.r0}deg`,
            } as CSSProperties}
          >
            <span className={styles.kind}>{c.kind}</span>
            <span className={styles.text}>{c.text}</span>
          </div>
        ))}
      </div>
    </RevealThumb>
  );
}
