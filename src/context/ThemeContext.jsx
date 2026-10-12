import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'fv-theme';

/** A `?theme=dark|light` URL param forces a theme without persisting it (used by /showcase frames). */
function getForcedTheme() {
  if (typeof window === 'undefined') return null;
  const t = new URLSearchParams(window.location.search).get('theme');
  return t === 'dark' || t === 'light' ? t : null;
}

function getInitialTheme() {
  const forced = getForcedTheme();
  if (forced) return forced;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [forced] = useState(getForcedTheme);
  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply the class to <html> and keep browser UI colour in sync.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#10121B' : '#F7F4ED');
  }, [theme]);

  // Sync across tabs and across /showcase iframes (same origin).
  useEffect(() => {
    if (forced) return undefined;
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) setThemeState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [forced]);

  const setTheme = useCallback(
    (next) => {
      const root = document.documentElement;
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 320);
      setThemeState(next);
      if (!forced) {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      }
    },
    [forced]
  );

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme, isForced: Boolean(forced) }), [theme, toggleTheme, setTheme, forced]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
