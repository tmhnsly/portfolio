import { getAllProjects, getAllPosts } from '@/lib/content';
import { projectHref, postHref } from '@/lib/routes';
import { absUrl as at } from '@/lib/site-url';
import { SITE, COPY } from '@/data';

// Static at build — the brief only changes when content does.
export const dynamic = 'force-static';

/**
 * /llms.txt — a concise markdown brief for LLM crawlers (ChatGPT, Claude,
 * Perplexity), generated from SITE + content so it never drifts from the site.
 */
export function GET() {
  const lines = [
    '# Tom Hinsley',
    '',
    `> ${COPY.meta.summary}`,
    '',
    '- Location: London, UK',
    '- Open to: permanent roles and freelance or contract work (remote or on-site)',
    '- Specialism: frontend — React, Next.js, TypeScript; full-stack capable',
    '- Also works in: audio and video',
    `- About / hire: ${at('/about')}`,
    `- CV: ${at('/tom-hinsley-cv.pdf')}`,
    '',
    '## Selected work',
    ...getAllProjects().map((p) => `- [${p.title}](${at(projectHref(p.discipline, p.slug))})${p.desc ? ` — ${p.desc}` : ''}`),
    '',
    '## Writing',
    ...getAllPosts().map((p) => `- [${p.title}](${at(postHref(p.slug))}) — ${p.excerpt}`),
    '',
    '## Links',
    ...SITE.socials.map((s) => `- ${s.label}: ${s.href}`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
