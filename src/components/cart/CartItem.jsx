import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Artwork from '../art/Artwork.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../data/products.js';
import { getCategory } from '../../data/categories.js';

export function QtyStepper({ value, onChange, size = 'md' }) {
  const h = size === 'sm' ? 'h-9' : 'h-11';
  const w = size === 'sm' ? 'w-9' : 'w-11';
  return (
    <div className={`inline-flex ${h} items-center rounded-full border border-line bg-surface`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Decrease quantity" className={`flex ${h} ${w} items-center justify-center rounded-full text-ink-2 hover:text-ink`}>
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity" disabled={value >= 10} className={`flex ${h} ${w} items-center justify-center rounded-full text-ink-2 hover:text-ink disabled:opacity-40`}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function CartItem({ line, compact = false }) {
  const { updateQty, removeItem } = useCart();
  const { product, qty } = line;
  const cat = getCategory(product.category);
  return (
    <li className="flex gap-4 py-4">
      <Link to={`/shop/${product.slug}`} className={`${compact ? 'h-20 w-20' : 'h-24 w-24 sm:h-28 sm:w-28'} shrink-0 overflow-hidden rounded-xl bg-surface-2`}>
        <Artwork seed={product.slug} category={product.category} variant="product" productType={product.art} label={product.name} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: cat.color }}>{cat.name}</p>
            <Link to={`/shop/${product.slug}`} className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink hover:text-brand">{product.name}</Link>
            {!compact && <p className="text-[13px] text-muted">{product.productType} · {formatPrice(product.price)} each</p>}
          </div>
          <p className="font-display text-[15px] font-bold tabular-nums">{formatPrice(product.price * qty)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QtyStepper value={qty} onChange={(v) => updateQty(product.slug, v)} size="sm" />
          <button type="button" onClick={() => removeItem(product.slug)} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-ink-2 hover:bg-surface-2 hover:text-[#D93F3F]" aria-label={`Remove ${product.name}`}>
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove
          </button>
        </div>
      </div>
    </li>
  );
}
