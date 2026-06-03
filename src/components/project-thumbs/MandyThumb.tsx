'use client';
import { useReveal } from './useReveal';
import styles from './MandyThumb.module.scss';

/**
 * Bespoke card thumbnail for the Mandy Dennis art portfolio — a bento gallery
 * (the site itself uses a bento grid): a striking continuous line-drawing whose
 * stroke follows the theme, a painterly colour wash, quick sketch marks, and the
 * artist's palette strip. Pure CSS + inline SVG; the line draws on reveal.
 */

// abstract single-line "gesture" figure (feature tile)
const FIGURE = 'M17,13 C35,9 42,30 28,41 C16,50 34,56 41,69 C46,78 28,82 16,74';
// quick sketch marks (small tile)
const MARKS = 'M9,20 Q19,7 29,20 M32,24 Q42,11 48,23';

export function MandyThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={`${styles.tile} ${styles.feature}`}>
          <svg viewBox="0 0 58 86" className={styles.art} preserveAspectRatio="xMidYMid meet" aria-hidden>
            <path d={FIGURE} className={styles.line} pathLength={1} strokeDasharray={1} />
          </svg>
        </div>
        <div className={`${styles.tile} ${styles.wash}`} />
        <div className={`${styles.tile} ${styles.marks}`}>
          <svg viewBox="0 0 58 32" className={styles.art} preserveAspectRatio="xMidYMid meet" aria-hidden>
            <path d={MARKS} className={styles.line} pathLength={1} strokeDasharray={1} />
          </svg>
        </div>
        <div className={`${styles.tile} ${styles.palette}`}>
          <span style={{ background: '#c98a6a' }} />
          <span style={{ background: '#e8c9a0' }} />
          <span style={{ background: '#6c7b8a' }} />
          <span style={{ background: '#9c5f4e' }} />
        </div>
      </div>
    </div>
  );
}
