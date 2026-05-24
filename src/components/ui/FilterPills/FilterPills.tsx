'use client';
import styles from './FilterPills.module.scss';
export interface FilterItem { label: string; count?: number; }
export function FilterPills({ items, active = 0, onSelect }: { items: FilterItem[]; active?: number; onSelect?: (i: number) => void }) {
  return (
    <div className={styles.group}>
      {items.map((it, i) => (
        <button
          key={it.label}
          type="button"
          className={i === active ? `${styles.pill} ${styles.active}` : styles.pill}
          onClick={() => onSelect?.(i)}
          aria-pressed={i === active}
        >
          {it.label}
          {it.count != null && <span className={styles.count}>{it.count}</span>}
        </button>
      ))}
    </div>
  );
}
