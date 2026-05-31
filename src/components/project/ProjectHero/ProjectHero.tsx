import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Pill } from '@/components/ui/Pill';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
import styles from './ProjectHero.module.scss';

export function ProjectHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];

  // Keep the trailing period glued to the final word: each word becomes its own
  // inline-block wordClip (in EntranceTitle), and a soft-wrap opportunity sits
  // between adjacent inline-blocks — so on a long title the period would drop to
  // its own line. Wrapping the last word + period in a nowrap span removes that
  // one break (the title still wraps at the earlier spaces).
  const titleWords = project.title.trim().split(/\s+/);
  const lastWord = titleWords.at(-1) ?? project.title;
  const leadWords = titleWords.slice(0, -1).join(' ');

  const metaRows: [string, string][] = [];
  if (project.role)   metaRows.push(['Role',   project.role]);
  if (project.year)   metaRows.push(['Year',   String(project.year)]);
  if (project.status) metaRows.push(['Status', project.status]);
  if (project.repo)   metaRows.push(['Repo',   project.repo]);

  return (
    <Entrance className={styles.hero}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <EntranceItem className={styles.pillRow}>
            <Pill label={d.label} tone="discipline" />
            {project.status && (
              <span className={styles.statusPill}>{project.status}</span>
            )}
            {project.liveUrl && (
              <a className={styles.liveUrl} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <span className={styles.liveUrlText}>{project.liveUrl.replace('https://', '')}</span>
                <LinkArrow inline />
              </a>
            )}
          </EntranceItem>

          <EntranceTitle className={styles.title}>
            {leadWords && `${leadWords} `}
            <span className={styles.titleEnd}>{lastWord}<span className={styles.period}>.</span></span>
          </EntranceTitle>

          {project.desc && (
            <EntranceItem>
              <p className={styles.lead}>{project.desc}</p>
            </EntranceItem>
          )}
        </div>

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
    </Entrance>
  );
}
