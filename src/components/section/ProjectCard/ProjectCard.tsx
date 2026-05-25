import Link from 'next/link';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { formatMonthYear } from '@/lib/format';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const d = DISCIPLINES[project.discipline];
  return (
    <Link href={`/${project.discipline}/${project.slug}`} className={styles.card}>
      <Media grad={d.gradient} src={project.cover?.src} alt={project.cover?.alt ?? project.title}
        ratio="4/3" sizes={IMG_SIZES.grid3} className={styles.media}>
        <span className={styles.hatch} aria-hidden />
        {index != null && <span className={styles.number} aria-hidden>{String(index + 1).padStart(2, '0')}</span>}
        <span className={styles.pillTL}><Pill label={d.label} tone="solid" /></span>
      </Media>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.date}>{formatMonthYear(project.date)}</span>
        </div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <div className={styles.chips}>{project.tech.map((t) => <TechChip key={t} label={t} />)}</div>
      </div>
    </Link>
  );
}
