import type { Discipline } from '@/types';
import type { TagLabel } from '@/lib/tags';

// Curated per-discipline tool list (discipline cards + About "what I work with").
// Every entry is a registry tag (TagLabel), so TS catches typos.
export const toolsByDiscipline: Record<Discipline, TagLabel[]> = {
  code:  ['React', 'TypeScript', 'Next.js', 'Node.js', 'SCSS', 'Tailwind', 'Sanity', 'Storybook', 'Vercel', 'Figma', 'REST APIs', 'PHP', 'MySQL', 'MongoDB'],
  music: ['Logic Pro X', 'Ableton Live', 'TASCAM 388', 'Modular synthesis', 'Field recording', 'Guitar', 'Bass Guitar', 'Keyboard'],
  sound: ['Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer', 'Field recording'],
  photo: ['35mm', 'Leica M6', 'Mamiya 7', 'Fuji X-T5', 'Lightroom', 'Negative Lab Pro', 'Portra 400', 'HP5+'],
  video: ['Final Cut Pro X', 'Lumix G7', 'iPhone 16 Pro', 'iPhone 6S', 'Filmic Pro', 'ToonSquid'],
  blog:  ['Long-form writing', 'Sanity', 'Markdown'],
};
