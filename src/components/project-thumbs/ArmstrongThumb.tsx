'use client';
import { useReveal } from './useReveal';
import styles from './ArmstrongThumb.module.scss';

/**
 * Bespoke card thumbnail for Armstrong — Rocketmakers' open-source React component
 * library. A terminal install line plus the components you get. The code surface
 * stays dark in both themes (like the site's code blocks); cyan accent. Reveals on
 * scroll. Rendered inside the <Media> frame.
 */
export function ArmstrongThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.term}>
        <div className={styles.bar}><i /><i /><i /></div>
        <div className={styles.line}>
          <span className={styles.prompt}>$</span>
          <span className={styles.cmd}>npm i </span>
          <span className={styles.pkg}>@rocketmakers/armstrong</span>
          <span className={styles.cursor} />
        </div>
        <div className={styles.kit}>
          <span className={`${styles.comp} ${styles.solid}`} />
          <span className={styles.comp} />
          <span className={`${styles.comp} ${styles.solid}`} />
        </div>
      </div>
    </div>
  );
}
