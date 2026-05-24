import type { Discipline } from '@/types';

// Single source of truth for each discipline's tools.
// Seeded from the richest existing list (previously in skills.ts).
export const toolsByDiscipline: Record<Discipline, string[]> = {
  code:  ['React', 'TypeScript', 'Next.js', 'Node.js', 'SCSS', 'Tailwind', 'Sanity', 'Storybook', 'Vercel', 'Figma', 'REST APIs', 'PHP', 'MySQL', 'MongoDB'],
  music: ['Logic Pro X', 'Ableton Live', 'Tape (TASCAM 388)', 'Modular synthesis', 'Field recording'],
  sound: ['Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer', 'Field recording'],
  photo: ['35mm (Leica M6, Mamiya 7)', 'Digital (Fuji X-T5)', 'Lightroom', 'Negative Lab Pro', 'Portra 400', 'HP5+'],
  video: ['Final Cut Pro X', 'DaVinci Resolve', 'Premiere', 'RED', 'BMPCC 6K'],
  blog:  ['Long-form writing', 'Sanity', 'Markdown'],
};

// tag → discipline, so TechChip can colour-code tools by the discipline they belong to.
// Built from toolsByDiscipline (first-wins) + aliases for project tags that differ.
const techMap: Record<string, Discipline> = (() => {
  const m: Record<string, Discipline> = {};
  (Object.keys(toolsByDiscipline) as Discipline[]).forEach((d) => {
    for (const t of toolsByDiscipline[d]) {
      const k = t.toLowerCase();
      if (!(k in m)) m[k] = d;
    }
  });
  Object.assign(m, {
    ableton: 'music', davinci: 'video', 'leica m6': 'photo',
    pwa: 'code', charts: 'code', 'open source': 'code', 'orchestration api': 'code', accessibility: 'code',
  } satisfies Record<string, Discipline>);
  return m;
})();

/** The discipline a tool/tech belongs to (for colour-coding), or null if unknown. */
export function disciplineForTech(tag: string): Discipline | null {
  return techMap[tag.trim().toLowerCase()] ?? null;
}
