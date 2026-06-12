import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProjectThumb } from './ProjectThumb';
import { DISCIPLINES } from '@/lib/disciplines';
import { projectFrontmatterSchema } from '@/lib/schemas';
import type { Discipline, Project } from '@/types';

// A project with no bespoke registry thumb and no media → falls through to the
// discipline gradient, so the <Media> grad layer carries it.
const project = (discipline: Discipline): Project => ({
  ...projectFrontmatterSchema.parse({ title: 'Untitled', discipline, date: '2015-02-01', media: [] }),
  slug: 'thumb-gradient-resolution', body: '',
});

describe('ProjectThumb', () => {
  // The gradient is no longer threaded in by callers — the thumb resolves it from
  // the project's OWN discipline. Two disciplines prove it's derived, not fixed.
  it.each(['audio', 'video'] as Discipline[])(
    'falls back to the %s discipline gradient resolved from the project',
    (d) => {
      const { container } = render(<ProjectThumb project={project(d)} />);
      const grad = container.querySelector('[style*="gradient"]');
      expect(grad?.getAttribute('style')).toContain(DISCIPLINES[d].gradient);
    },
  );
});
