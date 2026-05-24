import styles from './DisciplineDot.module.scss';
export function DisciplineDot({ size = 8 }: { size?: number }) {
  return <span className={styles.dot} style={{ width: size, height: size }} aria-hidden />;
}
