import type { Project } from '@/types';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './ProjectLinks.module.scss';

/** Live site / repository links, shown as a row directly beneath the cover image. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.repo) return null;
  return (
    <div className={styles.links}>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
          <span className={styles.linkLabel}>Live site</span>
          <span className={styles.linkUrl}>
            <span className={styles.linkUrlText}>{project.liveUrl.replace('https://', '')}</span>
            <LinkArrow inline />
          </span>
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo.startsWith('http') ? project.repo : `https://${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkRow}
        >
          <span className={styles.linkLabel}>Repository</span>
          <span className={styles.linkUrl}>
            <span className={styles.linkUrlText}>{project.repo}</span>
            <LinkArrow inline />
          </span>
        </a>
      )}
    </div>
  );
}
