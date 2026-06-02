'use client';
import { useReveal } from './useReveal';
import styles from './EarntThumb.module.scss';

/**
 * Bespoke card thumbnail for Earnt — the always-on drops I built the front end of,
 * shaped as the thing itself: a VIP-status ticket you earn. Earnt's real logo (mask)
 * + "VIP STATUS" on the stub, a green tear-off with "8 left". Reveals on scroll.
 */
export function EarntThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.ticket}>
        <div className={styles.main}>
          <span className={styles.logo} />
          <span className={styles.vip}>VIP STATUS</span>
          <span className={styles.sub}>earned by volunteering</span>
        </div>
        <div className={styles.perf} />
        <div className={styles.stub}>
          <span className={styles.num}>8</span>
          <span className={styles.left}>LEFT</span>
        </div>
      </div>
    </div>
  );
}
