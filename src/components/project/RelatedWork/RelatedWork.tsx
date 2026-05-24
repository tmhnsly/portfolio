import type { Project } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProjectCard } from '@/components/section/ProjectCard';
import styles from './RelatedWork.module.scss';

export function RelatedWork({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.header}>
        <Eyebrow>You might also like</Eyebrow>
        <h2 className={styles.heading}>From across the practice.</h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
