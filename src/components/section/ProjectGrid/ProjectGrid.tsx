import type { Project } from '@/types';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from '@/components/section/ProjectCard';
import styles from './ProjectGrid.module.scss';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={(i % 3) * 0.06}>
          <ProjectCard project={project} hideDiscipline />
        </Reveal>
      ))}
    </div>
  );
}
