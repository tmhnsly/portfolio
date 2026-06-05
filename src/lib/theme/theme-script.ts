/**
 * Theme core — the single source of how a theme is resolved and applied. Both the
 * client ThemeProvider and the pre-paint inline script build on these, so the
 * storage key, the resolve rule, and the `data-theme` + class application can't
 * drift apart. resolveTheme/applyTheme are self-contained (params only, no module
 * references) precisely so they can be serialised into THEME_SCRIPT below.
 */
export const THEME_STORAGE_KEY = 'th-theme';

export type Theme = 'light' | 'dark';

/** The theme to use given the stored choice (if any) and the OS preference. */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  return stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light';
}

/** Apply a theme to the document root: the `data-theme` attribute plus a single
    matching class (one of light/dark), so CSS can key off either. */
export function applyTheme(root: HTMLElement, theme: Theme): void {
  root.setAttribute('data-theme', theme);
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

/**
 * The blocking <script> injected before paint (see app/layout.tsx) to set the
 * theme with no flash. Built FROM resolveTheme + applyTheme so it stays in lockstep
 * with the provider — change the rule once here and both follow. The wrapping
 * try/catch swallows storage/matchMedia errors (private mode, old engines).
 */
export const THEME_SCRIPT =
  `(function(){try{` +
  `var t=(${resolveTheme})(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}),` +
  `window.matchMedia('(prefers-color-scheme: dark)').matches);` +
  `(${applyTheme})(document.documentElement,t);` +
  `}catch(e){}})();`;
