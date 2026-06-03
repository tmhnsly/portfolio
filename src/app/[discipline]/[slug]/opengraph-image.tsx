import { notFound } from 'next/navigation';
import { getProject } from '@/lib/content';
import { DISCIPLINES } from '@/lib/disciplines';
import { ogImage, ogAccent, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export { generateStaticParams } from './page';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Project — Tom Hinsley';

export default async function Image({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProject(slug);
  if (!project || project.discipline !== discipline) notFound();
  return ogImage({ eyebrow: DISCIPLINES[project.discipline].label, title: project.title, accent: ogAccent(project.discipline) });
}
