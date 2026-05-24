import { describe, it, expect } from 'vitest';
import { SITE, TIMELINE, SKILLS } from './index';
describe('data constants', () => {
  it('site + timeline + skills loaded and valid', () => {
    expect(SITE.email).toBe('hello@tomhinsley.com');
    expect(TIMELINE.length).toBeGreaterThan(0);
    expect(SKILLS.length).toBe(6);
  });
});
