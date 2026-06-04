import Link from 'next/link';
import type { BlogPost } from '@/lib/schemas';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { TechChip } from '@/components/ui/TechChip';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Media } from '@/components/ui/Media';
import { BlogThumb } from '@/components/blog/BlogThumb';
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
        {!post.cover?.src && (
          <div className={styles.thumb}>
            <Media grad={DISCIPLINES.blog.gradient} alt="" ratio="16/11" sizes={IMG_SIZES.thumb}>
              <BlogThumb post={post} />
            </Media>
          </div>
        )}
        <span className={styles.readTime}>{readingLabel(post.readingTime)}</span>
        <span className={styles.readLink}>read <LinkArrow className={styles.arrow} /></span>
      </div>
    </Link>
  );
}
