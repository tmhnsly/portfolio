import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Bloom } from '../Bloom';
import styles from './Page.module.scss';

export function Page({ discipline, children }: { discipline?: Discipline; children: React.ReactNode }) {
  const accent = discipline ? DISCIPLINES[discipline].color : '#e54d2e';
  return (
    <div className={styles.page} style={{ '--accent': accent } as React.CSSProperties}>
      <Bloom />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
