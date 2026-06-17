import type { BlogPost } from '@/types';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { postPresentation } from '@/lib/post-presentation';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './BlogPostHero.module.scss';

export function BlogPostHero({ post }: { post: BlogPost }) {
  const p = postPresentation(post);
  return (
    <Entrance className={styles.hero}>
      <EntranceItem className={styles.metaRow}>
        <Pill label={p.category} tone="discipline" />
        <span className={styles.metaMono}>
          {p.date} · {p.reading} · in /blog
        </span>
      </EntranceItem>

      <EntranceTitle className={styles.title} title={post.title} period />

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
