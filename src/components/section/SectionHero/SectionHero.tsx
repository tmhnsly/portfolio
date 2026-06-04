import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { PixelMark } from '@/components/ui/PixelMark';
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
          <div className={styles.titleRow}>
            <span className={styles.titleMark} aria-hidden>
              <PixelMark icon={discipline} accent="var(--accent)" size="0.92em" />
            </span>
            <EntranceTitle className={styles.title} title={d.label} period />
          </div>
          <EntranceItem>
            <p className={styles.intro}>{intro}</p>
          </EntranceItem>
        </div>
        {tools.length > 0 && (
          <EntranceItem className={styles.right}>
            <Eyebrow>Working with</Eyebrow>
            <div className={styles.tools}>
              {tools.map((t) => <TechChip key={t} label={t} />)}
            </div>
          </EntranceItem>
        )}
      </div>
    </Entrance>
  );
}
