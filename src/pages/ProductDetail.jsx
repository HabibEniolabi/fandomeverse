import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, ShoppingCart, Star, Truck, RotateCcw } from 'lucide-react';
import { getProduct, products, formatPrice } from '../data/products.js';
import { getCategory } from '../data/categories.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import BookmarkButton from '../components/common/BookmarkButton.jsx';
import Artwork from '../components/art/Artwork.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import ShowcaseNotice from '../components/cart/ShowcaseNotice.jsx';
import { QtyStepper } from '../components/cart/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from './usePageTitle.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const { addItem } = useCart();
  const { notify, openCart } = useUI();
  usePageTitle(product?.name);
  if (!product) return <NotFound />;
  const cat = getCategory(product.category);
  const views = [
    { label: 'Product', props: { variant: 'product', productType: product.art, seed: product.slug } },
    { label: 'Artwork detail', props: { variant: 'scene', seed: `${product.slug}-detail` } },
    { label: 'Lifestyle', props: { variant: 'scene', seed: `${product.slug}-lifestyle`, figure: true } },
    { label: 'Character', props: { variant: 'portrait', seed: `${product.slug}-char` } },
  ];
  const related = [...products.filter((p) => p.slug !== slug && p.category === product.category), ...products.filter((p) => p.category !== product.category)].slice(0, 4);

  const add = () => {
    addItem(product.slug, qty);
    notify(`${qty} × ${product.name} added to cart`);
    openCart();
  };

  return (
    <>
      <div className="container-page py-8 md:py-12">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.name }]} />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex gap-3 sm:flex-col" role="tablist" aria-label="Product images">
              {views.map((v, i) => (
                <button key={v.label} type="button" role="tab" aria-selected={img === i} aria-label={v.label} onClick={() => setImg(i)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-20 ${img === i ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <Artwork category={product.category} label="" {...v.props} />
                </button>
              ))}
            </div>
            <div className="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-surface-2">
              <div key={img} className="animate-fade-in h-full w-full"><Artwork category={product.category} label={`${product.name} — ${views[img].label}`} {...views[img].props} /></div>
              {product.badge && <span className="absolute left-4 top-4 rounded-full bg-[#17171F] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{product.badge}</span>}
            </div>
          </div>

          <div>
            <Badge category={product.category} icon />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-ink-2">
              <span className="flex items-center gap-0.5" aria-label={`Rated ${product.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-4 w-4 ${n <= Math.round(product.rating) ? 'fill-[#E5A900] text-[#E5A900]' : 'text-line'}`} aria-hidden="true" />)}
              </span>
              <span>{product.rating} · 128 reviews</span>
              <span aria-hidden="true">·</span>
              <span>{product.productType}</span>
            </div>
            <p className="mt-6 font-display text-4xl font-bold">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-2">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, Math.min(10, v)))} />
              <Button size="lg" icon={ShoppingCart} onClick={add} className="flex-1 sm:flex-none">Add to Cart</Button>
              <BookmarkButton item={{ kind: 'product', slug: product.slug, title: product.name, category: product.category }} variant="outline" className="!h-[52px] !w-[52px]" />
            </div>
            <ShowcaseNotice className="mt-5 max-w-lg" />

            <ul className="mt-8 divide-y divide-line border-y border-line text-[15px]">
              {[
                { icon: Truck, t: 'Free shipping over $75', d: 'Demo only — nothing ships' },
                { icon: RotateCcw, t: '30-day returns', d: 'Hassle-free, in theory' },
                { icon: ShieldCheck, t: `Official ${cat.name} merch`, d: 'Licensed fictional franchise' },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-center gap-4 py-4">
                  <Icon className="h-5 w-5 text-ink-2" aria-hidden="true" />
                  <span><span className="block font-semibold">{t}</span><span className="text-sm text-muted">{d}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <section className="border-t border-line bg-surface-2/50 py-14">
        <div className="container-page">
          <SectionHeader title="You might also like" action="Shop all" actionTo="/shop" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </section>
    </>
  );
}
