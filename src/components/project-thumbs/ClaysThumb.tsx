'use client';
import { useReveal } from './useReveal';
import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow — Clays is digital clay shooting.
 * An orange clay locked in a targeting reticle with a "HIT" call. Pure SVG/CSS,
 * theme-aware (reticle = --text; the clay orange is brand-fixed), reveals on scroll.
 * Rendered inside the <Media> frame.
 */
export function ClaysThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <svg className={styles.scene} viewBox="0 0 120 90" fill="none" aria-hidden>
          <path d="M30,40 H46 M26,46 H44" className={styles.streak} />
          <ellipse cx="62" cy="44" rx="10" ry="3.6" className={styles.clay} transform="rotate(-18 62 44)" />
          <circle cx="62" cy="44" r="26" className={styles.ring} />
          <path d="M62,8 V16 M62,72 V80 M28,44 H36 M88,44 H96" className={styles.ticks} />
          <circle cx="62" cy="44" r="2.4" className={styles.center} />
        </svg>
        <span className={styles.hit}>HIT</span>
      </div>
    </div>
  );
}
