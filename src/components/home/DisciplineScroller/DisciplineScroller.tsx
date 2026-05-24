import Link from 'next/link';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { toolsByDiscipline } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './DisciplineScroller.module.scss';

export function DisciplineScroller() {
  return (
    <section className={styles.section} aria-label="Explore by discipline">
      <div className={styles.head}>
        <Eyebrow>Explore by discipline</Eyebrow>
      </div>
      <div className={styles.track}>
        {DISCIPLINE_ORDER.map((slug) => {
          const d = DISCIPLINES[slug];
          return (
            <Link key={slug} href={d.route} className={styles.cardLink} aria-label={d.route}>
              <GlassCard soft className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.dot} style={{ background: d.color }} />
                  <span className={styles.slug}>{d.route}</span>
                  <span className={styles.arrow} aria-hidden>↗</span>
                </div>
                <div className={styles.tools}>
                  {toolsByDiscipline[slug].slice(0, 5).map((t) => <TechChip key={t} label={t} />)}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
