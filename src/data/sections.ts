import type { Discipline } from '@/types';

export const SECTIONS: Record<Discipline, { intro: string; tools: string[] }> = {
  code: {
    intro: 'Production frontend, generative builds and the occasional creative experiment. Things I make on the web.',
    tools: ['React', 'TypeScript', 'Next.js', 'Three.js', 'R3F', 'WebGL', 'GLSL', 'Tailwind', 'Sanity', 'Node.js', 'React Native', 'Godot', 'GDScript'],
  },
  music: {
    intro: 'Ambient recordings, tape experiments and the occasional synthesiser piece.',
    tools: ['Logic Pro X', 'Ableton Live', 'Tape (TASCAM 388)', 'Modular synthesis'],
  },
  sound: {
    intro: 'Field recordings, SFX libraries, and sound for screen.',
    tools: ['Pro Tools', 'Reaper', 'iZotope RX', 'Field recording'],
  },
  photo: {
    intro: 'Mostly 35mm. Mostly not trying too hard.',
    tools: ['35mm (Leica M6, Mamiya 7)', 'Portra 400', 'HP5+', 'Lightroom'],
  },
  video: {
    intro: 'Short films, experiments and things that needed to move.',
    tools: ['Final Cut Pro X', 'DaVinci Resolve', 'RED', 'BMPCC 6K'],
  },
  blog: {
    intro: 'Notes, essays and dev logs. Mostly about whatever I\'m currently chewing on — usually code, sometimes sound, occasionally a book.',
    tools: ['Long-form writing', 'Sanity', 'Markdown'],
  },
};
