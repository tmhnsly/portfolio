import type { Project } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Markdown } from '@/components/ui/Markdown';
import styles from './ProjectBody.module.scss';

export function ProjectBody({ project }: { project: Project }) {
  return (
    <section className={styles.body}>
      <div className={styles.notes}>
        <Eyebrow>§ 01 — Notes</Eyebrow>
        <div className={styles.prose}>
          <Markdown>{project.body}</Markdown>
        </div>
      </div>

      <aside className={styles.sidebar}>
        {project.tech.length > 0 && (
          <div className={styles.sideSection}>
            <Eyebrow>Built with</Eyebrow>
            <ul className={styles.techList}>
              {project.tech.map((t) => (
                <li key={t} className={styles.techRow}>
                  <TechChip label={t} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </section>
  );
}
