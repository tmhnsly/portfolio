'use client';
import { useReveal } from './useReveal';
import styles from './MandyThumb.module.scss';

/**
 * Bespoke card thumbnail for the Mandy Dennis art portfolio: an abstract gallery —
 * overlapping painterly colour-field canvases with the artist's name in the display
 * face. Theme-aware (name = --text; the canvases are abstract washes). Reveals on
 * scroll. Rendered inside the <Media> frame.
 */
export function MandyThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.gallery}>
        <span className={`${styles.canvas} ${styles.k1}`} />
        <span className={`${styles.canvas} ${styles.k2}`} />
        <span className={`${styles.canvas} ${styles.k3}`} />
        <span className={styles.name}>Mandy Dennis</span>
      </div>
    </div>
  );
}
