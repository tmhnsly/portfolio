import type { ComponentType } from 'react';
import type { Project } from '@/types';
import { BoucleHero } from './BoucleHero';

/**
 * Slug → bespoke Media hero. A project listed here renders its own hero in place
 * of the standard poster + Media carousel path (see MediaHero); anything not
 * listed takes the normal path. Mirrors the project-thumbs registry.
 */
const CUSTOM_HEROES: Record<string, ComponentType<{ project: Project }>> = {
  boucle: BoucleHero,
};

export const customHero = (slug: string): ComponentType<{ project: Project }> | undefined =>
  CUSTOM_HEROES[slug];
