import styles from './GlassCard.module.scss';
export function GlassCard({ children, soft = false, className }: { children: React.ReactNode; soft?: boolean; className?: string }) {
  return <div className={[styles.card, soft ? styles.soft : '', className].filter(Boolean).join(' ')}>{children}</div>;
}
