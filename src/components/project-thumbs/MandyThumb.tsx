import styles from './MandyThumb.module.scss';

/**
 * Bespoke card thumbnail for the Mandy Dennis art portfolio: a framed canvas on a
 * gallery wall with a label plate — reads instantly as an artist's portfolio. The
 * "painting" is an abstract wash (not her actual work); the frame, wall and plate
 * follow the theme. Pure CSS, scales with the card. Rendered inside the <Media> frame.
 */
export function MandyThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.wall}>
        <div className={styles.frame}>
          <div className={styles.canvas} />
        </div>
        <div className={styles.plate}>
          <span className={styles.name} />
          <span className={styles.sub} />
        </div>
      </div>
    </div>
  );
}
