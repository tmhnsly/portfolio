import Link from 'next/link';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { coverImage } from '@/lib/project-presentation';
import { formatMonthYear } from '@/lib/format';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project, hideDiscipline = false }: { project: Project; hideDiscipline?: boolean }) {
  const d = DISCIPLINES[project.discipline];
  const cover = coverImage(project);
  return (
    <Link href={`/${project.discipline}/${project.slug}`} className={styles.card}>
      <Media grad={d.gradient} src={cover.src} alt={cover.alt}
        ratio="4/3" sizes={IMG_SIZES.grid3} className={styles.media}>
        {!cover.src && <span className={styles.hatch} aria-hidden />}
        {!hideDiscipline && <span className={styles.pillTL}><Pill label={d.label} tone="solid" /></span>}
        <LinkArrow className={styles.arrow} />
      </Media>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.date}>{formatMonthYear(project.date)}</span>
        </div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <div className={styles.chips}>{project.tags.map((t) => <TechChip key={t} label={t} />)}</div>
      </div>
    </Link>
  );
}
