import { notFound } from 'next/navigation';
import { getPost } from '@/lib/content';
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { postHead } from '@/lib/page-head';

export { generateStaticParams } from './page';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Writing · Tom Hinsley';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return ogImage(postHead(post).og);
}
