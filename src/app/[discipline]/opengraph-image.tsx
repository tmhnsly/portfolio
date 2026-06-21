import { notFound } from 'next/navigation';
import { isDiscipline } from '@/lib/disciplines';
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { disciplineHead } from '@/lib/page-head';

export { generateStaticParams } from './page';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Tom Hinsley';

export default async function Image({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params;
  if (!isDiscipline(discipline)) notFound();
  return ogImage(disciplineHead(discipline).og);
}
