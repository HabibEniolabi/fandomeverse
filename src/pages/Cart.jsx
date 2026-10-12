import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import ShowcaseNotice from '../components/cart/ShowcaseNotice.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice, products } from '../data/products.js';
import usePageTitle from './usePageTitle.js';

export default function Cart() {
  usePageTitle('Cart');
  const { lines, count, subtotal, shipping, total, clearCart } = useCart();
  const suggestions = products.filter((p) => !lines.some((l) => l.slug === p.slug)).slice(0, 4);

  return (
    <PageContainer>
      <PageHeader eyebrow="Cart" title="Your cart" />
      {lines.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Your cart is empty" description="Add some merch from your favourite universes — it’s all for show, so go wild.">
          <Button to="/shop">Browse the shop</Button>
        </EmptyState>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <p className="text-ink-2"><span className="font-semibold text-ink">{count}</span> {count === 1 ? 'item' : 'items'}</p>
              <button type="button" onClick={clearCart} className="text-sm font-semibold text-ink-2 hover:text-[#D93F3F]">Clear cart</button>
            </div>
            <ul className="divide-y divide-line">{lines.map((l) => <CartItem key={l.slug} line={l} />)}</ul>
            <Button to="/shop" variant="ghost" icon={ArrowLeft} className="mt-4 -ml-4">Continue shopping</Button>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="text-xl font-bold">Order summary</h2>
              <dl className="mt-5 space-y-3 text-[15px]">
                <div className="flex justify-between"><dt className="text-ink-2">Items</dt><dd className="font-medium tabular-nums">{count}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-2">Subtotal</dt><dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-2">Shipping</dt><dd className="font-medium tabular-nums">{shipping ? formatPrice(shipping) : 'Free'}</dd></div>
                <div className="flex justify-between border-t border-line pt-4 text-lg"><dt className="font-semibold">Total</dt><dd className="font-display font-bold tabular-nums">{formatPrice(total)}</dd></div>
              </dl>
              {shipping > 0 && <p className="mt-3 text-[13px] text-muted">Add {formatPrice(75 - subtotal)} more for free shipping.</p>}
              <ShowcaseNotice className="mt-5" />
              <Button size="lg" icon={Lock} className="mt-5 w-full" disabled aria-describedby="checkout-note">Checkout unavailable</Button>
              <p id="checkout-note" className="mt-2 text-center text-[13px] text-muted">Checkout is disabled in this showcase.</p>
            </div>
          </aside>
        </div>
      )}
      {suggestions.length > 0 && (
        <section className="mt-20">
          <SectionHeader title="Fans also picked" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">{suggestions.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </section>
      )}
    </PageContainer>
  );
}
