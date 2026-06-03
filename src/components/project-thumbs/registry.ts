import type { ComponentType } from 'react';
import { ChorkThumb } from './ChorkThumb';
import { AgileThumb } from './AgileThumb';
import { FTThumb } from './FTThumb';
import { MandyThumb } from './MandyThumb';
import { ClaysThumb } from './ClaysThumb';
import { EarntThumb } from './EarntThumb';
import { ArmstrongThumb } from './ArmstrongThumb';
import { TooledUpThumb } from './TooledUpThumb';
import { TVBlandThumb } from './TVBlandThumb';

/**
 * Slug → bespoke card thumbnail. A project listed here renders its own vector
 * vignette as the card cover (see ProjectThumb); anything not listed falls back
 * to its cover image, or the discipline gradient when it has no media.
 */
export const PROJECT_THUMBS: Record<string, ComponentType> = {
  chork: ChorkThumb,
  'agile-energy-dashboard': AgileThumb,
  'ft-branded-content': FTThumb,
  'mandy-dennis-art': MandyThumb,
  'clays-booking-flow': ClaysThumb,
  earnt: EarntThumb,
  armstrong: ArmstrongThumb,
  'tooled-up-education': TooledUpThumb,
  'tv-bland': TVBlandThumb,
};

export const hasProjectThumb = (slug: string): boolean => slug in PROJECT_THUMBS;
