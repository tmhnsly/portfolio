'use client';
import { useReveal } from './useReveal';
import styles from './EarntThumb.module.scss';

/**
 * Bespoke card thumbnail for Earnt — a community platform where you earn limited drops
 * by volunteering. Its brand is the uppercase EARNT wordmark (white-on-dark, premium)
 * with green category badges; recreated here as the wordmark + a "Limited Drop" badge.
 * Theme-aware (wordmark = --text); the green is brand-fixed. Reveals on scroll.
 */
export function EarntThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <span className={styles.badge}><span className={styles.dot} />LIMITED DROP</span>
        <span className={styles.wordmark}>EARNT</span>
      </div>
    </div>
  );
}
