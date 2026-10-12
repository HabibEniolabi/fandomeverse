import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'fv-cart';

function load() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter((i) => products.some((p) => p.slug === i.slug)) : [];
  } catch {
    return [];
  }
}

/** Temporary, showcase-only cart. Kept for the browser session. No payments are processed. */
export function CartProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback((slug, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) return prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
      return [...prev, { slug, qty }];
    });
  }, []);

  const updateQty = useCallback((slug, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 10) } : i))));
  }, []);

  const removeItem = useCallback((slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo(
    () => items.map((i) => ({ ...i, product: products.find((p) => p.slug === i.slug) })).filter((l) => l.product),
    [items]
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  const shipping = subtotal > 0 && subtotal < 75 ? 6 : 0;
  const total = subtotal + shipping;

  const value = useMemo(
    () => ({ lines, count, subtotal, shipping, total, addItem, updateQty, removeItem, clearCart }),
    [lines, count, subtotal, shipping, total, addItem, updateQty, removeItem, clearCart]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
