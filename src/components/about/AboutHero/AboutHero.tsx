import { SITE, COPY } from '@/data';
import { yearsSince } from '@/lib/format';
import { BiDownload } from 'react-icons/bi';
import { TechChip } from '@/components/ui/TechChip';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  const intro = COPY.about.intro.replace('{years}', String(yearsSince(SITE.experienceSince)));
  return (
    <Entrance className={styles.section}>
      <div className={styles.grid}>
        <EntranceItem className={styles.portrait}>
          <Media
            src="/images/about/tom-hinsley.webp"
            alt={SITE.name}
            ratio="4/5"
            rounded
            sizes="(max-width: 768px) 60vw, 260px"
            className={styles.photo}
          />
        </EntranceItem>
        <div className={styles.copy}>
          <EntranceTitle className={styles.name} title={SITE.name} period />
          <EntranceItem>
            <p className={styles.intro}>{intro}</p>
          </EntranceItem>
          <EntranceItem className={styles.chips}>
            {COPY.about.chips.map((c) => (
              <TechChip key={c} label={c} />
            ))}
          </EntranceItem>
          <EntranceItem className={styles.cvRow}>
            <Button variant="ghost" href="/tom-hinsley-cv.pdf" download="Tom-Hinsley-CV.pdf">
              <BiDownload aria-hidden /> Download CV
            </Button>
          </EntranceItem>
        </div>
      </div>
    </Entrance>
  );
}
