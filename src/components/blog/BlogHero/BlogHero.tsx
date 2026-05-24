import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './BlogHero.module.scss';

export function BlogHero({ count }: { count: number }) {
  return (
    <Entrance className={styles.section}>
      <EntranceItem>
        <Eyebrow withDot>/blog · {count} posts · {COPY.blog.heroSince}</Eyebrow>
      </EntranceItem>
      <div className={styles.grid}>
        <div className={styles.left}>
          <EntranceTitle className={styles.heading}>
            Blog<span className={styles.period}>.</span>
          </EntranceTitle>
          <EntranceItem>
            <p className={styles.intro}>{COPY.blog.heroIntro}</p>
          </EntranceItem>
        </div>
        <div className={styles.right} />
      </div>
    </Entrance>
  );
}
