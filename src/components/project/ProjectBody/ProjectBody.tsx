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

        {(project.liveUrl || project.repo) && (
          <div className={styles.sideSection}>
            <Eyebrow>Links</Eyebrow>
            <div className={styles.links}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
                  <span className={styles.linkLabel}>Live site</span>
                  <span className={styles.linkUrl}>{project.liveUrl.replace('https://', '')} ↗</span>
                </a>
              )}
              {project.repo && (
                <a href={project.repo.startsWith('http') ? project.repo : `https://${project.repo}`} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
                  <span className={styles.linkLabel}>Repository</span>
                  <span className={styles.linkUrl}>{project.repo} ↗</span>
                </a>
              )}
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}
