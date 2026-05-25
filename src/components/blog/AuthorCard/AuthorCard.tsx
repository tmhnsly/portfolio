import type { Author } from '@/types';
import { COPY } from '@/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './AuthorCard.module.scss';

export function AuthorCard({ author }: { author: Author }) {
  return (
    <GlassCard className={styles.card}>
      <div className={styles.avatar} aria-hidden="true" />
      <div className={styles.info}>
        <div className={styles.name}>{author.name}</div>
        <div className={styles.bio}>{author.bio}</div>
      </div>
      <Button variant="ghost" href="/about">{COPY.blog.aboutArrow} <LinkArrow inline /></Button>
    </GlassCard>
  );
}
