import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

/** Global UI state: search overlay, cart drawer, chatbot, mobile menu and toasts. */
export function UIProvider({ children }) {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(params?.get('cart') === 'open');
  const [chatOpen, setChatOpen] = useState(params?.get('chat') === 'open');
  const [menuOpen, setMenuOpen] = useState(params?.get('menu') === 'open');
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const notify = useCallback((message) => {
    setToast({ message, key: Date.now() });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  // ⌘K / Ctrl+K opens global search from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({
      searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
      cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
      chatOpen, setChatOpen,
      menuOpen, setMenuOpen,
      toast, notify,
    }),
    [searchOpen, cartOpen, chatOpen, menuOpen, toast, notify]
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
