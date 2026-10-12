import { useMemo, useState } from 'react';
import { ArrowUpDown, DollarSign, Layers, PackageSearch, Shapes } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import Select from '../components/common/Select.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Button from '../components/common/Button.jsx';
import ShowcaseNotice from '../components/cart/ShowcaseNotice.jsx';
import { products, productTypes } from '../data/products.js';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

const prices = [
  { value: 'all', label: 'Any price' },
  { value: '0-30', label: 'Under $30' },
  { value: '30-50', label: '$30 – $50' },
  { value: '50-999', label: '$50 and up' },
];
const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'low', label: 'Price Low–High' },
  { value: 'high', label: 'Price High–Low' },
];

export default function Shop() {
  usePageTitle('Shop');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('featured');

  const list = useMemo(() => {
    const [min, max] = price === 'all' ? [0, Infinity] : price.split('-').map(Number);
    const out = products.filter((p) => (category === 'all' || p.category === category) && (type === 'all' || p.productType === type) && p.price >= min && p.price < max);
    if (sort === 'low') out.sort((a, b) => a.price - b.price);
    if (sort === 'high') out.sort((a, b) => b.price - a.price);
    return out;
  }, [category, type, price, sort]);

  const reset = () => { setCategory('all'); setType('all'); setPrice('all'); setSort('featured'); };

  return (
    <PageContainer>
      <PageHeader eyebrow="Shop" title="Official merch" description="Apparel, collectibles, prints and music from every universe." />
      <ShowcaseNotice className="mb-8 max-w-xl" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Select label="Category" icon={Layers} value={category} onChange={setCategory} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]} />
        <Select label="Product type" icon={Shapes} value={type} onChange={setType} options={[{ value: 'all', label: 'All products' }, ...productTypes.map((t) => ({ value: t, label: t }))]} />
        <Select label="Price" icon={DollarSign} value={price} onChange={setPrice} options={prices} />
        <Select label="Sort" icon={ArrowUpDown} value={sort} onChange={setSort} options={sorts} />
      </div>
      <p className="mb-6 mt-8 border-t border-line pt-6 text-sm text-ink-2" aria-live="polite"><span className="font-semibold text-ink">{list.length}</span> products</p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      ) : (
        <EmptyState icon={PackageSearch} title="No products match" description="Try widening the price range or choosing another category.">
          <Button variant="secondary" onClick={reset}>Clear filters</Button>
        </EmptyState>
      )}
    </PageContainer>
  );
}
