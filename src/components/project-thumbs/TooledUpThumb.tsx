'use client';
import { useReveal } from './useReveal';
import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — the resource platform I built the
 * front end of (in a team of two). The triangle wordmark, a search field, topic pills
 * and resource cards, in its blue. Theme-aware panel; reveals on scroll.
 */
export function TooledUpThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <svg viewBox="0 0 24 24" className={styles.mark} aria-hidden><path d="M12 3.5 L21 20 H3 Z" /></svg>
          <span className={styles.word}>TOOLED UP</span>
        </div>
        <div className={styles.search}>
          <span className={styles.mag} />
          <span className={styles.q} />
        </div>
        <div className={styles.pills}>
          <span className={styles.pill} /><span className={styles.pill} /><span className={styles.pill} />
        </div>
        <div className={styles.cards}>
          <span className={styles.card} /><span className={styles.card} /><span className={styles.card} />
        </div>
      </div>
    </div>
  );
}
