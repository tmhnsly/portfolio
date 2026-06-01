import styles from './ArmstrongThumb.module.scss';

/**
 * Bespoke card thumbnail for Armstrong, Rocketmakers' open-source React component
 * library: a fanned stack of component cards (reusable pieces) with the front one
 * showing a mini UI and a code bracket — "a library of components". Pure CSS, theme-
 * aware cards; the accent is fixed. Scales via container queries. Decorative.
 */
export function ArmstrongThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.stack}>
        <span className={`${styles.card} ${styles.c3}`} />
        <span className={`${styles.card} ${styles.c2}`} />
        <span className={`${styles.card} ${styles.c1}`}>
          <span className={styles.bracket}>&lt;/&gt;</span>
          <span className={styles.bar} />
          <span className={styles.btn} />
        </span>
      </div>
    </div>
  );
}
