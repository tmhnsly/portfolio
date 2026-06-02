'use client';
import { useReveal } from './useReveal';
import styles from './FTThumb.module.scss';

/**
 * Bespoke card thumbnail for the FT branded-content project: an FT branded-content
 * article on the paper's salmon stock — the masthead, a "Partner Content" label
 * (how the FT marks branded work) and stand-in headline/body lines. The masthead is
 * the FT's own alpha PNG used as a CSS mask, so it's filled with a token rather than
 * baked-in pixels (here FT charcoal). The paper + ink are brand-fixed; the field
 * behind and the card chrome follow the theme. Rendered inside the <Media> frame.
 */
export function FTThumb() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={revealed ? `${styles.root} ${styles.inview}` : styles.root} aria-hidden>
      <div className={styles.paper}>
        <span className={styles.masthead} />
        <span className={styles.rule} />
        <span className={styles.tag}>PARTNER CONTENT</span>
        <span className={styles.headline} />
        <span className={`${styles.body} ${styles.b1}`} />
        <span className={`${styles.body} ${styles.b2}`} />
      </div>
    </div>
  );
}
