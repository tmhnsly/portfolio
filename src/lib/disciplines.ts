import type { Discipline, DisciplineMeta } from '@/types';

export const DISCIPLINES: Record<Discipline, DisciplineMeta> = {
  code:  { slug: 'code',  label: 'Code',  color: '#e54d2e', gradient: 'linear-gradient(135deg, #ec8e7b, #5c271f)', swatches: ['#fdbdaf', '#e54d2e', '#5c271f'], route: '/code' },
  music: { slug: 'music', label: 'Music', color: '#3e63dd', gradient: 'linear-gradient(135deg, #5072e4, #1f2d5c)', swatches: ['#7d96e8', '#3e63dd', '#1f2d5c'], route: '/music' },
  sound: { slug: 'sound', label: 'Sound', color: '#5b5bd6', gradient: 'linear-gradient(135deg, #6e6ade, #2a2570)', swatches: ['#9b8cf2', '#5b5bd6', '#2f265f'], route: '/sound' },
  photo: { slug: 'photo', label: 'Photo', color: '#ad7f58', gradient: 'linear-gradient(135deg, #c8a17a, #4a3526)', swatches: ['#d6b48a', '#ad7f58', '#4a3526'], route: '/photo' },
  video: { slug: 'video', label: 'Video', color: '#00a2c7', gradient: 'linear-gradient(135deg, #4cb9d4, #0a3344)', swatches: ['#7fd3e5', '#00a2c7', '#0a3344'], route: '/video' },
  blog:  { slug: 'blog',  label: 'Blog',  color: '#46a758', gradient: 'linear-gradient(135deg, #5db66b, #1c3f23)', swatches: ['#94d4a0', '#46a758', '#1c3f23'], route: '/blog' },
};

export const DISCIPLINE_ORDER: Discipline[] = ['code', 'music', 'sound', 'photo', 'video', 'blog'];
export const isDiscipline = (s: string): s is Discipline => Object.prototype.hasOwnProperty.call(DISCIPLINES, s);
