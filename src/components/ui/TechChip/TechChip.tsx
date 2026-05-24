import styles from './TechChip.module.scss';

/** A tech/tool tag — a neutral mono chip. */
export function TechChip({ label }: { label: string }) {
  return <span className={styles.chip}>{label}</span>;
}
