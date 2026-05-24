import { tomato } from '@radix-ui/colors';
import type { Discipline } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Bloom } from '../Bloom';
import styles from './Page.module.scss';

export function Page({ discipline, children }: { discipline?: Discipline; children: React.ReactNode }) {
  const accent = discipline ? DISCIPLINES[discipline].color : tomato.tomato9;
  return (
    <div className={styles.page} style={{ '--accent': accent, '--accent-glow': `color-mix(in srgb, ${accent} 25%, transparent)` } as React.CSSProperties}>
      <Bloom />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
