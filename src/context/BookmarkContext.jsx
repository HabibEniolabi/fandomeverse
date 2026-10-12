import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const BookmarkContext = createContext(null);
const STORAGE_KEY = 'fv-bookmarks';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Bookmark shape: { id: 'article:slug', kind: 'article'|'character'|'media'|'event'|'product', slug, title, category, addedAt }
 */
export function BookmarkProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setItems(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isBookmarked = useCallback((id) => items.some((b) => b.id === id), [items]);

  const toggleBookmark = useCallback((item) => {
    setItems((prev) =>
      prev.some((b) => b.id === item.id) ? prev.filter((b) => b.id !== item.id) : [{ ...item, addedAt: Date.now() }, ...prev]
    );
  }, []);

  const removeBookmark = useCallback((id) => setItems((prev) => prev.filter((b) => b.id !== id)), []);
  const clearBookmarks = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ bookmarks: items, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks, count: items.length }),
    [items, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks]
  );
  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
}
