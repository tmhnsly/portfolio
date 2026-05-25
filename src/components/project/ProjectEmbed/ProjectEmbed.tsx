import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Media } from '@/components/ui/Media';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './ProjectEmbed.module.scss';

const ACTIVE_PADS = new Set([0, 4, 6, 10, 11, 13]);

export function ProjectEmbed({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];

  if (project.slug === 'boucle') {
    return (
      <div className={styles.embed}>
        <div className={styles.boucle} style={{ background: d.gradient }}>
          <div className={styles.hatch} aria-hidden />

          <div className={styles.chromaTop}>
            <span className={styles.chromaTitle}>Boucle · v0.4</span>
            <div className={styles.chromaRight}>
              <span>● rec</span>
              <span>120 bpm</span>
              <span>4/4</span>
            </div>
            <span>open in new tab <LinkArrow inline /></span>
          </div>

          <div className={styles.stage}>
            <div className={styles.dialLeft}>
              <div className={styles.dial}>
                <div className={styles.dialMark} style={{ transform: 'translateX(-50%) rotate(-45deg)' }} />
              </div>
              <span className={styles.dialLabel}>tempo · <strong>120</strong></span>
            </div>

            <div className={styles.padGrid}>
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className={`${styles.pad} ${ACTIVE_PADS.has(i) ? styles.padActive : ''}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            <div className={styles.dialRight}>
              <div className={styles.dial}>
                <div className={styles.dialMark} style={{ transform: 'translateX(-50%) rotate(60deg)' }} />
              </div>
              <span className={styles.dialLabel}>character · <strong>68</strong></span>
            </div>
          </div>

          <div className={styles.chromaBottom}>
            <span>▶ play · ⏵ shuffle · ⏺ record</span>
            <span className={styles.chromaTime}>00:00:14:02</span>
            <span>shift + space</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.embed}>
      <Media
        grad={d.gradient}
        src={project.cover?.src}
        alt={project.cover?.alt ?? project.title}
        ratio="16/9"
        sizes="(min-width: 1200px) 60vw, 100vw"
      />
    </div>
  );
}
