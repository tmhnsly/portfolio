import styles from './Pill.module.scss';
export function Pill({
  label,
  tone = 'discipline',
  color,
}: {
  label: string;
  tone?: 'discipline' | 'solid';
  /** Override the discipline tone's colour (e.g. a specific project's discipline,
      not the page zone accent). Sets --accent locally, which `.discipline` reads. */
  color?: string;
}) {
  const style = color ? ({ '--accent': color } as React.CSSProperties) : undefined;
  return (
    <span className={`${styles.pill} ${styles[tone]}`} style={style}>
      {label}
    </span>
  );
}
