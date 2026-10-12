import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown, SearchX } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import SearchInput from '../components/common/SearchInput.jsx';
import Tabs from '../components/common/Tabs.jsx';
import CategoryChip from '../components/common/CategoryChip.jsx';
import Select from '../components/common/Select.jsx';
import ContentCard from '../components/cards/ContentCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Button from '../components/common/Button.jsx';
import { allContent, contentTypes, kindLabel, searchAll } from '../data/index.js';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'az', label: 'A–Z' },
];

export default function Discover() {
  const [params, setParams] = useSearchParams();
  const type = params.get('type') || 'all';
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'featured';
  const q = params.get('q') || '';
  usePageTitle(type === 'article' ? 'Articles' : 'Discover');

  const update = (key, value, def) => {
    const next = new URLSearchParams(params);
    if (!value || value === def) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    let list = q.trim() ? searchAll(q) : allContent;
    if (type !== 'all') list = list.filter((i) => i.kind === type);
    if (category !== 'all') list = list.filter((i) => i.category === category);
    const sorted = [...list];
    if (sort === 'newest') sorted.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === 'az') sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'featured') sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return sorted;
  }, [q, type, category, sort]);

  const reset = () => setParams({}, { replace: true });

  return (
    <PageContainer>
      <PageHeader eyebrow="Discover" title={<>Discover your next <span className="text-brand">obsession</span></>} description="Search and filter every article, character, video, event, release and collectible across the FandomVerse." />
      <SearchInput size="lg" value={q} onChange={(v) => update('q', v, '')} onClear={() => update('q', '', '')} placeholder="Search stories, characters, trailers..." />

      <div className="mt-8 space-y-4">
        <Tabs tabs={contentTypes} value={type} onChange={(v) => update('type', v, 'all')} label="Content type" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Category filter">
            <CategoryChip label="All universes" active={category === 'all'} onClick={() => update('category', 'all', 'all')} />
            {categories.map((c) => (
              <CategoryChip key={c.slug} category={c.slug} active={category === c.slug} onClick={() => update('category', category === c.slug ? 'all' : c.slug, 'all')} />
            ))}
          </div>
          <Select label="Sort by" hideLabel icon={ArrowUpDown} value={sort} onChange={(v) => update('sort', v, 'featured')} options={sorts} className="w-full shrink-0 sm:w-48" />
        </div>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between border-t border-line pt-6">
        <p className="text-sm text-ink-2" aria-live="polite">
          <span className="font-semibold text-ink">{results.length}</span> results
          {q && <> for “{q}”</>}
        </p>
        {(q || type !== 'all' || category !== 'all' || sort !== 'featured') && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-brand hover:underline">Reset filters</button>
        )}
      </div>

      {results.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((item) => (
            <ContentCard key={item.id} item={item} type={kindLabel[item.kind]} info={item.meta} />
          ))}
        </div>
      ) : (
        <EmptyState icon={SearchX} title="Nothing matches those filters" description="Try another universe, a different content type, or clear your search.">
          <Button onClick={reset} variant="secondary">Reset filters</Button>
        </EmptyState>
      )}
    </PageContainer>
  );
}
