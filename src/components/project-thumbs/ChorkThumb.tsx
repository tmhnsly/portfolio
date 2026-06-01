import type { CSSProperties } from 'react';
import styles from './ChorkThumb.module.scss';

/**
 * Bespoke card thumbnail for Chork — a rock-climbing app. Recreates its "rings
 * card": Apple-fitness-style activity rings (outer = sends, middle = flashes,
 * inner = zones) beside the matching counts and a points total. Pure SVG/CSS so
 * it stays crisp at any size and follows the theme (panel/text flip light↔dark;
 * the climbing colours are brand-fixed). Rendered inside the <Media> frame by
 * ProjectThumb. Decorative — the card link carries the label.
 */

// Ring progress (0–1) + colour, outermost first — sends, flashes, zones.
const RINGS = [
  { value: 0.68, color: 'var(--sends)' },
  { value: 0.46, color: 'var(--flash)' },
  { value: 0.33, color: 'var(--zone)' },
];

const STATS = [
  { key: 'sends', label: 'SENDS', value: 24, cls: 'sends' },
  { key: 'flash', label: 'FLASHES', value: 11, cls: 'flash' },
  { key: 'zone', label: 'ZONES', value: 8, cls: 'zone' },
] as const;

/** The Chork "C" arc + lime dot, recreated natively here (no cross-repo import). */
function ChorkMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={styles.mark} aria-hidden>
      <path d="M29 11 A14 14 0 1 0 29 37" className={styles.arc} strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="24" r="7.5" className={styles.dot} />
    </svg>
  );
}

/** Concentric progress rings — each draws from hidden to its resting arc on mount
    (pathLength=1 normalises the dash maths to a 0–1 range regardless of radius). */
function Rings() {
  const C = 50;
  const SW = 10;
  const GAP = 4;
  return (
    <svg viewBox="0 0 100 100" fill="none" className={styles.rings} aria-hidden>
      {RINGS.map((ring, i) => {
        const r = C - SW / 2 - i * (SW + GAP);
        const offset = 1 - Math.min(1, Math.max(0, ring.value));
        return (
          <g key={i}>
            <circle cx={C} cy={C} r={r} stroke="var(--track)" strokeWidth={SW} strokeLinecap="round" />
            <circle
              cx={C}
              cy={C}
              r={r}
              stroke={ring.color}
              strokeWidth={SW}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${C} ${C})`}
              className={styles.ring}
              style={{ '--ring-delay': `${i * 150}ms` } as CSSProperties}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ChorkThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <ChorkMark />
          <span className={styles.wordmark} />
          <span className={styles.pts}>47<small>PTS</small></span>
        </div>
        <div className={styles.body}>
          <Rings />
          <ul className={styles.stats}>
            {STATS.map((s) => (
              <li key={s.key} className={styles.stat}>
                <span className={`${styles.swatch} ${styles[s.cls]}`} />
                <span className={styles.label}>{s.label}</span>
                <span className={styles.num}>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
