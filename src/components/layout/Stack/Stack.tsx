import { cx } from '@/lib/cx';
import styles from './Stack.module.scss';

export function Stack({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx(styles.stack, className)}>{children}</div>;
}
