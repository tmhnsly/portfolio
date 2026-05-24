import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Pill } from '@/components/ui/Pill';
import styles from './ProjectHero.module.scss';

export function ProjectHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];

  const metaRows: [string, string][] = [];
  if (project.role)   metaRows.push(['Role',   project.role]);
  if (project.year)   metaRows.push(['Year',   String(project.year)]);
  if (project.status) metaRows.push(['Status', project.status]);
  if (project.repo)   metaRows.push(['Repo',   project.repo]);

  return (
    <section className={styles.hero}>
      <p className={styles.breadcrumb}>
        <span>Home</span>
        <span>/</span>
        <span>{d.label}</span>
        <span>/</span>
        <span>{project.title}</span>
      </p>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.pillRow}>
            <Pill label={d.label} tone="discipline" />
            {project.status && (
              <span className={styles.statusPill}>{project.status}</span>
            )}
            {project.liveUrl && (
              <span className={styles.liveUrl}>{project.liveUrl.replace('https://', '')} ↗</span>
            )}
          </div>

          <h1 className={styles.title}>
            {project.title}<span className={styles.period}>.</span>
          </h1>

          {project.desc && (
            <p className={styles.lead}>{project.desc}</p>
          )}
        </div>

        {metaRows.length > 0 && (
          <div className={styles.meta}>
            {metaRows.map(([key, val]) => (
              <div key={key} className={styles.metaRow}>
                <div className={styles.metaKey}>{key}</div>
                <div className={styles.metaVal}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
