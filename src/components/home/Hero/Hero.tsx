import type { Project } from '@/types';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import { CardDeck } from '../CardDeck';
import styles from './Hero.module.scss';

export function Hero({ featured }: { featured: Project[] }) {
  return (
    <Entrance className={styles.hero}>
      <div className={styles.lead}>
        <EntranceTitle className={styles.title}>
          {COPY.hero.titleLead}<br />
          <span className={styles.muted}>{COPY.hero.titleMuted}</span><span className={styles.period}>.</span>
        </EntranceTitle>
        <EntranceItem>
          <p className={styles.sub}>{COPY.hero.sub}</p>
        </EntranceItem>
      </div>
      <EntranceItem className={styles.deckCol}>
        <Eyebrow>Featured deck</Eyebrow>
        <CardDeck items={featured} />
      </EntranceItem>
    </Entrance>
  );
}
