import Link from 'next/link';
import type { BlogPost } from '@/lib/schemas';
import { TechChip } from '@/components/ui/TechChip';
import { formatMonthYear, readingLabel } from '@/lib/format';
import styles from './PostCard.module.scss';

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.date}>{formatMonthYear(post.date)}</span>
        <span className={styles.category}>{post.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.chips}>
          {post.tags.map((tag) => (
            <TechChip key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.readTime}>{readingLabel(post.readingTime)}</span>
        <span className={styles.readLink}>read <span className={styles.arrow}>→</span></span>
      </div>
    </Link>
  );
}
