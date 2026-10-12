import { ArrowRight, Bell, Bookmark, Users } from 'lucide-react';
import Button from '../common/Button.jsx';
import { categories } from '../../data/categories.js';

const perks = [
  { icon: Bookmark, text: 'Save stories, characters and merch to one place' },
  { icon: Bell, text: 'Get alerts for releases and events you care about' },
  { icon: Users, text: 'Join the conversation with fans worldwide' },
];

export default function CommunityCTA() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
        <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex -space-x-1" aria-hidden="true">
                {categories.map((c) => <span key={c.slug} className="h-3.5 w-3.5 rounded-full ring-2 ring-brand" style={{ background: c.color }} />)}
              </span>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">The FandomVerse community</p>
            </div>
            <h2 className="mt-3 max-w-xl text-[32px] font-bold leading-[1.08] sm:text-5xl">Your fandoms deserve a home.</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/80">Create a free account to follow universes, build your watchlist and never miss a drop.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/signup" variant="light" size="lg" iconRight={ArrowRight}>Create free account</Button>
              <Button to="/about" variant="outlineLight" size="lg">Learn more</Button>
            </div>
          </div>
          <ul className="space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-[15px]">
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
