import type { Project } from '@/types';
import { projectPresentation } from '@/lib/project-presentation';
import { Pill } from '@/components/ui/Pill';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './ProjectHero.module.scss';

// The hero surfaces ONE primary link at the top of the pill row: the live site,
// or the first of `links` when there's no `liveUrl` (so link-only projects like
// Clays/Earnt/FT show a top link too, matching the liveUrl projects). `repo`
// stays in the Links section only — a source URL reads better there.
const hostLabel = (url: string) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');

export function ProjectHero({ project }: { project: Project }) {
  const { label } = projectPresentation(project);
  const primaryLink = project.liveUrl ?? project.links?.[0]?.url;

  const metaRows: [string, string][] = [];
  if (project.role)   metaRows.push(['Role',   project.role]);
  if (project.year)   metaRows.push(['Year',   String(project.year)]);
  if (project.status) metaRows.push(['Status', project.status]);
  // repo isn't a meta fact — it lives in the Links section (ProjectLinks) only

  return (
    <Entrance className={styles.hero}>
      {/* Pills + title span the FULL hero width (title sized to the whole hero, not
          a column) so they use the space confidently; lead + meta sit in a row
          beneath. Previously the title was boxed into a 1.4fr column while the meta
          column reserved 1fr even when sparse — small title, empty right side. */}
      <EntranceItem className={styles.pillRow}>
        <Pill label={label} tone="discipline" />
        {project.status && (
          <span className={styles.statusPill}>{project.status}</span>
        )}
        {primaryLink && (
          <a className={styles.liveUrl} href={primaryLink} target="_blank" rel="noopener noreferrer">
            <span className={styles.liveUrlText}>{hostLabel(primaryLink)}</span>
            <LinkArrow inline />
          </a>
        )}
      </EntranceItem>

      <EntranceTitle className={styles.title} title={project.title} period />

      {(project.desc || metaRows.length > 0) && (
        <div className={styles.lower}>
          {project.desc ? (
            <EntranceItem>
              <p className={styles.lead}>{project.desc}</p>
            </EntranceItem>
          ) : <span />}

          {metaRows.length > 0 && (
            <EntranceItem className={styles.meta}>
              {metaRows.map(([key, val]) => (
                <div key={key} className={styles.metaRow}>
                  <div className={styles.metaKey}>{key}</div>
                  <div className={styles.metaVal}>{val}</div>
                </div>
              ))}
            </EntranceItem>
          )}
        </div>
      )}
    </Entrance>
  );
}
