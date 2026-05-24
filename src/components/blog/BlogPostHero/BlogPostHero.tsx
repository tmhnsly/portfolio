import type { BlogPost } from '@/types';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { formatMonthYear, readingLabel } from '@/lib/format';
import styles from './BlogPostHero.module.scss';

export function BlogPostHero({ post }: { post: BlogPost }) {
  return (
    <section className={styles.hero}>
      <p className={styles.breadcrumb}>
        <span>Home</span>
        <span>/</span>
        <span>Blog</span>
        <span>/</span>
        <span>{post.title}</span>
      </p>

      <div className={styles.metaRow}>
        <Pill label={post.category} tone="discipline" />
        <span className={styles.metaMono}>
          {formatMonthYear(post.date)} · {readingLabel(post.readingTime)} · in /blog
        </span>
      </div>

      <h1 className={styles.title}>
        {post.title}<span className={styles.period}>.</span>
      </h1>

      <div className={styles.authorRow}>
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
      </div>
    </section>
  );
}
