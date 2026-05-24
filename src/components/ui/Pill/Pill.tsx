import styles from './Pill.module.scss';
export function Pill({ label, tone = 'discipline' }: { label: string; tone?: 'discipline' | 'solid' }) {
  return <span className={`${styles.pill} ${styles[tone]}`}>{label}</span>;
}
