import '@testing-library/jest-dom/vitest';

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
if (!('IntersectionObserver' in window)) {
  class IO { observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } root=null; rootMargin=''; thresholds=[]; }
  // @ts-expect-error test stub
  window.IntersectionObserver = IO;
}
