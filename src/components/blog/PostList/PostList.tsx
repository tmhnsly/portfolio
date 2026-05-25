'use client';
import { useMemo, useState } from 'react';
import type { BlogPost } from '@/lib/schemas';
import { buildFacets, filterByFacet } from '@/lib/facets';
import { FilterPills } from '@/components/ui/FilterPills';
import { PostCard } from '../PostCard';
import styles from './PostList.module.scss';

const categoryOf = (p: BlogPost) => p.category;

export function PostList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState(0);
  const filters = useMemo(() => buildFacets(posts, categoryOf), [posts]);

  const activeLabel = filters[active]?.label ?? 'All';
  const filtered = filterByFacet(posts, categoryOf, activeLabel);

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
