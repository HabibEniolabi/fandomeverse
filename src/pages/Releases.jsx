import { useState } from 'react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import CategoryChip from '../components/common/CategoryChip.jsx';
import ReleaseCard from '../components/cards/ReleaseCard.jsx';
import { releases } from '../data/releases.js';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

export default function Releases() {
  usePageTitle('Coming Soon');
  const [category, setCategory] = useState('all');
  const list = releases.filter((r) => category === 'all' || r.category === category).sort((a, b) => a.date.localeCompare(b.date));
  const groups = list.reduce((acc, r) => {
    const key = new Date(r.date + 'T12:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    (acc[key] ||= []).push(r);
    return acc;
  }, {});

  return (
    <PageContainer>
      <PageHeader eyebrow="Release calendar" title="Coming soon" description="Every upcoming anime, game, film, series, album, comic and manga volume — in date order." />
      <div className="scrollbar-none -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        <CategoryChip label="All" active={category === 'all'} onClick={() => setCategory('all')} />
        {categories.map((c) => <CategoryChip key={c.slug} category={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)} />)}
      </div>
      <div className="space-y-12">
        {Object.entries(groups).map(([month, items]) => (
          <section key={month} className="grid gap-4 md:grid-cols-[200px_1fr]">
            <h2 className="font-display text-xl font-bold md:sticky md:top-24 md:self-start">{month}</h2>
            <div className="space-y-3">{items.map((r) => <ReleaseCard key={r.slug} release={r} variant="row" />)}</div>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
