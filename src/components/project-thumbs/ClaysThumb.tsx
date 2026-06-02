'use client';
import { useReveal } from './useReveal';
import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow I led — a stylised "make a
 * booking" modal: the CLAYS ring monogram, a mini calendar with a selected date, and
 * the coral Search button, in Clays' mint / forest-green / coral palette (brand-fixed
 * panel; field + chrome follow the theme). Reveals on scroll.
 */
export function ClaysThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.logo}>
            <svg viewBox="0 0 32 32" className={styles.ring} aria-hidden><circle cx="16" cy="16" r="14" /></svg>
            CLAYS
          </span>
          <span className={styles.title} />
        </div>
        <div className={styles.cal}>
          <span className={styles.month} />
          <div className={styles.days}>
            {Array.from({ length: 21 }, (_, i) => (
              <span key={i} className={`${styles.day} ${i === 9 ? styles.sel : ''}`} />
            ))}
          </div>
        </div>
        <span className={styles.cta}>Search</span>
      </div>
    </div>
  );
}
