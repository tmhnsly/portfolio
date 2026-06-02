'use client';
import { useReveal } from './useReveal';
import styles from './AgileThumb.module.scss';

/**
 * Bespoke card thumbnail for the Agile Energy Dashboard — a stylised mini of its
 * bento dashboard: a glass chart card (smooth half-hourly price curve with the cheap
 * flex window highlighted) above two stat cards (price + savings). Pure SVG/CSS,
 * theme-aware (cards/text flip; the chart blue + savings green are brand-fixed), with
 * an aurora-blue wash echoing the dashboard's surface. The price line draws on mount.
 */

// Smooth half-hourly price curve (cubic) in a 100×40 viewBox; cheap overnight trough
// highlighted as a flex band.
const LINE = 'M0,26 C6,30 10,36 16,37 C22,38 26,28 32,18 C37,9 43,15 50,22 C56,28 61,21 67,13 C73,7 79,16 85,24 C91,30 96,29 100,27';
const AREA = `${LINE} L100,40 L0,40 Z`;

export function AgileThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.chartCard}>
          <span className={styles.chartLabel} />
          <svg viewBox="0 0 100 40" className={styles.chart} aria-hidden>
            <rect x="10" y="0" width="18" height="40" className={styles.band} />
            <path d={AREA} className={styles.area} />
            <path d={LINE} className={styles.line} pathLength={1} strokeDasharray={1} />
          </svg>
        </div>
        <div className={`${styles.stat} ${styles.accent}`}>
          <span className={styles.statLabel} />
          <span className={styles.statNum}>12p</span>
        </div>
        <div className={`${styles.stat} ${styles.positive}`}>
          <span className={styles.statLabel} />
          <span className={styles.statNum}>&minus;42%</span>
        </div>
      </div>
    </div>
  );
}
