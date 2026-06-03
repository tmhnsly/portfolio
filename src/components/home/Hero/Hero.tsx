import type { Project } from '@/types';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import { CardDeck } from '../CardDeck';
import styles from './Hero.module.scss';

export function Hero({ featured }: { featured: Project[] }) {
  // Glue the trailing period to the final muted word: EntranceTitle makes each
  // word an inline-block, and a soft-wrap sits between the last word and the
  // (separate) accent period — so it could drop to its own line. A nowrap span
  // around the last word + period removes that break (it still wraps at the
  // earlier space). Mirrors ProjectHero.
  const mutedWords = COPY.hero.titleMuted.trim().split(/\s+/);
  const mutedLast = mutedWords.at(-1) ?? COPY.hero.titleMuted;
  const mutedLead = mutedWords.slice(0, -1).join(' ');
  return (
    <Entrance className={styles.hero}>
      <div className={styles.lead}>
        <EntranceTitle className={styles.title}>
          {COPY.hero.titleLead}<br />
          <span className={styles.muted}>
            {mutedLead && `${mutedLead} `}
            <span className={styles.titleEnd}>{mutedLast}<span className={styles.period}>.</span></span>
          </span>
        </EntranceTitle>
        <EntranceItem i={0}>
          <p className={styles.sub}>{COPY.hero.sub}</p>
        </EntranceItem>
      </div>
      <EntranceItem i={1} className={styles.deckCol}>
        <Eyebrow>Featured deck</Eyebrow>
        <div className={styles.deck}>
          <CardDeck items={featured} />
        </div>
      </EntranceItem>
    </Entrance>
  );
}
