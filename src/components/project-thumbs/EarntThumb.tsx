'use client';
import { useReveal } from './useReveal';
import styles from './EarntThumb.module.scss';

/**
 * Bespoke card thumbnail for Earnt — the always-on drops I built the front end of. The
 * ⊕ EARNT mark, a heavy VIP-status title, a green "N left" ticket and the "revolution
 * in consumption" marquee, in its cream / forest-green brand (brand-fixed panel; field
 * + chrome follow the theme). Reveals on scroll.
 */
export function EarntThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.logo}>
            <svg viewBox="0 0 24 24" className={styles.mark} aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2 V22 M2 12 H22 M5 5 L19 19 M19 5 L5 19" />
            </svg>
            EARNT
          </span>
          <span className={styles.ticket}>8 left</span>
        </div>
        <span className={styles.vip}>VIP STATUS</span>
        <div className={styles.marquee}>A REVOLUTION IN CONSUMPTION</div>
      </div>
    </div>
  );
}
