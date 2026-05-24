import type { BlogPost } from '@/types';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { formatMonthYear, readingLabel } from '@/lib/format';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './BlogPostHero.module.scss';

export function BlogPostHero({ post }: { post: BlogPost }) {
  return (
    <Entrance className={styles.hero}>
      <EntranceItem className={styles.metaRow}>
        <Pill label={post.category} tone="discipline" />
        <span className={styles.metaMono}>
          {formatMonthYear(post.date)} · {readingLabel(post.readingTime)} · in /blog
        </span>
      </EntranceItem>

      <EntranceTitle className={styles.title}>
        {post.title}<span className={styles.period}>.</span>
      </EntranceTitle>

      <EntranceItem className={styles.authorRow}>
        <div className={styles.authorLeft}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.authorInfo}>
            <div className={styles.authorName}>{post.author.name}</div>
            <div className={styles.authorRole}>{post.author.role}</div>
          </div>
        </div>
        <div className={styles.chips}>
          {post.tags.map((tag) => (
            <TechChip key={tag} label={tag} />
          ))}
        </div>
      </EntranceItem>
    </Entrance>
  );
}
