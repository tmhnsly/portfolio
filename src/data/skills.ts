import { z } from 'zod';
import { skillGroupSchema } from '@/lib/schemas';

export const SKILLS = z.array(skillGroupSchema).parse([
  {
    discipline: 'code',
    tools: ['React', 'TypeScript', 'Next.js', 'Three.js', 'React Three Fiber', 'WebGL', 'GLSL', 'Node.js', 'Sanity', 'Storybook', 'Tailwind', 'Vite', 'Godot', 'React Native', 'Expo'],
  },
  {
    discipline: 'music',
    tools: ['Logic Pro X', 'Ableton Live', 'Tape (TASCAM 388)', 'Modular synthesis', 'Field recording'],
  },
  {
    discipline: 'sound',
    tools: ['Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer', 'Field recording'],
  },
  {
    discipline: 'photo',
    tools: ['35mm (Leica M6, Mamiya 7)', 'Digital (Fuji X-T5)', 'Lightroom', 'Negative Lab Pro', 'Portra 400', 'HP5+'],
  },
  {
    discipline: 'video',
    tools: ['Final Cut Pro X', 'DaVinci Resolve', 'Premiere', 'RED', 'BMPCC 6K'],
  },
  {
    discipline: 'blog',
    tools: ['Long-form writing', 'Sanity', 'Markdown'],
  },
]);
