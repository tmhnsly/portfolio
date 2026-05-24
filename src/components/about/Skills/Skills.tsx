import type { SkillGroup } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { TechChip } from '@/components/ui/TechChip';
import styles from './Skills.module.scss';

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow>{COPY.about.skillsEyebrow}</Eyebrow>
        <h2 className={styles.title}>
          {COPY.about.skillsHeading}<span className={styles.accent}>.</span>
        </h2>
      </div>
      <div className={styles.grid}>
        {skills.map((s) => {
          const meta = DISCIPLINES[s.discipline];
          return (
            <GlassCard key={s.discipline} soft>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.dot} style={{ background: meta.color }} />
                  <span className={styles.label}>/{s.discipline}</span>
                </div>
                <div className={styles.tools}>
                  {s.tools.map((tool) => (
                    <TechChip key={tool} label={tool} />
                  ))}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
