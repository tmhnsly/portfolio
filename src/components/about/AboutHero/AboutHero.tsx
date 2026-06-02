import { SITE, COPY } from '@/data';
import { yearsSince } from '@/lib/format';
import { TechChip } from '@/components/ui/TechChip';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  const intro = COPY.about.intro.replace('{years}', String(yearsSince(SITE.experienceSince)));
  return (
    <Entrance className={styles.section}>
      <div className={styles.grid}>
        {/* Placeholder until a real portrait is shot: a soft aurora panel in the
            4:5 slot, ready to swap for a <Media> photo later. */}
        <EntranceItem className={styles.portrait}>
          <div className={styles.aurora} aria-hidden />
        </EntranceItem>
        <div className={styles.copy}>
          <EntranceTitle className={styles.name}>
            {SITE.name}<span className={styles.dot}>.</span>
          </EntranceTitle>
          <EntranceItem>
            <p className={styles.intro}>{intro}</p>
          </EntranceItem>
          <EntranceItem className={styles.chips}>
            {COPY.about.chips.map((c) => (
              <TechChip key={c} label={c} />
            ))}
          </EntranceItem>
        </div>
      </div>
    </Entrance>
  );
}
