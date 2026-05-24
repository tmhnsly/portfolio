import type { BlogPost } from '@/types';
import { Markdown } from '@/components/ui/Markdown';
import styles from './PostBody.module.scss';

export function PostBody({ post }: { post: BlogPost }) {
  return (
    <section className={styles.body}>
      <div className={styles.column}>
        <p className={styles.lead}>{post.excerpt}</p>
        <Markdown>{post.body}</Markdown>
      </div>
    </section>
  );
}
