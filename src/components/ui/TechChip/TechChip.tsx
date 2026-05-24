import styles from './TechChip.module.scss';
export function TechChip({ label }: { label: string }) {
  return <span className={styles.chip}>{label}</span>;
}
