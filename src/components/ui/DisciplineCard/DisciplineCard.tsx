import Link from 'next/link';
import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { TechChip } from '@/components/ui/TechChip';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './DisciplineCard.module.scss';

export interface DisciplineCardProps {
  discipline: Discipline;
  tools: string[];
  /** When set, the whole card becomes a link to this route. */
  href?: string;
  /** Show the ↗ affordance (used where the card links out). */
  showArrow?: boolean;
  /** Cap the number of chips shown. */
  maxTools?: number;
}

export function DisciplineCard({ discipline, tools, href, showArrow = false, maxTools }: DisciplineCardProps) {
  const d = DISCIPLINES[discipline];
  const shown = maxTools != null ? tools.slice(0, maxTools) : tools;
  const body = (
    <>
      <div className={styles.head}>
        <span className={styles.dot} style={{ background: d.color }} />
        <span className={styles.label}>{d.route}</span>
        {showArrow && <LinkArrow className={styles.arrow} />}
      </div>
      {shown.length > 0 && (
        <div className={styles.tools}>
          {shown.map((t) => (
            <TechChip key={t} label={t} />
          ))}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.card} ${styles.link}`} aria-label={d.route}>
        {body}
      </Link>
    );
  }
  return <div className={styles.card}>{body}</div>;
}
