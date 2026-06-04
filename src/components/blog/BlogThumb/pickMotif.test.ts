import { describe, it, expect } from 'vitest';
import { pickMotif } from './pickMotif';

describe('pickMotif', () => {
  it('pins audio from a sound tag', () => {
    expect(pickMotif({ category: 'Sound', tags: ['Field recording', 'Sound'] })).toBe('audio');
  });
  it('pins reading from a books tag', () => {
    expect(pickMotif({ category: 'Reading', tags: ['Reading', 'Books'] })).toBe('reading');
  });
  it('pins writing from a long-form tag', () => {
    expect(pickMotif({ category: 'Essay', tags: ['Long-form writing', 'Markdown'] })).toBe('writing');
  });
  it('pins process from a workflow tag', () => {
    expect(pickMotif({ category: 'Workflow', tags: ['Workflow', 'Tools'] })).toBe('process');
  });

  it('lets code win over process when both are tagged', () => {
    expect(pickMotif({ category: 'Studio log', tags: ['Process', 'Code', 'Next.js', 'Workflow'] })).toBe('code');
  });

  it('falls back to the category word when tags pin nothing', () => {
    expect(pickMotif({ category: 'Sound design', tags: [] })).toBe('audio');
    expect(pickMotif({ category: 'Reading list', tags: [] })).toBe('reading');
  });

  it('falls back to feed when nothing matches', () => {
    expect(pickMotif({ category: 'Announcements', tags: [] })).toBe('feed');
  });

  it('lets an explicit thumb override win over the heuristic', () => {
    expect(pickMotif({ category: 'Opinion', tags: ['CSS'], thumb: 'motion' })).toBe('motion');
    expect(pickMotif({ category: 'Opinion', tags: ['AI'], thumb: 'datacenter' })).toBe('datacenter');
  });

  it('ignores an invalid thumb and falls back to the heuristic', () => {
    expect(pickMotif({ category: 'Opinion', tags: ['CSS'], thumb: 'nope' })).toBe('code');
  });
});
