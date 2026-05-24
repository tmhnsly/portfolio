import { tomato, indigo, iris, brown, cyan, grass } from '@radix-ui/colors';
import type { Discipline, DisciplineMeta } from '@/types';

export const DISCIPLINES: Record<Discipline, DisciplineMeta> = {
  code:  { slug: 'code',  label: 'Code',  color: tomato.tomato9, gradient: `linear-gradient(135deg, ${tomato.tomato8}, ${tomato.tomato12})`, swatches: [tomato.tomato6, tomato.tomato9, tomato.tomato12], route: '/code' },
  music: { slug: 'music', label: 'Music', color: indigo.indigo9, gradient: `linear-gradient(135deg, ${indigo.indigo8}, ${indigo.indigo12})`, swatches: [indigo.indigo6, indigo.indigo9, indigo.indigo12], route: '/music' },
  sound: { slug: 'sound', label: 'Sound', color: iris.iris9,     gradient: `linear-gradient(135deg, ${iris.iris8}, ${iris.iris12})`,         swatches: [iris.iris6, iris.iris9, iris.iris12],         route: '/sound' },
  photo: { slug: 'photo', label: 'Photo', color: brown.brown9,   gradient: `linear-gradient(135deg, ${brown.brown8}, ${brown.brown12})`,     swatches: [brown.brown6, brown.brown9, brown.brown12],   route: '/photo' },
  video: { slug: 'video', label: 'Video', color: cyan.cyan9,     gradient: `linear-gradient(135deg, ${cyan.cyan8}, ${cyan.cyan12})`,         swatches: [cyan.cyan6, cyan.cyan9, cyan.cyan12],         route: '/video' },
  blog:  { slug: 'blog',  label: 'Blog',  color: grass.grass9,   gradient: `linear-gradient(135deg, ${grass.grass8}, ${grass.grass12})`,     swatches: [grass.grass6, grass.grass9, grass.grass12],   route: '/blog' },
};

export const DISCIPLINE_ORDER: Discipline[] = ['code', 'music', 'sound', 'photo', 'video', 'blog'];
export const isDiscipline = (s: string): s is Discipline => Object.prototype.hasOwnProperty.call(DISCIPLINES, s);
