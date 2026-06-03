'use client';
import { useReveal } from './useReveal';
import styles from './MandyThumb.module.scss';

/**
 * Bespoke card thumbnail for the Mandy Dennis art portfolio: a framed painting on
 * a gallery wall under a soft picture-light, with a label plate — reads at a glance
 * as an artist's portfolio. The "painting" is a stylised sunset landscape (not her
 * actual work); the frame, wall and plate follow the theme. Reveals on scroll.
 */
export function MandyThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.light} />
      <div className={styles.wall}>
        <div className={styles.frame}>
          <div className={styles.canvas}>
            <span className={styles.sun} />
            <span className={styles.hill} />
          </div>
        </div>
        <div className={styles.plate}>
          <span className={styles.name} />
          <span className={styles.sub} />
        </div>
      </div>
    </div>
  );
}
