import styles from './ClaysThumb.module.scss';

/**
 * Bespoke card thumbnail for the Clays booking flow: a stylised booking step — a
 * row of dates, a grid of time slots (one selected) and a Book CTA, with a small
 * darts-target nod (Clays is interactive darts). Pure CSS, theme-aware panel; the
 * target/selection red is brand-ish-fixed. Scales via container queries. Decorative.
 */
export function ClaysThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.target} />
          <span className={styles.title} />
        </div>
        <div className={styles.dates}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`${styles.date} ${i === 1 ? styles.dateOn : ''}`} />
          ))}
        </div>
        <div className={styles.slots}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span key={i} className={`${styles.slot} ${i === 3 ? styles.slotOn : ''}`} />
          ))}
        </div>
        <span className={styles.cta} />
      </div>
    </div>
  );
}
