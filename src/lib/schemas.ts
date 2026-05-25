import { z } from 'zod';

export const disciplineSchema = z.enum(['code', 'music', 'sound', 'photo', 'video', 'blog']);
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
const galleryFrame = imageRef.extend({ caption: z.string() });

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  desc: z.string().optional(),
  discipline: disciplineSchema,
  date: z.string(),               // ISO yyyy-mm-dd
  tech: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  role: z.string().optional(),
  year: z.number().optional(),
  status: z.string().optional(),
  repo: z.string().optional(),
  liveUrl: z.string().optional(),
  cover: imageRef.optional(),
  gallery: z.array(galleryFrame).default([]),
  tags: z.array(z.string()).optional(),
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
  tags: z.array(z.string()).default([]),
  cover: imageRef.optional(),
});
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type BlogPost = PostFrontmatter & { slug: string; body: string; readingTime: number; author: Author };

export const timelineEntrySchema = z.object({
  id: z.string(), period: z.string(), role: z.string(), place: z.string(),
  description: z.string(), tags: z.array(z.string()), accent: z.string(),
  companyUrl: z.string().optional(), // links the company name in `place` (see data/companies.ts)
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
