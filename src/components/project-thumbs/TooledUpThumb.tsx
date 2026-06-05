'use client';
import { RevealThumb } from './RevealThumb';
import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — its own hero, distilled: the TOOLED
 * UP mark over "Browse our resource platform" with "resource" in its blue. Says what
 * it is in its own voice. Theme-aware; reveals on scroll.
 */
export function TooledUpThumb() {
  return (
    <RevealThumb root={styles.root} inview={styles.inview}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <svg viewBox="0 0 40 34" className={styles.mark} aria-hidden><path d="M20 4 L36 30 H4 Z" /></svg>
          <span className={styles.word}>TOOLED UP</span>
        </div>
        <span className={styles.head}>Browse our <i className={styles.script}>resource</i> platform</span>
        <span className={styles.sub}>for parents &amp; schools</span>
      </div>
    </RevealThumb>
  );
}
