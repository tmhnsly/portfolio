import styles from './Marquee.module.scss';

export function Marquee({ children, faded }: { children: React.ReactNode; faded?: boolean }) {
  const viewportClass = [styles.viewport, faded ? styles.faded : undefined].filter(Boolean).join(' ');
  return (
    <div className={viewportClass}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden>{children}</div>
      </div>
    </div>
  );
}
