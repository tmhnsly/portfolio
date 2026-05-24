import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/lib/content';
import { DISCIPLINES } from '@/lib/disciplines';
import { SITE, COPY } from '@/data';
import { Container, Stack } from '@/components/layout';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Pill } from '@/components/ui/Pill';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { formatMonthYear, readingLabel } from '@/lib/format';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { PostBody } from '@/components/blog/PostBody';
import { AuthorCard } from '@/components/blog/AuthorCard';
import type { BlogPost } from '@/types';
import styles from './page.module.scss';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : undefined;       // newer = earlier in desc list
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : undefined;
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);
  const blogGrad = DISCIPLINES.blog.gradient;

  return (
    <Container>
      <Stack>
          <BlogPostHero post={post} />
        <Media
          grad={blogGrad}
          src={post.cover?.src}
          alt={post.cover?.alt ?? post.title}
          ratio="16/7"
          sizes="(min-width: 1200px) 60vw, 100vw"
        />
        <PostBody post={post} />

        {/* End matter: tags + "Send a note" link */}
        <div className={styles.endMatter}>
          <div className={styles.endTags}>
            {post.tags.map((tag) => (
              <TechChip key={tag} label={tag} />
            ))}
          </div>
          <div className={styles.endNote}>
            <span className={styles.endNoteLabel}>{COPY.blog.foundUseful}</span>
            <Button variant="ghost" href={`mailto:${SITE.email}?subject=Re: ${encodeURIComponent(post.title)}`}>
              {COPY.blog.sendNote}
            </Button>
          </div>
        </div>

        <AuthorCard author={post.author} />

        {/* Prev / Next */}
        {(older || newer) && (
          <nav className={styles.prevNext} aria-label="Post navigation">
            {older ? (
              <Link href={`/blog/${older.slug}`} className={styles.navCard}>
                <span className={styles.navDir}>{COPY.blog.olderPost}</span>
                <span className={styles.navTitle}>{older.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className={`${styles.navCard} ${styles.navCardRight}`}>
                <span className={styles.navDir}>{COPY.blog.newerPost}</span>
                <span className={styles.navTitle}>{newer.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHeader}>
              <div>
                <Eyebrow>{COPY.blog.relatedEyebrow}</Eyebrow>
                <h2 className={styles.relatedHeading}>
                  {COPY.blog.relatedHeading}<span className={styles.period}>.</span>
                </h2>
              </div>
              <Link href="/blog" className={styles.allPostsLink}>{COPY.blog.allPosts}</Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} grad={blogGrad} />
              ))}
            </div>
          </section>
        )}
      </Stack>
    </Container>
  );
}

function RelatedCard({ post, grad }: { post: BlogPost; grad: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.relatedItem}>
      <Media
        grad={grad}
        src={post.cover?.src}
        alt={post.cover?.alt ?? post.title}
        ratio="16/9"
        sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 90vw"
        rounded
      />
      <div className={styles.relatedMeta}>
        <Pill label={post.category} tone="discipline" />
      </div>
      <div className={styles.relatedTitle}>{post.title}</div>
      <div className={styles.relatedFoot}>
        <span>{formatMonthYear(post.date)}</span>
        <span>{readingLabel(post.readingTime)} →</span>
      </div>
    </Link>
  );
}
