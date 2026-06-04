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
        <EntranceTitle
          className={styles.title}
          title={[{ text: COPY.hero.titleLead }, { text: COPY.hero.titleMuted, tone: 'muted' }]}
          period
        />
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
