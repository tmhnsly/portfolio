import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
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
  const d = DISCIPLINES[project.discipline];
  const primaryLink = project.liveUrl ?? project.links?.[0]?.url;

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
  // repo isn't a meta fact — it lives in the Links section (ProjectLinks) only

  return (
    <Entrance className={styles.hero}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <EntranceItem className={styles.pillRow}>
            <Pill label={d.label} tone="discipline" />
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
