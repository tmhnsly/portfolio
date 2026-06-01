import type { SkillGroup } from '@/lib/schemas';
import { DISCIPLINE_ORDER } from '@/lib/disciplines';
import { topTagsByDiscipline } from '@/lib/content';

/** About "what I work with" — derived from real project/post tags, most-used first,
    skipping disciplines with no content yet. Lazy (function, not a const) so the
    filesystem read never runs in a client bundle that imports `@/data`. */
export function getSkills(): SkillGroup[] {
  return DISCIPLINE_ORDER
    .map((discipline) => ({ discipline, tools: topTagsByDiscipline(discipline) }))
    .filter((g) => g.tools.length > 0);
}
