import styles from './Container.module.scss';

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>;
}
