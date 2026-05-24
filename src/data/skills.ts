import { z } from 'zod';
import { skillGroupSchema } from '@/lib/schemas';
import { DISCIPLINE_ORDER } from '@/lib/disciplines';
import { toolsByDiscipline } from './tools';

export const SKILLS = z.array(skillGroupSchema).parse(
  DISCIPLINE_ORDER.map((discipline) => ({ discipline, tools: toolsByDiscipline[discipline] }))
);
