import type { Metadata } from 'next';
import type { BlogPost, Discipline, Project } from '@/types';
import { SECTIONS } from '@/data';
import { DISCIPLINES } from './disciplines';
import { pageMeta } from './metadata';
import { ogAccent, type Palette } from './og-palette';
import { postPresentation } from './post-presentation';
import { projectPresentation } from './project-presentation';
import { projectDescription } from './structured-data';

/**
 * The "head" of a content route, resolved in one place: the <head> metadata
 * (title / description / canonical + Open Graph text) AND the Open Graph card
 * params (eyebrow / title / accent) for one content subject.
 *
 * Each dynamic route presents itself to crawlers from two entry points — the
 * page's `generateMetadata` and its `opengraph-image` — that otherwise each
 * re-derive the title, discipline label and description independently and can
 * drift (the project route used to omit the article `publishedTime` the blog
 * route set). Threading both projections through one `*Head` function keeps them
 * in lockstep and makes "how does this content present itself?" a pure table test
 * instead of a Next render. It builds on the existing seams (`pageMeta`,
 * `projectPresentation`/`postPresentation`, `projectDescription`, `ogAccent`),
 * so the route files shrink to `xHead(subject).meta` / `ogImage(xHead(subject).og)`.
 */
export interface OgCardParams {
  eyebrow: string;
  title: string;
  accent: Palette;
}
export interface PageHead {
  meta: Metadata;
  og: OgCardParams;
}

export function projectHead(project: Project): PageHead {
  const { href, label } = projectPresentation(project);
  return {
    meta: pageMeta({
      title: project.title,
      description: projectDescription(project),
      path: href,
      type: 'article',
      publishedTime: project.date,
    }),
    og: { eyebrow: label, title: project.title, accent: ogAccent(project.discipline) },
  };
}

export function postHead(post: BlogPost): PageHead {
  const { href, category } = postPresentation(post);
  return {
    meta: pageMeta({
      title: post.title,
      description: post.excerpt,
      path: href,
      type: 'article',
      publishedTime: post.date,
    }),
    og: { eyebrow: category, title: post.title, accent: ogAccent('blog') },
  };
}

export function disciplineHead(discipline: Discipline): PageHead {
  const { label, route } = DISCIPLINES[discipline];
  return {
    meta: pageMeta({ title: label, description: SECTIONS[discipline].intro, path: route }),
    og: { eyebrow: 'Tom Hinsley', title: label, accent: ogAccent(discipline) },
  };
}
