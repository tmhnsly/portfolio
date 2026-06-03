import type { Metadata } from 'next';

/**
 * Per-page metadata with matching Open Graph fields + a canonical URL. The
 * og:image / twitter:image are supplied automatically by each route's
 * `opengraph-image.tsx`, so this only handles the text. `title` is wrapped by the
 * root template (`%s · Tom Hinsley`); the OG title is spelled out so unfurls read
 * well even where the template doesn't apply.
 */
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: `${title} · Tom Hinsley`,
      description,
      url: path,
      ...(publishedTime ? { publishedTime } : {}),
    } as Metadata['openGraph'],
  };
}
