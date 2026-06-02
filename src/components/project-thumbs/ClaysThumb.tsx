'use client';
import { useReveal } from './useReveal';
import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow I led. The real CLAYS ring logo
 * (themeable mask), a mini calendar with a selected date (so it reads as the booking
 * flow), and a coral "Book now" — on Clays' mint brand. Reveals on scroll.
 */
export function ClaysThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <span className={styles.logo} />
        <div className={styles.cal}>
          <span className={styles.month} />
          <div className={styles.days}>
            {Array.from({ length: 21 }, (_, i) => (
              <span key={i} className={`${styles.day} ${i === 9 ? styles.sel : ''}`} />
            ))}
          </div>
        </div>
        <span className={styles.cta}>Book now</span>
      </div>
    </div>
  );
}
