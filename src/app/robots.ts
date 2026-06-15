import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';

// Major AI crawlers / assistant fetchers, listed explicitly so the intent is
// unambiguous: this site WANTS to be read by AI (a hiring manager pasting the
// URL into ChatGPT/Claude/Perplexity should get the real content back). The
// `*` rule below already permits them; the named list just documents intent and
// guards against a default-deny ever creeping in. Covers OpenAI, Anthropic,
// Google (Gemini), Perplexity, Apple, Common Crawl, Amazon, Meta, Cohere.
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
