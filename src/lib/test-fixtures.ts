/**
 * Test fixtures — schema-valid Project / BlogPost objects for unit tests. A test
 * over a pure function (JSON-LD, presentation, page-head) builds its own input from
 * here instead of reaching into live content by slug, which couples the test to a
 * Markdown file that can be renamed or deleted. Override only the fields under test;
 * the rest get sane, valid defaults — the canonical "Wake" project and "Hello World"
 * post the presentation/page-head tests already used inline.
 */
import { postFrontmatterSchema, projectFrontmatterSchema, type BlogPost, type Project } from './schemas';

export function makeProject(overrides: Partial<Project> = {}): Project {
  const { slug, body, ...frontmatter } = overrides;
  return {
    ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'audio', date: '2015-02-01', ...frontmatter }),
    slug: slug ?? 'wake',
    body: body ?? '',
  };
}

export function makePost(overrides: Partial<BlogPost> = {}): BlogPost {
  const { slug, body, readingTime, author, ...frontmatter } = overrides;
  return {
    ...postFrontmatterSchema.parse({
      title: 'Hello World', excerpt: 'A short hello.', date: '2026-06-04', category: 'Opinion', ...frontmatter,
    }),
    slug: slug ?? 'hello-world',
    body: body ?? '',
    readingTime: readingTime ?? 6,
    author: author ?? { name: 'Tom Hinsley', role: 'Frontend developer', bio: '' },
  };
}
