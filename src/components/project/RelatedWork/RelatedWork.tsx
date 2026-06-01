import type { Project } from '@/types';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProjectCard } from '@/components/section/ProjectCard';
import styles from './RelatedWork.module.scss';

export function RelatedWork({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.header}>
        <Eyebrow>{COPY.project.relatedEyebrow}</Eyebrow>
        <h2 className={styles.heading}>{COPY.project.relatedHeading}</h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
