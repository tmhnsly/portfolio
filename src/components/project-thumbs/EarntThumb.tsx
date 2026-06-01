import styles from './EarntThumb.module.scss';

/**
 * Bespoke card thumbnail for Earnt: a Storybook-style component canvas — a window of
 * UI swatches (button, toggle, input, card) standing for the design-system component
 * library that was the heart of the work. Pure CSS, theme-aware panel; the component
 * accent is fixed. Scales via container queries. Decorative.
 */
export function EarntThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
          <span className={styles.title} />
        </div>
        <div className={styles.grid}>
          <span className={styles.btn} />
          <span className={styles.toggle}><i /></span>
          <span className={styles.input} />
          <span className={styles.swatch} />
        </div>
      </div>
    </div>
  );
}
