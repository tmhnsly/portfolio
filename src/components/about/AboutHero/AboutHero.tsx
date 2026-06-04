import { SITE, COPY } from '@/data';
import { yearsSince } from '@/lib/format';
import { TechChip } from '@/components/ui/TechChip';
import { PixelMark } from '@/components/ui/PixelMark';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  const intro = COPY.about.intro.replace('{years}', String(yearsSince(SITE.experienceSince)));
  // Glue the trailing period to the last name word so a narrow column wraps
  // "Hinsley." together instead of orphaning the period on its own line. Each
  // nested span holds a single string or only elements (never a mixed array) —
  // EntranceTitle's word-splitter recurses through these and a mixed [string,
  // element] child mismatches on hydration (see Hero).
  const nameWords = SITE.name.trim().split(/\s+/);
  const nameLast = nameWords.at(-1) ?? SITE.name;
  const nameLead = nameWords.slice(0, -1).join(' ');
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
          <EntranceTitle className={styles.name}>
            {nameLead ? <span>{`${nameLead} `}</span> : null}
            <span className={styles.nameEnd}>
              <span>{nameLast}</span><span className={styles.dot}>.</span>
            </span>
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
