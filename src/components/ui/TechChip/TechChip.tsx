import { DISCIPLINES } from '@/lib/disciplines';
import { disciplineForTech } from '@/data/tools';
import styles from './TechChip.module.scss';

/** A tech/tool tag. Colour-coded to the discipline it belongs to (audio/code/video…); neutral if unknown. */
export function TechChip({ label }: { label: string }) {
  const d = disciplineForTech(label);
  if (!d) return <span className={styles.chip}>{label}</span>;
  return (
    <span className={`${styles.chip} ${styles.tinted}`} style={{ '--chip': DISCIPLINES[d].color } as React.CSSProperties}>
      {label}
    </span>
  );
}
