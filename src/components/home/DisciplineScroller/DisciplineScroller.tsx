import Link from 'next/link';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import type { Discipline } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './DisciplineScroller.module.scss';

const TOOLS: Record<Discipline, string[]> = {
  code: ['React', 'TypeScript', 'Three.js', 'Sanity', 'Godot'],
  music: ['Logic Pro X', 'Ableton', 'Tape'],
  sound: ['Pro Tools', 'Reaper', 'Field rec.'],
  photo: ['35mm', 'Portra 400', 'Leica M6', 'Lightroom'],
  video: ['Final Cut Pro X', 'DaVinci', 'RED'],
  blog: ['Notes', 'Essays', 'Dev logs'],
};

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
                  {TOOLS[slug].map((t) => <TechChip key={t} label={t} />)}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
