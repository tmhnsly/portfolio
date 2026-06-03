'use client';
import { useReveal } from './useReveal';
import styles from './TVBlandThumb.module.scss';

/**
 * Bespoke card thumbnail for TV Bland — a retro TV set showing a rainbow
 * test-pattern screen with static + scanlines. Pure CSS + an inline SVG noise
 * filter; the TV body is dark in both themes, the bars are fixed (a test card is
 * inherently colourful). On scroll-in the screen does a CRT "switch on" with a
 * couple of static flickers.
 */
export function TVBlandThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.tv}>
        <div className={styles.screen}>
          <div className={styles.tube}>
            <div className={styles.bars} />
            <svg className={styles.static} viewBox="0 0 120 80" preserveAspectRatio="none">
              <filter id="tvb-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#tvb-noise)" />
            </svg>
            <div className={styles.scan} />
          </div>
        </div>
        <div className={styles.bezel}>
          <span className={styles.led} />
          <span className={styles.grille} />
        </div>
      </div>
    </div>
  );
}
