'use client';
import { useReveal } from './useReveal';
import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow I led. The real CLAYS ring logo
 * (themeable mask) over a clean booking summary (when / guests) and a coral Book-now,
 * on Clays' mint brand. Reveals on scroll.
 */
const ROWS = [
  { k: 'When', v: 'Sat 14 Jun' },
  { k: 'Guests', v: '6' },
];

export function ClaysThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <span className={styles.logo} />
        <div className={styles.card}>
          {ROWS.map((r) => (
            <div key={r.k} className={styles.row}>
              <span className={styles.k}>{r.k}</span>
              <span className={styles.v}>{r.v}</span>
            </div>
          ))}
        </div>
        <span className={styles.cta}>Book now</span>
      </div>
    </div>
  );
}
