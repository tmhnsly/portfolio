import Link from 'next/link';
import type { BlogPost } from '@/lib/schemas';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PostThumb } from '@/components/blog/PostThumb';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { CardArrow } from '@/components/ui/CardArrow';
import { postPresentation } from '@/lib/post-presentation';
import styles from './FeaturedPost.module.scss';

export function FeaturedPost({ post }: { post: BlogPost }) {
  const p = postPresentation(post);
  return (
    <section className={styles.section}>
      <Eyebrow>
        Latest · {p.date} · {p.reading}
      </Eyebrow>
      <Link href={p.href} className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.mediaWrap}>
            <PostThumb post={post} ratio="16/11" sizes={IMG_SIZES.featured} className={styles.media}>
              <span className={styles.categoryPill}>
                <Pill label={p.category} tone="solid" />
              </span>
            </PostThumb>
          </div>
          <div className={styles.content}>
            <div className={styles.head}>
              <h2 className={styles.title}>{post.title}</h2>
              <CardArrow className={styles.arrow} />
            </div>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.chips}>
              {post.tags.map((tag) => (
                <TechChip key={tag} label={tag} />
              ))}
            </div>
            <div className={styles.readMore}>Read the post</div>
          </div>
        </div>
      </Link>
    </section>
  );
}
