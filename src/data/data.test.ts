import { describe, it, expect } from 'vitest';
import { SITE, TIMELINE, SKILLS } from './index';
import { decodeEmail } from '@/lib/email';
describe('data constants', () => {
  it('site + timeline + skills loaded and valid', () => {
    expect(SITE.name).toBe('Tom Hinsley');
    expect(TIMELINE.length).toBeGreaterThan(0);
    expect(SKILLS.length).toBe(6);
  });
  it('email decodes correctly (kept encoded, off the HTML/bundle)', () => {
    expect(decodeEmail()).toBe('hello@tomhinsley.com');
  });
});
