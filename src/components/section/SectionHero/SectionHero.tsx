import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './SectionHero.module.scss';

export function SectionHero({
  discipline,
  intro,
  tools,
}: {
  discipline: Discipline;
  intro: string;
  tools: string[];
}) {
  const d = DISCIPLINES[discipline];
  return (
    <Entrance className={styles.hero}>
      {/* the "Section · /code · N projects" eyebrow now lives in
          app/[discipline]/layout.tsx so it persists + morphs across hubs */}
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
