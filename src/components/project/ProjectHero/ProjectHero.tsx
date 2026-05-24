import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Pill } from '@/components/ui/Pill';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './ProjectHero.module.scss';

export function ProjectHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];

  const metaRows: [string, string][] = [];
  if (project.role)   metaRows.push(['Role',   project.role]);
  if (project.year)   metaRows.push(['Year',   String(project.year)]);
  if (project.status) metaRows.push(['Status', project.status]);
  if (project.repo)   metaRows.push(['Repo',   project.repo]);

  return (
    <Entrance className={styles.hero}>
      <EntranceItem>
        <p className={styles.breadcrumb}>
          <span>Home</span>
          <span>/</span>
          <span>{d.label}</span>
          <span>/</span>
          <span>{project.title}</span>
        </p>
      </EntranceItem>

      <div className={styles.layout}>
        <div className={styles.main}>
          <EntranceItem className={styles.pillRow}>
            <Pill label={d.label} tone="discipline" />
            {project.status && (
              <span className={styles.statusPill}>{project.status}</span>
            )}
            {project.liveUrl && (
              <span className={styles.liveUrl}>{project.liveUrl.replace('https://', '')} ↗</span>
            )}
          </EntranceItem>

          <EntranceTitle className={styles.title}>
            {project.title}<span className={styles.period}>.</span>
          </EntranceTitle>

          {project.desc && (
            <EntranceItem>
              <p className={styles.lead}>{project.desc}</p>
            </EntranceItem>
          )}
        </div>

        {(metaRows.length > 0 || project.liveUrl || project.repo) && (
          <EntranceItem className={styles.meta}>
            {metaRows.map(([key, val]) => (
              <div key={key} className={styles.metaRow}>
                <div className={styles.metaKey}>{key}</div>
                <div className={styles.metaVal}>{val}</div>
              </div>
            ))}

            {(project.liveUrl || project.repo) && (
              <div className={styles.linksBlock}>
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
          </EntranceItem>
        )}
      </div>
    </Entrance>
  );
}
