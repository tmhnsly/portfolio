import type { Project } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Markdown } from '@/components/ui/Markdown';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import styles from './ProjectBody.module.scss';

export function ProjectBody({ project }: { project: Project }) {
  return (
    <section className={styles.body}>
      <div className={styles.notes}>
        <Eyebrow>Notes</Eyebrow>
        <div className={styles.prose}>
          <Markdown>{project.body}</Markdown>
        </div>
      </div>

      {/* a plain div, not <aside>: it sits inside the page's <main> landmark, and a
          complementary landmark must not nest inside another landmark. The tech/links
          are integral project detail, not tangential content. */}
      <div className={styles.sidebar}>
        {project.tags.length > 0 && (
          <div className={styles.sideSection}>
            <Eyebrow>Tags</Eyebrow>
            <ul className={styles.techList}>
              {project.tags.map((t) => (
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
            <ProjectLinks project={project} />
          </div>
        )}
      </div>
    </section>
  );
}
