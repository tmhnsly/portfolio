import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useZoneMorph } from './useZoneMorph';

const RED = { accent: 'red', accentInk: 'darkred' };
const TEAL = { accent: 'teal', accentInk: 'darkteal' };

describe('useZoneMorph', () => {
  it('starts settled: from = to = current, mix = 1', () => {
    const { result } = renderHook(() => useZoneMorph(RED, false));
    expect(result.current.from).toEqual(RED);
    expect(result.current.to).toEqual(RED);
    expect(result.current.mix.get()).toBe(1);
  });

  it('on a Zone change the old colour becomes `from` (no flash) and the new becomes `to`', () => {
    const { result, rerender } = renderHook(({ c }) => useZoneMorph(c, false), {
      initialProps: { c: RED },
    });
    rerender({ c: TEAL });
    expect(result.current.from).toEqual(RED); // the next paint still shows the old colour
    expect(result.current.to).toEqual(TEAL);
  });

  it('reduced motion jumps straight to the target (mix stays 1)', () => {
    const { result, rerender } = renderHook(({ c }) => useZoneMorph(c, true), {
      initialProps: { c: RED },
    });
    rerender({ c: TEAL });
    expect(result.current.to).toEqual(TEAL);
    expect(result.current.mix.get()).toBe(1);
  });

  it('a re-render with an equal Zone (new object, same values) does not re-morph', () => {
    const { result, rerender } = renderHook(({ c }) => useZoneMorph(c, false), {
      initialProps: { c: RED },
    });
    rerender({ c: { ...RED } });
    expect(result.current.from).toEqual(RED);
    expect(result.current.to).toEqual(RED);
  });
});
