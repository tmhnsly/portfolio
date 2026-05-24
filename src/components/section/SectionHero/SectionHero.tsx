import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
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
    <Entrance className={styles.hero}>
      <EntranceItem>
        <Eyebrow withDot>
          Section · {d.route} · {count} projects
        </Eyebrow>
      </EntranceItem>
      <div className={styles.grid}>
        <div className={styles.left}>
          <EntranceTitle className={styles.title}>
            {d.label}<span className={styles.period}>.</span>
          </EntranceTitle>
          <EntranceItem>
            <p className={styles.intro}>{intro}</p>
          </EntranceItem>
        </div>
        <EntranceItem className={styles.right}>
          <Eyebrow>Working with</Eyebrow>
          <div className={styles.tools}>
            {tools.map((t) => <TechChip key={t} label={t} />)}
          </div>
        </EntranceItem>
      </div>
    </Entrance>
  );
}
