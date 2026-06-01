import styles from './TooledUpThumb.module.scss';

/**
 * Bespoke card thumbnail for Tooled-Up Education — a searchable library of evidence-
 * based resources for parents and schools. A search bar over mixed-media resource
 * rows (video / podcast / article), reflecting both the platform and the search +
 * component work. Pure CSS, theme-aware panel; the media-type chips are fixed. Scales
 * via container queries. Decorative.
 */
const RES = [
  { kind: 'VIDEO', cls: 'video' },
  { kind: 'PODCAST', cls: 'podcast' },
  { kind: 'ARTICLE', cls: 'article' },
] as const;

export function TooledUpThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.search}>
          <span className={styles.magnifier} />
          <span className={styles.query} />
        </div>
        <ul className={styles.list}>
          {RES.map((r) => (
            <li key={r.kind} className={styles.row}>
              <span className={`${styles.chip} ${styles[r.cls]}`}>{r.kind}</span>
              <span className={styles.bar} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
