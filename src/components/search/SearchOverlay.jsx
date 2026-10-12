import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Flame, Search, X, Newspaper, Users, PlayCircle, CalendarDays, ShoppingBag } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';
import { categories } from '../../data/categories.js';
import { groupResults, recentSearches, searchAll, trendingSearches, kindLabel } from '../../data/index.js';
import CategoryChip from '../common/CategoryChip.jsx';
import Artwork from '../art/Artwork.jsx';
import Badge from '../common/Badge.jsx';

const groupIcons = { articles: Newspaper, characters: Users, media: PlayCircle, events: CalendarDays, merch: ShoppingBag };

export function ResultRow({ item, onSelect }) {
  const variant = item.kind === 'character' ? 'portrait' : item.kind === 'product' ? 'product' : 'scene';
  return (
    <Link to={item.href} onClick={onSelect} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface-2 focus-visible:bg-surface-2">
      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        <Artwork seed={item.slug} category={item.category} variant={variant} productType={item.raw?.art} label="" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-1 text-[15px] font-medium text-ink">{item.title}</span>
        <span className="mt-0.5 flex items-center gap-2 text-[13px] text-muted">
          <Badge category={item.category} tone="plain" className="!text-[11px]" />
          <span>{kindLabel[item.kind]} · {item.meta}</span>
        </span>
      </span>
      <ArrowRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
    </Link>
  );
}

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) return undefined;
    setQuery('');
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && closeSearch();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [searchOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const groups = useMemo(() => groupResults(searchAll(query)), [query]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  if (!searchOpen) return null;

  const go = (q) => {
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-3 sm:px-6 sm:pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search FandomVerse">
      <button type="button" tabIndex={-1} aria-label="Close search" onClick={closeSearch} className="animate-fade-in absolute inset-0 bg-[#0B0C12]/55 backdrop-blur-[2px]" />
      <div className="animate-fade-up relative flex max-h-[calc(100vh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift sm:max-h-[75vh]">
        <form
          onSubmit={(e) => { e.preventDefault(); if (query.trim()) go(query); }}
          className="flex items-center gap-3 border-b border-line px-4 sm:px-5"
        >
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across FandomVerse..."
            aria-label="Search across FandomVerse"
            className="h-16 flex-1 bg-transparent text-[17px] text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="hidden rounded-md border border-line bg-surface-2 px-2 py-1 font-sans text-xs text-ink-2 sm:inline">⌘ K</kbd>
          <button type="button" onClick={closeSearch} aria-label="Close search" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2">
            <X className="h-5 w-5" />
          </button>
        </form>

        <div className="overflow-y-auto p-4 sm:p-5">
          {!query.trim() ? (
            <div className="space-y-7">
              <section>
                <h2 className="mb-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Recent searches</h2>
                <ul>
                  {recentSearches.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => setQuery(s)} className="flex h-11 w-full items-center gap-3 rounded-xl px-2 text-left text-[15px] text-ink hover:bg-surface-2">
                        <Clock className="h-4 w-4 text-muted" aria-hidden="true" /> {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Trending searches</h2>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s) => (
                    <button key={s} type="button" onClick={() => setQuery(s.split(' ')[0] === 'Skyfall' ? 'Skyfall' : s)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface-2 px-3.5 text-sm font-medium text-ink hover:bg-line/60">
                      <Flame className="h-3.5 w-3.5 text-movies" aria-hidden="true" /> {s}
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Suggested categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <CategoryChip key={c.slug} category={c.slug} onClick={() => { closeSearch(); navigate(`/category/${c.slug}`); }} />
                  ))}
                </div>
              </section>
            </div>
          ) : total === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg font-semibold">No results for “{query}”</p>
              <p className="mt-1 text-ink-2">Try a character, series or category — like “Aiko” or “K-Pop”.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groups.map((g) => {
                const Icon = groupIcons[g.key];
                return (
                  <section key={g.key}>
                    <h2 className="mb-1.5 flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {g.label} <span className="font-normal">({g.items.length})</span>
                    </h2>
                    <div>{g.items.slice(0, 4).map((item) => <ResultRow key={item.id} item={item} onSelect={closeSearch} />)}</div>
                  </section>
                );
              })}
              <button type="button" onClick={() => go(query)} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-surface-2 text-[15px] font-semibold text-ink hover:bg-line/60">
                View all {total} results <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
