import type { ComponentType } from 'react';
import type { Project } from '@/types';
import { BoucleHero } from './BoucleHero';

/**
 * Slug → bespoke Media hero. A project listed here renders its own hero in place
 * of the standard poster + Media carousel path (see MediaHero); anything not
 * listed takes the normal path. Indexed directly (like the project-thumbs
 * registry) rather than via an accessor, which the react-hooks lint reads as
 * "creating a component during render".
 */
export const CUSTOM_HEROES: Record<string, ComponentType<{ project: Project }>> = {
  boucle: BoucleHero,
};
