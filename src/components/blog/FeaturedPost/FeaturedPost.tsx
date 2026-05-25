import Link from 'next/link';
import type { BlogPost } from '@/lib/schemas';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { CardArrow } from '@/components/ui/CardArrow';
import { formatMonthYear, readingLabel } from '@/lib/format';
import styles from './FeaturedPost.module.scss';

export function FeaturedPost({ post }: { post: BlogPost }) {
  const blogMeta = DISCIPLINES.blog;
  return (
    <section className={styles.section}>
      <Eyebrow>
        Latest · {formatMonthYear(post.date)} · {readingLabel(post.readingTime)}
      </Eyebrow>
      <Link href={`/blog/${post.slug}`} className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.mediaWrap}>
            <Media
              grad={blogMeta.gradient}
              src={post.cover?.src}
              alt={post.cover?.alt ?? post.title}
              ratio="16/11"
              sizes={IMG_SIZES.featured}
              className={styles.media}
            >
              <span className={styles.categoryPill}>
                <Pill label={post.category} tone="solid" />
              </span>
            </Media>
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
