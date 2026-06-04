/**
 * Pick an animated thumbnail motif for a post that ships no cover image, from its
 * category + tags. Pure + data-only (no React) so the choice is unit-testable and
 * the same post always draws the same motif. Add a post about sound → it gets the
 * waveform; about books → the stack; about code → the editor; and so on. Anything
 * unrecognised falls back to the brand feed mark.
 */
export type MotifKey = 'code' | 'audio' | 'writing' | 'reading' | 'process' | 'feed';

// Tags that pin a motif. Checked in the PRECEDENCE order below, so a dev log tagged
// both Code and Process draws the editor (code wins over process).
const TAGS: Record<Exclude<MotifKey, 'feed'>, readonly string[]> = {
  audio: ['Music', 'Sound', 'Custom SFX', 'Logic Pro X', 'Ableton Live', 'Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer', 'Field recording', 'Modular synthesis', 'Guitar', 'Bass Guitar', 'Keyboard', 'GarageBand'],
  reading: ['Reading', 'Books'],
  code: ['Code', 'CSS', 'SCSS', 'Next.js', 'TypeScript', 'React', 'Node.js', 'Tailwind', 'PWA', 'REST APIs', 'Storybook', 'Vercel', 'Sanity', 'Figma', 'PHP', 'MySQL', 'MongoDB', 'Orchestration API', 'Accessibility', 'Charts'],
  process: ['Workflow', 'Tools', 'Process'],
  writing: ['Long-form writing', 'Markdown'],
};

// Category-word fallback when the tags don't pin anything (categories are free text).
const CATEGORY: Record<Exclude<MotifKey, 'feed'>, RegExp> = {
  audio: /sound|audio|music|score|sonic|mix/i,
  reading: /read|book|library|shelf/i,
  code: /dev|code|build|engineering|studio log|technical/i,
  process: /process|workflow|tools|method|habit/i,
  writing: /essay|note|writing|words|letter/i,
};

const PRECEDENCE: Exclude<MotifKey, 'feed'>[] = ['audio', 'reading', 'code', 'process', 'writing'];

export function pickMotif({ category, tags }: { category: string; tags: readonly string[] }): MotifKey {
  const set = new Set(tags);
  for (const key of PRECEDENCE) {
    if (TAGS[key].some((t) => set.has(t))) return key;
  }
  for (const key of PRECEDENCE) {
    if (CATEGORY[key].test(category)) return key;
  }
  return 'feed';
}
