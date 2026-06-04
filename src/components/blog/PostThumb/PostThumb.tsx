import type { ReactNode } from 'react';
import type { BlogPost } from '@/types';
import { Media } from '@/components/ui/Media';
import { DISCIPLINES } from '@/lib/disciplines';
import { BlogThumb } from '@/components/blog/BlogThumb';

export interface PostThumbProps {
  post: BlogPost;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  children?: ReactNode; // overlay chrome (e.g. the category Pill)
}

/**
 * A Post's cover — the Post-side mirror of ProjectThumb. Renders the post's cover
 * image when it has one, else the generated BlogThumb motif, inside the standard
 * Media frame. Posts are always in the blog Discipline, so the gradient fallback
 * is fixed here rather than passed in. `children` are overlays and layer on top
 * either way. Lets the four cover call sites (featured, list, post page, related)
 * stop hand-rolling the "image, else motif" decision.
 */
export function PostThumb({ post, ratio, sizes, priority, rounded, className, children }: PostThumbProps) {
  return (
    <Media
      grad={DISCIPLINES.blog.gradient}
      src={post.cover?.src}
      alt={post.cover?.alt ?? post.title}
      ratio={ratio}
      sizes={sizes}
      priority={priority}
      rounded={rounded}
      className={className}
    >
      {!post.cover?.src && <BlogThumb post={post} />}
      {children}
    </Media>
  );
}
