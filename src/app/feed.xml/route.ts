import { getAllPosts } from '@/lib/content';
import { postHref } from '@/lib/routes';
import { absUrl as at } from '@/lib/site-url';
import { COPY } from '@/data';

// Static at build — regenerated when posts change.
export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** /feed.xml — RSS 2.0 for the blog, a standard discovery surface (readers + some AI crawlers). */
export function GET() {
  const items = getAllPosts()
    .map((p) => {
      const url = esc(at(postHref(p.slug)));
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${esc(new Date(p.date).toUTCString())}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tom Hinsley — Blog</title>
    <link>${at('/blog')}</link>
    <atom:link href="${at('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>${esc(COPY.blog.heroIntro)}</description>
    <language>en-GB</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
