'use client';
import { useReveal } from './useReveal';
import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — what it is, clearly: the TOOLED UP
 * mark, a line saying it's evidence-based resources for parents & schools, and real
 * topic pills from the platform. Theme-aware; reveals on scroll.
 */
const TOPICS = ['Wellbeing', 'Anxiety', 'Neurodiversity'];

export function TooledUpThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <svg viewBox="0 0 40 34" className={styles.mark} aria-hidden><path d="M20 4 L36 30 H4 Z" /></svg>
          <span className={styles.word}>TOOLED UP</span>
        </div>
        <span className={styles.tag}>Evidence-based resources for parents &amp; schools</span>
        <div className={styles.topics}>
          {TOPICS.map((t) => <span key={t} className={styles.pill}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
