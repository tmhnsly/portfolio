import { notFound } from 'next/navigation';
import { getPost } from '@/lib/content';
import { ogImage, ogAccent, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export { generateStaticParams } from './page';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Writing — Tom Hinsley';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return ogImage({ eyebrow: post.category, title: post.title, accent: ogAccent('blog') });
}
