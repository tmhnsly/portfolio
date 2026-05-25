import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { createElement } from 'react';
import { useInView } from './useInView';

// A controllable IntersectionObserver: capture the callback so a test can fire it.
let lastCb: IntersectionObserverCallback | null = null;
const observe = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  lastCb = null;
  observe.mockClear();
  disconnect.mockClear();
  class IO {
    constructor(cb: IntersectionObserverCallback) {
      lastCb = cb;
    }
    observe = observe;
    disconnect = disconnect;
    unobserve = () => {};
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  vi.stubGlobal('IntersectionObserver', IO);
});
afterEach(() => vi.unstubAllGlobals());

// Render the hook and surface each render's `inView` into `states`.
function probe(states: boolean[]) {
  function Probe() {
    const { ref, inView } = useInView();
    states.push(inView);
    return createElement('div', { ref });
  }
  return render(createElement(Probe));
}

const fire = (isIntersecting: boolean) =>
  act(() =>
    lastCb?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver),
  );

describe('useInView', () => {
  it('starts false and observes the element once', () => {
    const states: boolean[] = [];
    probe(states);
    expect(states[0]).toBe(false);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('reflects intersection: true on enter, false on leave', () => {
    const states: boolean[] = [];
    probe(states);
    fire(true);
    expect(states.at(-1)).toBe(true);
    fire(false);
    expect(states.at(-1)).toBe(false);
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = probe([]);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
