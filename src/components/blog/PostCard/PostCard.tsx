import Link from 'next/link';
import type { BlogPost } from '@/lib/schemas';
import { IMG_SIZES } from '@/lib/breakpoints';
import { TechChip } from '@/components/ui/TechChip';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { PostThumb } from '@/components/blog/PostThumb';
import { postPresentation } from '@/lib/post-presentation';
import styles from './PostCard.module.scss';

export function PostCard({ post }: { post: BlogPost }) {
  const p = postPresentation(post);
  return (
    <Link href={p.href} className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.date}>{p.date}</span>
        <span className={styles.category}>{p.category}</span>
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
        <div className={styles.thumb}>
          <PostThumb post={post} ratio="16/11" sizes={IMG_SIZES.thumb} />
        </div>
        <span className={styles.readTime}>{p.reading}</span>
        <span className={styles.readLink}>read <LinkArrow className={styles.arrow} /></span>
      </div>
    </Link>
  );
}
