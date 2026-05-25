import { SITE, COPY } from '@/data';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { yearsSince } from '@/lib/format';
import { Media } from '@/components/ui/Media';
import { TechChip } from '@/components/ui/TechChip';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  const intro = COPY.about.intro.replace('{years}', String(yearsSince(SITE.experienceSince)));
  return (
    <Entrance className={styles.section}>
      <div className={styles.grid}>
        <EntranceItem className={styles.portrait}>
          <Media
            src="/images/about/portrait.jpg"
            grad={DISCIPLINES.code.gradient}
            alt="Tom Hinsley — portrait"
            ratio="4/5"
            sizes={IMG_SIZES.portrait}
            rounded
          />
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
