import styles from './Marquee.module.scss';

export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden>{children}</div>
      </div>
    </div>
  );
}
