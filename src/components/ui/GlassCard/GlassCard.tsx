import { cx } from '@/lib/cx';
import styles from './GlassCard.module.scss';
export function GlassCard({ children, soft = false, className }: { children: React.ReactNode; soft?: boolean; className?: string }) {
  return <div className={cx(styles.card, soft && styles.soft, className)}>{children}</div>;
}
