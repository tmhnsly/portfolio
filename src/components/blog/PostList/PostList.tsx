'use client';
import type { BlogPost } from '@/lib/schemas';
import { FilterPills, useFacets } from '@/components/ui/FilterPills';
import { PostCard } from '../PostCard';
import styles from './PostList.module.scss';

const categoryOf = (p: BlogPost) => p.category;

export function PostList({ posts }: { posts: BlogPost[] }) {
  const { filters, active, setActive, filtered } = useFacets(posts, categoryOf);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>
          Older posts<span className={styles.period}>.</span>
        </h2>
        <div className={styles.showing}>
          <span className={styles.showingText}>
            Showing {filtered.length} of {posts.length}
          </span>
          <FilterPills items={filters} active={active} onSelect={setActive} />
        </div>
      </div>
      <div className={styles.list}>
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
