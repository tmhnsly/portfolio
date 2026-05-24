import styles from './FullBleed.module.scss';

export function FullBleed({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={[styles.bleed, className].filter(Boolean).join(' ')}>{children}</div>;
}
