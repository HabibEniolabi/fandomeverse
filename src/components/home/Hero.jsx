import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Play, Sparkles } from 'lucide-react';
import Button from '../common/Button.jsx';
import Artwork from '../art/Artwork.jsx';
import { categories } from '../../data/categories.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Hero() {
  return (
    <section className="container-page pb-14 pt-8 sm:pt-12 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-2">
            <span className="h-2 w-2 rounded-full bg-anime" aria-hidden="true" />
            Anime <span className="text-muted" aria-hidden="true">•</span> Featured
          </span>
          <h1 className="mt-6 text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[68px] xl:text-[72px]">
            Where fandoms
            <br />
            <span className="text-brand">come together.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Discover stories, characters, trailers, events, releases and collectibles across seven fandom universes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/articles/neon-ronin-the-sword-that-remembers" size="lg" iconRight={ArrowRight}>Explore Story</Button>
            <Button to="/media?play=neon-ronin-season-trailer" size="lg" variant="secondary" icon={Play}>Watch Trailer</Button>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2" aria-hidden="true">
              {categories.slice(0, 5).map((c) => (
                <span key={c.slug} className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-bg">
                  <Artwork seed={`fan-${c.slug}`} category={c.slug} variant="portrait" label="" />
                </span>
              ))}
            </div>
            <p className="text-sm leading-snug text-ink-2">
              <span className="font-semibold text-ink">1.2M fans</span> exploring
              <br className="sm:hidden" /> seven universes this week
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:80ms]">
          <Link to="/articles/neon-ronin-the-sword-that-remembers" className="group relative block overflow-hidden rounded-[28px] shadow-lift" aria-label="Featured story: Neon Ronin">
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/4.4]">
              <div className="img-zoom h-full w-full">
                <Artwork seed="neon-ronin-hero-v2" category="anime" figure label="Neon Ronin key art — a lone swordswoman on a rooftop at dusk" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/80">Featured Story</p>
              <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Neon Ronin</h2>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-[14px] font-medium text-white/85">
                <span>Article</span><span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />8 min read</span><span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-anime" aria-hidden="true" />Anime</span>
              </p>
            </div>
            <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#17171F] transition group-hover:rotate-[-45deg]">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </Link>
          <TrendingChip />
        </div>
      </div>
    </section>
  );
}

function TrendingChip() {
  const { setChatOpen } = useUI();
  return (
    <button
      type="button"
      onClick={() => setChatOpen(true)}
      className="absolute -left-6 top-10 hidden items-center gap-3 rounded-2xl border border-line bg-elevated p-3 pr-5 text-left shadow-lift transition hover:-translate-y-0.5 xl:flex"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
      <span>
        <span className="block text-[13px] font-semibold text-ink">Not sure where to start?</span>
        <span className="block text-[12px] text-ink-2">Ask the Fandom Assistant</span>
      </span>
    </button>
  );
}
