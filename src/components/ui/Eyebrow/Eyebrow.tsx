import { DisciplineDot } from '../DisciplineDot';
import styles from './Eyebrow.module.scss';
export function Eyebrow({ children, withDot = false }: { children: React.ReactNode; withDot?: boolean }) {
  return (
    <div className={styles.eyebrow}>
      {withDot && <DisciplineDot />}
      <span>{children}</span>
    </div>
  );
}
