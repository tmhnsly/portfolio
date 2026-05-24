'use client';
import { createContext, useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from './theme-script';

export type Theme = 'light' | 'dark';
export interface ThemeContextValue { theme: Theme; toggle: () => void; }
export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    // Sync React state to the theme the pre-paint script already applied to <html>
    // (read-after-hydration is intentional here, hence the rule exception).
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'light';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(next);
      try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
