'use client';
import { useState } from 'react';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Media } from '@/components/ui/Media';
import { ProjectThumb } from '@/components/project-thumbs';
import { CUSTOM_HEROES } from '@/components/project/custom-heroes';
import { coverImage } from '@/lib/project-presentation';
import { MediaCarousel } from '@/components/project/MediaCarousel';
import { YouTubeEmbed } from '@/components/project/YouTubeEmbed';
import { BiPlay } from 'react-icons/bi';
import styles from './MediaHero.module.scss';

export function MediaHero({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];
  const [open, setOpen] = useState(false);

  // A project may register a bespoke hero (e.g. Boucle's sequencer view) in place
  // of the standard poster/carousel path — see project/custom-heroes.
  const Custom = CUSTOM_HEROES[project.slug];
  if (Custom) {
    return (
      <div className={styles.embed}>
        <Custom project={project} />
      </div>
    );
  }

  if (project.media.length === 0) {
    return (
      <div className={styles.embed}>
        <ProjectThumb project={project} grad={d.gradient} ratio="16/9" sizes={IMG_SIZES.full} priority />
      </div>
    );
  }

  // A lone video plays inline in the hero (scroll-and-watch); no pop-out carousel.
  const first = project.media[0];
  if (project.media.length === 1 && first?.type === 'youtube') {
    return (
      <div className={styles.embed}>
        <YouTubeEmbed id={first.id} list={first.list} poster={first.poster} title={first.title} grad={d.gradient} />
      </div>
    );
  }

  const cover = coverImage(project);
  const isVideo = first?.type === 'youtube';
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
