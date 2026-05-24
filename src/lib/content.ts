import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projectFrontmatterSchema, postFrontmatterSchema } from './schemas';
import type { Project, BlogPost, Author } from './schemas';

const ROOT = path.join(process.cwd(), 'content');
const AUTHOR: Author = {
  name: 'Tom Hinsley',
  role: 'A digital creative in London',
  bio: 'A digital creative in London. Mostly writes about code, sometimes about everything else.',
};
const WORDS_PER_MIN = 220;
const estimateReading = (body: string) => Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MIN));

function read(sub: string, file: string) {
  const raw = fs.readFileSync(path.join(ROOT, sub, file), 'utf8');
  return { slug: file.replace(/\.md$/, ''), ...matter(raw) };
}
function listMd(sub: string) {
  return fs.readdirSync(path.join(ROOT, sub)).filter((f) => f.endsWith('.md'));
}

export function getAllProjects(): Project[] {
  return listMd('projects')
    .map((file) => {
      const { slug, data, content } = read('projects', file);
      return { ...projectFrontmatterSchema.parse(data), slug, body: content };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
export function getAllPosts(): BlogPost[] {
  return listMd('blog')
    .map((file) => {
      const { slug, data, content } = read('blog', file);
      const fm = postFrontmatterSchema.parse(data);
      return { ...fm, slug, body: content, readingTime: fm.readingTime ?? estimateReading(content), author: AUTHOR };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
