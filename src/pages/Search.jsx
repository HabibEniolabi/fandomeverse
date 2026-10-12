import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flame, SearchX } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import SearchInput from '../components/common/SearchInput.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { ResultRow } from '../components/search/SearchOverlay.jsx';
import { groupResults, searchAll, trendingSearches } from '../data/index.js';
import usePageTitle from './usePageTitle.js';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  usePageTitle(q ? `Search: ${q}` : 'Search');
  const groups = useMemo(() => groupResults(searchAll(q)), [q]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const setQ = (v) => setParams(v ? { q: v } : {}, { replace: true });

  return (
    <PageContainer>
      <PageHeader eyebrow="Search" title={q ? <>Results for “{q}”</> : 'Search FandomVerse'} />
      <SearchInput size="lg" value={q} onChange={setQ} onClear={() => setQ('')} kbd="⌘ K" autoFocus />
      {!q ? (
        <div className="mt-10">
          <h2 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Trending searches</h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s.split(' ')[0])} className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium hover:border-ink/25">
                <Flame className="h-4 w-4 text-movies" aria-hidden="true" />{s}
              </button>
            ))}
          </div>
        </div>
      ) : total === 0 ? (
        <div className="mt-10"><EmptyState icon={SearchX} title="No results" description="Try a character, series or universe — like “Aiko”, “Skyfall” or “Manga”." /></div>
      ) : (
        <>
          <p className="mt-6 text-sm text-ink-2" aria-live="polite"><span className="font-semibold text-ink">{total}</span> results in {groups.length} groups</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {groups.map((g) => (
              <section key={g.key} className="card p-4 sm:p-5">
                <h2 className="mb-2 px-2 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{g.label} <span className="font-normal">({g.items.length})</span></h2>
                {g.items.map((item) => <ResultRow key={item.id} item={item} />)}
              </section>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
