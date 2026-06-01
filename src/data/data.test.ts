import { describe, it, expect } from 'vitest';
import { SITE, TIMELINE } from './index';
import { getSkills } from './skills';
import { decodeEmail } from '@/lib/email';
describe('data constants', () => {
  it('site + timeline + skills loaded and valid', () => {
    expect(SITE.name).toBe('Tom Hinsley');
    expect(TIMELINE.length).toBeGreaterThan(0);
    const skills = getSkills();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.every((g) => g.tools.length > 0)).toBe(true);
  });
  it('email decodes correctly (kept encoded, off the HTML/bundle)', () => {
    expect(decodeEmail()).toBe('hello@tomhinsley.com');
  });
});
