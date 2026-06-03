'use client';
import { useReveal } from './useReveal';
import styles from './TVBlandThumb.module.scss';

/**
 * Bespoke card thumbnail for TV Bland — a stylised TV listings guide: a small
 * screen mark + title bar, then channel rows of programme blocks on a time track
 * with a "now" playhead line. Pure CSS, theme-aware (panel/blocks flip via tokens;
 * the accent + playhead are brand-fixed tomato = code). Rows + playhead reveal on
 * scroll-in. Scales via container-query units.
 */

// per-row programme block flex-grow ratios (varying "lengths" along the time track)
const ROWS: readonly number[][] = [
  [2, 3, 1.6],
  [1.5, 2.2, 2.6],
  [2.8, 1.4, 2],
];

export function TVBlandThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.screen}><span className={styles.play} /></span>
          <span className={styles.title} />
        </div>
        <div className={styles.guide}>
          <span className={styles.now} />
          {ROWS.map((blocks, r) => (
            <div key={r} className={styles.row}>
              <span className={styles.chan} />
              {blocks.map((g, i) => (
                <span
                  key={i}
                  className={r === 0 && i === 1 ? `${styles.block} ${styles.live}` : styles.block}
                  style={{ flexGrow: g }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
