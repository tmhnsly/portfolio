'use client';
import { RevealThumb } from './RevealThumb';
import styles from './ArmstrongThumb.module.scss';

/**
 * Bespoke card thumbnail for Armstrong — Rocketmakers' open-source React component
 * library. A clean macOS terminal window with the install command. The code surface
 * stays dark in both themes (the site's code blocks); cyan accent. Reveals on scroll.
 */
export function ArmstrongThumb() {
  return (
    <RevealThumb root={styles.root} inview={styles.inview}>
      <div className={styles.win}>
        <div className={styles.bar}>
          <span className={`${styles.dot} ${styles.r}`} />
          <span className={`${styles.dot} ${styles.y}`} />
          <span className={`${styles.dot} ${styles.g}`} />
        </div>
        <div className={styles.body}>
          <div className={styles.line}>
            <span className={styles.prompt}>$</span>
            <span className={styles.cmd}>npm i </span>
            <span className={styles.pkg}>@rocketmakers/armstrong</span>
            <span className={styles.cursor} />
          </div>
          <div className={styles.comment}>{'// React component library'}</div>
        </div>
      </div>
    </RevealThumb>
  );
}
