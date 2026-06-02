'use client';
import { useReveal } from './useReveal';
import styles from './EarntThumb.module.scss';

/**
 * Bespoke card thumbnail for Earnt — the always-on drops I built the front end of.
 * Earnt's real logo (used as a themeable mask), a green "N left" ticket (the limited
 * drop) and the "revolution in consumption" marquee (earn it, don't buy it), on its
 * cream brand. Reveals on scroll.
 */
export function EarntThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <span className={styles.logo} />
        <span className={styles.ticket}>8 left</span>
        <div className={styles.marquee}>A REVOLUTION IN CONSUMPTION</div>
      </div>
    </div>
  );
}
