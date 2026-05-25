import { describe, it, expect } from 'vitest';
import { resolveZone, disciplineFromPath, zoneAccent } from './zone';
import { DISCIPLINES } from './disciplines';

describe('zone', () => {
  it('resolves a discipline route to its accent tokens', () => {
    const z = resolveZone('/code');
    expect(z.discipline).toBe('code');
    expect(z.active).toBe('code');
    expect(z.accent).toBe(DISCIPLINES.code.color);
    expect(z.accentInk).toBe(DISCIPLINES.code.ink);
    expect(z.onAccent).toBe(DISCIPLINES.code.onAccent);
  });

  it('resolves a project leaf to the same discipline zone', () => {
    expect(resolveZone('/video/walks').discipline).toBe('video');
    expect(resolveZone('/video/walks').accent).toBe(DISCIPLINES.video.color);
  });

  it('About is the default (tomato) zone, with a nav highlight', () => {
    const z = resolveZone('/about');
    expect(z.discipline).toBeUndefined();
    expect(z.active).toBe('about');
    expect(z.accent).toBe('var(--tomato-9)');
    expect(z.onAccent).toBe('var(--white-a12)');
  });

  it('home is the default zone with no nav highlight', () => {
    const z = resolveZone('/');
    expect(z.discipline).toBeUndefined();
    expect(z.active).toBeUndefined();
    expect(z.accent).toBe('var(--tomato-9)');
  });

  it('disciplineFromPath narrows only real disciplines', () => {
    expect(disciplineFromPath('/photo/lisbon')).toBe('photo');
    expect(disciplineFromPath('/about')).toBeUndefined();
    expect(disciplineFromPath('/')).toBeUndefined();
  });

  it('zoneAccent defaults to tomato when no discipline', () => {
    expect(zoneAccent(undefined).accent).toBe('var(--tomato-9)');
    expect(zoneAccent('music').accent).toBe(DISCIPLINES.music.color);
  });
});
