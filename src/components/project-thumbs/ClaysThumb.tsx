'use client';
import { useReveal } from './useReveal';
import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow I led. Clays' real ring logo
 * (used as a themeable mask, filled forest-green), a coral "Book now" button and the
 * result, on its mint brand (brand-fixed; field/chrome follow the theme). Reveals on
 * scroll.
 */
export function ClaysThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <span className={styles.logo} />
        <span className={styles.cta}>Book now</span>
        <span className={styles.note}>+48% spend per booking</span>
      </div>
    </div>
  );
}
