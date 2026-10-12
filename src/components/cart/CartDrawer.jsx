import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../data/products.js';
import CartItem from './CartItem.jsx';
import Button from '../common/Button.jsx';
import ShowcaseNotice from './ShowcaseNotice.jsx';

export function CartPanel({ onClose, embedded = false }) {
  const { lines, count, subtotal } = useCart();
  return (
    <div className={`flex h-full flex-col bg-bg ${embedded ? 'rounded-2xl border border-line' : ''}`}>
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5">
        <h2 className="text-lg font-bold">Your cart <span className="font-sans text-base font-medium text-muted">({count})</span></h2>
        <button type="button" onClick={onClose} aria-label="Close cart" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2">
          <X className="h-5 w-5" />
        </button>
      </div>
      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand"><ShoppingBag className="h-6 w-6" /></span>
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-1 text-[15px] text-ink-2">Tees, figures, light sticks — find something for your shelf.</p>
          <Button to="/shop" className="mt-6" iconRight={ArrowRight} onClick={onClose}>Browse the shop</Button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            {lines.map((l) => <CartItem key={l.slug} line={l} compact />)}
          </ul>
          <div className="space-y-4 border-t border-line p-5">
            <div className="flex items-center justify-between text-[15px]">
              <span className="text-ink-2">Subtotal</span>
              <span className="font-display text-lg font-bold">{formatPrice(subtotal)}</span>
            </div>
            <ShowcaseNotice />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={onClose}>Keep browsing</Button>
              <Button to="/cart" onClick={onClose}>View cart</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { pathname } = useLocation();
  const ref = useRef(null);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) closeCart();
    lastPath.current = pathname;
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!cartOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [cartOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!cartOpen) return null;
  return (
    <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button type="button" tabIndex={-1} aria-label="Close cart" onClick={closeCart} className="animate-fade-in absolute inset-0 bg-[#0B0C12]/50" />
      <div ref={ref} className="animate-slide-in-right absolute inset-y-0 right-0 w-full max-w-[420px] shadow-lift">
        <CartPanel onClose={closeCart} />
      </div>
    </div>
  );
}
