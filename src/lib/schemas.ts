import { z } from 'zod';
import { TAGS } from './tags';

export const disciplineSchema = z.enum(['code', 'audio', 'video', 'blog']);
export type Discipline = z.infer<typeof disciplineSchema>;

// Static map shape (not parsed from content — implemented by a later disciplines map).
export interface DisciplineMeta {
  slug: Discipline; label: string;
  color: string;     // step-9 solid (pill/nav/bloom fill) — a CSS var, theme-aware
  ink: string;       // step-11 — the legible coloured-text version (periods, links)
  onAccent: string;  // text colour on the step-9 fill (white, or dark for light hues)
  gradient: string;
  swatches: [string, string, string]; route: string;
}

const imageRef = z.object({ src: z.string().optional(), grad: z.string().optional(), alt: z.string().optional() });

const mediaImage = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string().optional(),
  title: z.string().optional(),
});
const mediaYouTube = z.object({
  type: z.literal('youtube'),
  id: z.string(),
  list: z.string().optional(), // optional playlist id — embeds the whole series, starting at `id`
  poster: z.string().optional(),
  alt: z.string().optional(),
  title: z.string().optional(),
});
const mediaItem = z.discriminatedUnion('type', [mediaImage, mediaYouTube]);
export type MediaItem = z.infer<typeof mediaItem>;

const TAG_SET = new Set<string>(TAGS);
const tagSchema = z.string().superRefine((t, ctx) => {
  if (!TAG_SET.has(t)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: `"${t}" is not a registered tag — add it to src/lib/tags.ts` });
  }
});

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  desc: z.string().optional(),
  discipline: disciplineSchema,
  date: z.string(),               // ISO yyyy-mm-dd
  tags: z.array(tagSchema).default([]),
  featured: z.boolean().default(false),
  role: z.string().optional(),
  year: z.number().optional(),
  status: z.string().optional(),
  repo: z.string().optional(),
  liveUrl: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  media: z.array(mediaItem).default([]),
});
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type Project = ProjectFrontmatter & { slug: string; body: string }; // body = markdown

export const authorSchema = z.object({ name: z.string(), role: z.string(), bio: z.string() });
export type Author = z.infer<typeof authorSchema>;

export const postFrontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  category: z.string(),
  readingTime: z.number().optional(), // computed from word count if absent
  tags: z.array(tagSchema).default([]),
  cover: imageRef.optional(),
});
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type BlogPost = PostFrontmatter & { slug: string; body: string; readingTime: number; author: Author };

export const timelineEntrySchema = z.object({
  id: z.string(), period: z.string(), role: z.string(), place: z.string(),
  description: z.string(), tags: z.array(z.string()),
  discipline: disciplineSchema,      // drives the dot + card accent (theme-aware Radix hue)
  companyUrl: z.string().optional(), // when set, the whole card becomes a link to the company
  monogram: z.string().optional(),   // logo-tile initials, shown when there's no `logo` image
  logo: z.string().optional(),       // /images/about/logos/<file> — a real logo drops in here later
  logoFilled: z.boolean().optional(),// logo is a full-bleed square avatar — round its corners (don't clip wordmarks)
});
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

export const skillGroupSchema = z.object({ discipline: disciplineSchema, tools: z.array(z.string()) });
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const siteConfigSchema = z.object({
  // contact email is NOT in site config — it's encoded in src/lib/email.ts
  name: z.string(), role: z.string(), location: z.string(),
  experienceSince: z.string(), // ISO month/date — "years of experience" is computed from this
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
});
export type SiteConfig = z.infer<typeof siteConfigSchema>;
