import SectionHeader from '../common/SectionHeader.jsx';
import ProductCard from '../cards/ProductCard.jsx';
import { products } from '../../data/products.js';

export default function Merchandise() {
  return (
    <section className="border-y border-line bg-surface-2/50 py-14 md:py-20" aria-labelledby="merch-heading">
      <div className="container-page">
        <SectionHeader eyebrow="Official merch" title={<span id="merch-heading">Collect your fandom</span>} description="Apparel, figures, prints and light sticks from your favourite universes." action="Visit the shop" actionTo="/shop" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
          {products.slice(0, 5).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}
