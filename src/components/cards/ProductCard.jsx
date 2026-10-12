import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useUI } from '../../context/UIContext.jsx';
import { formatPrice } from '../../data/products.js';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { notify } = useUI();
  const href = `/shop/${product.slug}`;
  return (
    <article className="group relative flex h-full flex-col">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <Media seed={product.slug} category={product.category} variant="product" productType={product.art} ratio="aspect-square" label={product.name}>
          {product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#17171F] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{product.badge}</span>}
        </Media>
      </Link>
      <BookmarkButton item={{ kind: 'product', slug: product.slug, title: product.name, category: product.category }} className="absolute right-3 top-3" />
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between gap-2">
          <Badge category={product.category} tone="plain" />
          <span className="inline-flex items-center gap-1 text-[13px] text-ink-2"><Star className="h-3.5 w-3.5 fill-[#E5A900] text-[#E5A900]" aria-hidden="true" />{product.rating}</span>
        </div>
        <h3 className="mt-1.5 text-[16px] font-semibold leading-snug text-ink transition group-hover:text-brand">
          <Link to={href}>{product.name}</Link>
        </h3>
        <p className="text-[13px] text-muted">{product.productType}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-display text-lg font-bold">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => { addItem(product.slug); notify(`${product.name} added to cart`); }}
            className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 text-sm sm:px-4 font-semibold text-ink transition hover:border-brand hover:bg-brand hover:text-white active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
