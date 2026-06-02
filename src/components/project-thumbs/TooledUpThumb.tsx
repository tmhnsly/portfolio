'use client';
import { useReveal } from './useReveal';
import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — a clean brand lockup (the triangle
 * mark, the TOOLED UP wordmark, and the "resource platform" line in its blue) rather
 * than a UI mock. Theme-aware; reveals on scroll.
 */
export function TooledUpThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <svg viewBox="0 0 48 40" className={styles.mark} aria-hidden>
          <path d="M24 5 L43 36 H5 Z" />
        </svg>
        <span className={styles.word}>TOOLED UP</span>
        <span className={styles.tag}>resource platform</span>
      </div>
    </div>
  );
}
