import styles from './Stack.module.scss';

export function Stack({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={[styles.stack, className].filter(Boolean).join(' ')}>{children}</div>;
}
