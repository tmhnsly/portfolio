import Link from 'next/link';
import type { Discipline } from '@/types';
import { DISCIPLINES, DISCIPLINE_ORDER } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './OtherDisciplines.module.scss';

export function OtherDisciplines({ current }: { current: Discipline }) {
  const others = DISCIPLINE_ORDER.filter((slug) => slug !== current);
  return (
    <div className={styles.wrap}>
      <Eyebrow>Also see</Eyebrow>
      <div className={styles.row}>
        {others.map((slug) => {
          const d = DISCIPLINES[slug];
          return (
            <Link key={slug} href={d.route} className={styles.link}>
              <GlassCard soft>
                <span className={styles.dot} style={{ background: d.color }} aria-hidden />
                <span className={styles.route}>{d.route}</span>
                <span className={styles.arrow} aria-hidden>→</span>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
