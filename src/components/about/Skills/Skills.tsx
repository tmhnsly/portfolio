import type { SkillGroup } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DisciplineCard } from '@/components/ui/DisciplineCard';
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
        {skills.map((s) => (
          <DisciplineCard
            key={s.discipline}
            discipline={s.discipline}
            tools={s.tools}
            href={DISCIPLINES[s.discipline].route}
            showArrow
          />
        ))}
      </div>
    </section>
  );
}
