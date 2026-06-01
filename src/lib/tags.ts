/**
 * Canonical tag vocabulary — the single source of truth for every tag/tool label
 * used on projects, posts, and the discipline cards. A frontmatter `tags` value
 * must be one of these (enforced in schemas.ts), so spelling lives in one place.
 * Add new tags here. Leaf module: no imports (so schemas.ts can use it freely).
 */
export const TAGS = [
  // code
  'React', 'TypeScript', 'Next.js', 'Node.js', 'SCSS', 'Tailwind', 'Sanity', 'Storybook', 'Vercel', 'Figma', 'REST APIs', 'PHP', 'MySQL', 'MongoDB',
  // music
  'Logic Pro X', 'Ableton Live', 'TASCAM 388', 'Modular synthesis', 'Field recording', 'Guitar', 'Bass Guitar', 'Keyboard',
  // sound
  'Pro Tools', 'Reaper', 'iZotope RX', 'Soundminer',
  // photo
  '35mm', 'Leica M6', 'Mamiya 7', 'Fuji X-T5', 'Lightroom', 'Negative Lab Pro', 'Portra 400', 'HP5+',
  // video
  'Final Cut Pro X', 'Lumix G7', 'iPhone 16 Pro', 'iPhone 6S', 'Filmic Pro', 'ToonSquid', 'iPad Pro', 'GarageBand',
  // writing
  'Long-form writing', 'Markdown',
  // cross-cutting project + topic tags (not curated discipline tools)
  'Open source', 'PWA', 'Orchestration API', 'Accessibility', 'Charts',
  'Process', 'Studio log', 'Reading', 'Books', 'Workflow', 'Tools', 'Code', 'Music', 'Sound', 'Photography', 'CMS', 'CSS',
] as const;

export type TagLabel = (typeof TAGS)[number];
