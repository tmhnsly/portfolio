import { SITE, COPY } from '@/data';
import { yearsSince } from '@/lib/format';
import { BiDownload } from 'react-icons/bi';
import { TechChip } from '@/components/ui/TechChip';
import { PixelMark } from '@/components/ui/PixelMark';
import { Button } from '@/components/ui/Button';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  const intro = COPY.about.intro.replace('{years}', String(yearsSince(SITE.experienceSince)));
  return (
    <Entrance className={styles.section}>
      <div className={styles.grid}>
        {/* Stand-in for a real portrait: the pixel-mark 'about' glyph (a pixel
            person), no frame/background. Swap the PixelMark for a <Media> photo
            when one's shot. */}
        <EntranceItem className={styles.portrait}>
          <div className={styles.markSlot} aria-hidden>
            <PixelMark icon="about" accent="var(--accent)" size="66%" />
          </div>
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
