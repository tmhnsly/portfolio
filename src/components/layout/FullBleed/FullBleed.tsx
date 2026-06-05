import { cx } from '@/lib/cx';
import styles from './FullBleed.module.scss';

export function FullBleed({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx(styles.bleed, className)}>{children}</div>;
}
