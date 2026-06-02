'use client';
import { useReveal } from './useReveal';
import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — a featured resource card (a
 * webinar) from its evidence-based library for parents and schools. Theme-aware card;
 * teal education accent. Reveals on scroll. Rendered inside the <Media> frame.
 */
export function TooledUpThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.card}>
        <div className={styles.media}>
          <span className={styles.chip}>WEBINAR</span>
          <span className={styles.play}>
            <svg viewBox="0 0 24 24" className={styles.playIcon} aria-hidden><path d="M8 5v14l11-7z" /></svg>
          </span>
        </div>
        <span className={styles.title} />
        <span className={styles.byline} />
      </div>
    </div>
  );
}
