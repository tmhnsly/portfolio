'use client';
import { RevealThumb } from './RevealThumb';
import styles from './RaditzThumb.module.scss';

/**
 * Bespoke card thumbnail for Raditz — a React component library built on one
 * semantic accent token. A mini of its showcase: a header, the accent swatch row,
 * then a button, a ghost button, a switch and a slider. One moment: as the panel
 * lands, the selection ring steps from cyan to violet and every component re-tints
 * with it, because they all read the same token. Pure CSS, theme-aware (panel/text
 * flip; the Radix accents are fixed). Decorative — the card link carries the label.
 */

// Radix step-9 accents, as on the Raditz theme picker. The ring starts on cyan
// (index 1) and steps to violet (index 3).
const SWATCHES = ['#e54666', '#00a2c7', '#30a46c', '#6e56cf', '#ffc53d', '#8b8d98'];

export function RaditzThumb() {
  return (
    <RevealThumb root={styles.root} inview={styles.inview}>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.logo}><span className={styles.planet} /></span>
          <span className={styles.wordmark} />
          <span className={styles.themeIcon} />
        </div>

        <div className={styles.body}>
          <div className={styles.swatches}>
            {SWATCHES.map((c) => (
              <span key={c} className={styles.swatch} style={{ background: c }} />
            ))}
            <span className={styles.ring} />
          </div>

          <div className={styles.controls}>
            <span className={styles.button}><span className={styles.buttonLabel} /></span>
            <span className={styles.ghost}><span className={styles.ghostLabel} /></span>
            <span className={styles.switch}><span className={styles.knob} /></span>
          </div>

          <div className={styles.slider}>
            <span className={styles.fill} />
            <span className={styles.thumb} />
          </div>
        </div>
      </div>
    </RevealThumb>
  );
}
