import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pageMeta } from '@/lib/metadata';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { getAllPosts, getPost, postNeighbours, relatedPosts } from '@/lib/content';
import { postHref } from '@/lib/routes';
import { blogPostingJsonLd, breadcrumbJsonLd, postCrumbs } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { IMG_SIZES } from '@/lib/breakpoints';
import { COPY } from '@/data';
import { Container, Stack } from '@/components/layout';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Pill } from '@/components/ui/Pill';
import { EmailLink } from '@/components/ui/EmailLink';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { formatMonthYear, readingLabel } from '@/lib/format';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { PostThumb } from '@/components/blog/PostThumb';
import { PostBody } from '@/components/blog/PostBody';
import { AuthorCard } from '@/components/blog/AuthorCard';
import type { BlogPost } from '@/types';
import styles from './page.module.scss';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: postHref(slug), type: 'article', publishedTime: post.date });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { newer, older } = postNeighbours(slug);
  const related = relatedPosts(slug);

  return (
    <Container>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(postCrumbs(post))} />
      <Stack>
        <aside className={styles.notice} role="note">
          <span className={styles.noticeLabel}>{COPY.blog.postNotice.label}</span>
          <span className={styles.noticeText}>{COPY.blog.postNotice.text}</span>
        </aside>
          <BlogPostHero post={post} />
        <PostThumb post={post} ratio="16/7" sizes={IMG_SIZES.full} />
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
            <EmailLink variant="ghost" subject={`Re: ${post.title}`} showArrow inline>
              {COPY.blog.sendNote}
            </EmailLink>
          </div>
        </div>

        <AuthorCard author={post.author} />

        {/* Prev / Next */}
        {(older || newer) && (
          <nav className={styles.prevNext} aria-label="Post navigation">
            {older ? (
              <Link href={postHref(older.slug)} className={styles.navCard}>
                <span className={styles.navDir}><BiLeftArrowAlt className={styles.navArrow} aria-hidden /> {COPY.blog.olderPost}</span>
                <span className={styles.navTitle}>{older.title}</span>
              </Link>
            ) : (
              <div className={`${styles.navCard} ${styles.navDisabled}`}>
                <span className={styles.navDir}><BiLeftArrowAlt className={styles.navArrow} aria-hidden /> {COPY.blog.olderPost}</span>
                <span className={styles.navTitle}>—</span>
              </div>
            )}
            {newer ? (
              <Link href={postHref(newer.slug)} className={`${styles.navCard} ${styles.navCardRight}`}>
                <span className={styles.navDir}>{COPY.blog.newerPost} <BiRightArrowAlt className={styles.navArrow} aria-hidden /></span>
                <span className={styles.navTitle}>{newer.title}</span>
              </Link>
            ) : (
              <div className={`${styles.navCard} ${styles.navCardRight} ${styles.navDisabled}`}>
                <span className={styles.navDir}>{COPY.blog.newerPost} <BiRightArrowAlt className={styles.navArrow} aria-hidden /></span>
                <span className={styles.navTitle}>—</span>
              </div>
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
              <Link href="/blog" className={styles.allPostsLink}>{COPY.blog.allPosts} <LinkArrow inline /></Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </Stack>
    </Container>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={postHref(post.slug)} className={styles.relatedItem}>
      <PostThumb post={post} ratio="16/9" sizes={IMG_SIZES.grid3} rounded />
      <div className={styles.relatedMeta}>
        <Pill label={post.category} tone="discipline" />
      </div>
      <div className={styles.relatedTitle}>{post.title}</div>
      <div className={styles.relatedFoot}>
        <span>{formatMonthYear(post.date)}</span>
        <span>{readingLabel(post.readingTime)} <LinkArrow inline /></span>
      </div>
    </Link>
  );
}
