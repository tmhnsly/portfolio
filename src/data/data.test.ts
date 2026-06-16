import { describe, it, expect } from 'vitest';
import { SITE, TIMELINE, COMPANIES } from './index';
import { decodeEmail } from '@/lib/email';
describe('data constants', () => {
  it('site + timeline loaded and valid', () => {
    expect(SITE.name).toBe('Tom Hinsley');
    expect(TIMELINE.length).toBeGreaterThan(0);
  });
  it('email decodes correctly (kept encoded, off the HTML/bundle)', () => {
    expect(decodeEmail()).toBe('hello@tomhinsley.com');
  });
  it('every timeline companyUrl comes from COMPANIES (no raw/typo links)', () => {
    const known = new Set<string>(Object.values(COMPANIES).map((c) => c.url));
    for (const entry of TIMELINE) {
      if (entry.companyUrl) {
        expect(known.has(entry.companyUrl), `${entry.id} links to a URL not in COMPANIES: ${entry.companyUrl}`).toBe(true);
      }
    }
  });
});
