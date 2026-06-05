import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { resolveTheme, applyTheme, THEME_SCRIPT, THEME_STORAGE_KEY } from './theme-script';

describe('resolveTheme', () => {
  it('honours a stored choice over the OS preference', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });
  it('falls back to the OS preference when nothing is stored', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
  it('ignores a garbage stored value', () => {
    expect(resolveTheme('chartreuse', true)).toBe('dark');
  });
});

describe('applyTheme', () => {
  it('sets data-theme and swaps to a single matching class', () => {
    const el = document.createElement('html');
    el.classList.add('light');
    applyTheme(el, 'dark');
    expect(el.getAttribute('data-theme')).toBe('dark');
    expect(el.classList.contains('dark')).toBe(true);
    expect(el.classList.contains('light')).toBe(false);
  });
});

describe('THEME_SCRIPT (built from resolveTheme + applyTheme)', () => {
  const root = document.documentElement;
  const realMatchMedia = window.matchMedia;
  const run = () => new Function(THEME_SCRIPT)();
  const stubPrefersDark = (matches: boolean) => {
    window.matchMedia = ((q: string) => ({ matches, media: q })) as unknown as typeof window.matchMedia;
  };

  beforeEach(() => {
    root.removeAttribute('data-theme');
    root.classList.remove('light', 'dark');
    localStorage.clear();
  });
  afterEach(() => { window.matchMedia = realMatchMedia; });

  it('applies the stored theme with no flash', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    stubPrefersDark(false);
    run();
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.classList.contains('dark')).toBe(true);
  });

  it('falls back to the OS preference, matching resolveTheme + applyTheme', () => {
    stubPrefersDark(true);
    run();
    const expected = resolveTheme(null, true);
    expect(root.getAttribute('data-theme')).toBe(expected);
    expect(root.classList.contains(expected)).toBe(true);
  });
});
