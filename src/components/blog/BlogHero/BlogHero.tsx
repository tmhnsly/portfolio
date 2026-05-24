import { COPY } from '@/data';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './BlogHero.module.scss';

export function BlogHero() {
  return (
    <Entrance className={styles.section}>
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
