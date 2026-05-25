import styles from './Pill.module.scss';
export function Pill({
  label,
  tone = 'discipline',
  color,
  onColor,
}: {
  label: string;
  tone?: 'discipline' | 'solid';
  /** Override the discipline tone's fill (e.g. a specific project's discipline,
      not the page zone accent). Sets --accent locally, which `.discipline` reads. */
  color?: string;
  /** Matching text colour for `color` (white, or dark for light fills like
      yellow/orange). Sets --on-accent locally. */
  onColor?: string;
}) {
  const style =
    color || onColor
      ? ({ ...(color && { '--accent': color }), ...(onColor && { '--on-accent': onColor }) } as React.CSSProperties)
      : undefined;
  return (
    <span className={`${styles.pill} ${styles[tone]}`} style={style}>
      {label}
    </span>
  );
}
