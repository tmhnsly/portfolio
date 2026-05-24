import type { Discipline } from '@/types';

// Single source of truth for each discipline's tools.
// Seeded from the richest existing list (previously in skills.ts).
export const toolsByDiscipline: Record<Discipline, string[]> = {
  code:  ['React', 'TypeScript', 'Next.js', 'Three.js', 'React Three Fiber', 'WebGL', 'GLSL', 'Node.js', 'Sanity', 'Storybook', 'Tailwind', 'Vite', 'Godot', 'React Native', 'Expo'],
  music: ['Logic Pro X', 'Ableton Live', 'Tape (TASCAM 388)', 'Modular synthesis', 'Field recording'],
  sound: ['Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer', 'Field recording'],
  photo: ['35mm (Leica M6, Mamiya 7)', 'Digital (Fuji X-T5)', 'Lightroom', 'Negative Lab Pro', 'Portra 400', 'HP5+'],
  video: ['Final Cut Pro X', 'DaVinci Resolve', 'Premiere', 'RED', 'BMPCC 6K'],
  blog:  ['Long-form writing', 'Sanity', 'Markdown'],
};
