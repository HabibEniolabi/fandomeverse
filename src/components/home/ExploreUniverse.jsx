import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader.jsx';
import CategoryCard from '../cards/CategoryCard.jsx';
import { categories } from '../../data/categories.js';

export default function ExploreUniverse() {
  return (
    <section className="container-page py-14 md:py-20" aria-labelledby="explore-heading">
      <SectionHeader eyebrow="Seven universes" title={<span id="explore-heading">Explore your universe</span>} description="Pick a universe to dive into its stories, characters, trailers, events and collectibles." action="Discover all" actionTo="/discover" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
        {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        <Link to="/discover" className="card group flex flex-col justify-between border-transparent !bg-brand p-5 text-white transition hover:-translate-y-[3px] hover:!bg-brand-hover sm:p-6">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] opacity-75">Can’t choose?</span>
          <span className="mt-6 font-display text-xl font-bold leading-snug">Discover across every fandom at once →</span>
        </Link>
      </div>
    </section>
  );
}
