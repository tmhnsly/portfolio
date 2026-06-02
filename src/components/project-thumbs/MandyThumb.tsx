'use client';
import { useReveal } from './useReveal';
import styles from './MandyThumb.module.scss';

/**
 * Bespoke card thumbnail for the Mandy Dennis art portfolio: a framed canvas on a
 * gallery wall with a label plate — reads instantly as an artist's portfolio. The
 * "painting" is an abstract wash (not her actual work); frame, wall and plate follow
 * the theme. Reveals on scroll. Rendered inside the <Media> frame.
 */
export function MandyThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.wall}>
        <div className={styles.frame}>
          <div className={styles.canvas} />
        </div>
        <div className={styles.plate}>
          <span className={styles.name} />
          <span className={styles.sub} />
        </div>
      </div>
    </div>
  );
}
