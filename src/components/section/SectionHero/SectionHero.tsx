import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import styles from './SectionHero.module.scss';

export function SectionHero({
  discipline,
  count,
  intro,
  tools,
}: {
  discipline: Discipline;
  count: number;
  intro: string;
  tools: string[];
}) {
  const d = DISCIPLINES[discipline];
  return (
    <div className={styles.hero}>
      <Eyebrow withDot>
        Section · {d.route} · {count} projects
      </Eyebrow>
      <div className={styles.grid}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            {d.label}<span className={styles.period}>.</span>
          </h1>
          <p className={styles.intro}>{intro}</p>
        </div>
        <div className={styles.right}>
          <Eyebrow>Working with</Eyebrow>
          <div className={styles.tools}>
            {tools.map((t) => <TechChip key={t} label={t} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
