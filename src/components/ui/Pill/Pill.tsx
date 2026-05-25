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
      not the page zone accent). Sets the local --pill-fill (UNregistered, so it
      re-resolves the Radix scale on a dark/light toggle — unlike --accent). */
  color?: string;
  /** Matching text colour for `color` (white, or dark for light fills like
      yellow/amber). Sets the local --pill-ink. */
  onColor?: string;
}) {
  const style =
    color || onColor
      ? ({ ...(color && { '--pill-fill': color }), ...(onColor && { '--pill-ink': onColor }) } as React.CSSProperties)
      : undefined;
  return (
    <span className={`${styles.pill} ${styles[tone]}`} style={style}>
      {label}
    </span>
  );
}
