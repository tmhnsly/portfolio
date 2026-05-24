'use client';
import { useMemo, useState } from 'react';
import type { BlogPost } from '@/lib/schemas';
import { FilterPills } from '@/components/ui/FilterPills';
import { PostCard } from '../PostCard';
import styles from './PostList.module.scss';

export function PostList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState(0);

  const filters = useMemo(() => {
    const categories = Array.from(
      posts.reduce((map, post) => {
        map.set(post.category, (map.get(post.category) ?? 0) + 1);
        return map;
      }, new Map<string, number>()),
    );
    return [
      { label: 'All', count: posts.length },
      ...categories.map(([label, count]) => ({ label, count })),
    ];
  }, [posts]);

  const activeLabel = filters[active]?.label ?? 'All';
  const filtered = active === 0 ? posts : posts.filter((p) => p.category === activeLabel);

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
