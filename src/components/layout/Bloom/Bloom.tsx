import styles from './Bloom.module.scss';

export function Bloom() {
  return (
    <div className={styles.bloom} aria-hidden>
      <div className={styles.primary} />
      <div className={styles.cool} />
      <div className={styles.warm} />
      <div className={styles.grain} />
    </div>
  );
}
