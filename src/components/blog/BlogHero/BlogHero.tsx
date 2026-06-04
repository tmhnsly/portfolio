import { COPY } from '@/data';
import { PixelMark } from '@/components/ui/PixelMark';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './BlogHero.module.scss';

export function BlogHero() {
  return (
    <Entrance className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.titleRow}>
            <span className={styles.titleMark} aria-hidden>
              <PixelMark icon="blog" accent="var(--accent)" size="0.92em" />
            </span>
            <EntranceTitle className={styles.heading} title="Blog" period />
          </div>
          <EntranceItem>
            <p className={styles.intro}>{COPY.blog.heroIntro}</p>
          </EntranceItem>
        </div>
        <div className={styles.right} />
      </div>
    </Entrance>
  );
}
