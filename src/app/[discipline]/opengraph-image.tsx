import { notFound } from 'next/navigation';
import { isDiscipline, DISCIPLINES } from '@/lib/disciplines';
import { ogImage, ogAccent, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export { generateStaticParams } from './page';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Tom Hinsley';

export default async function Image({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params;
  if (!isDiscipline(discipline)) notFound();
  return ogImage({ eyebrow: 'Tom Hinsley', title: DISCIPLINES[discipline].label, accent: ogAccent(discipline) });
}
