'use client';
import { useState } from 'react';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Media } from '@/components/ui/Media';
import { coverImage } from '@/lib/project-presentation';
import { MediaCarousel } from '@/components/project/MediaCarousel';
import { YouTubeEmbed } from '@/components/project/YouTubeEmbed';
import { BiPlay } from 'react-icons/bi';
import styles from './MediaHero.module.scss';

const ACTIVE_PADS = new Set([0, 4, 6, 10, 11, 13]);

export function MediaHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];
  const [open, setOpen] = useState(false);

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

  if (project.media.length === 0) {
    return (
      <div className={styles.embed}>
        <Media grad={d.gradient} alt={project.title} ratio="16/9" sizes={IMG_SIZES.full} />
      </div>
    );
  }

  // A lone video plays inline in the hero (scroll-and-watch); no pop-out carousel.
  if (project.media.length === 1 && project.media[0].type === 'youtube') {
    const v = project.media[0];
    return (
      <div className={styles.embed}>
        <YouTubeEmbed id={v.id} list={v.list} poster={v.poster} title={v.title} grad={d.gradient} />
      </div>
    );
  }

  const cover = coverImage(project);
  const isVideo = project.media[0].type === 'youtube';
  const count = project.media.length;

  return (
    <div className={styles.embed}>
      <button type="button" className={styles.poster} onClick={() => setOpen(true)} aria-label={isVideo ? 'Play video' : 'View media'}>
        <Media grad={d.gradient} src={cover.src} alt={cover.alt} ratio="16/9" sizes={IMG_SIZES.full} priority>
          {isVideo && <span className={styles.play} aria-hidden><BiPlay /></span>}
          {count > 1 && <span className={styles.badge} aria-hidden>1 / {count}</span>}
        </Media>
      </button>
      {open && <MediaCarousel items={project.media} startIndex={0} gradient={d.gradient} onClose={() => setOpen(false)} />}
    </div>
  );
}
