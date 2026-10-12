import { useMemo, useState } from 'react';
import { Layers, Sparkles, Tag, UserX } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import SearchInput from '../components/common/SearchInput.jsx';
import Select from '../components/common/Select.jsx';
import CharacterCard from '../components/cards/CharacterCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Button from '../components/common/Button.jsx';
import { characters } from '../data/characters.js';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

export default function Characters() {
  usePageTitle('Characters');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [franchise, setFranchise] = useState('all');
  const [trait, setTrait] = useState('all');

  const franchises = [...new Set(characters.map((c) => c.series))].sort();
  const traits = [...new Set(characters.flatMap((c) => c.traits))].sort();

  const list = useMemo(
    () =>
      characters.filter((c) => {
        const text = `${c.name} ${c.series} ${c.role}`.toLowerCase();
        return (
          (!q || text.includes(q.toLowerCase())) &&
          (category === 'all' || c.category === category) &&
          (franchise === 'all' || c.series === franchise) &&
          (trait === 'all' || c.traits.includes(trait))
        );
      }),
    [q, category, franchise, trait]
  );

  const reset = () => { setQ(''); setCategory('all'); setFranchise('all'); setTrait('all'); };

  return (
    <PageContainer>
      <PageHeader eyebrow="Directory" title="Characters" description="Heroes, rivals, idols and icons from across all seven universes." />
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-end">
        <SearchInput value={q} onChange={setQ} onClear={() => setQ('')} placeholder="Find a character..." />
        <Select label="Category" icon={Layers} value={category} onChange={setCategory} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]} />
        <Select label="Franchise" icon={Sparkles} value={franchise} onChange={setFranchise} options={[{ value: 'all', label: 'All franchises' }, ...franchises.map((f) => ({ value: f, label: f }))]} />
        <Select label="Traits" icon={Tag} value={trait} onChange={setTrait} options={[{ value: 'all', label: 'Any trait' }, ...traits.map((t) => ({ value: t, label: t }))]} />
      </div>
      <p className="mb-6 mt-8 border-t border-line pt-6 text-sm text-ink-2" aria-live="polite"><span className="font-semibold text-ink">{list.length}</span> characters</p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {list.map((c) => <CharacterCard key={c.slug} character={c} />)}
        </div>
      ) : (
        <EmptyState icon={UserX} title="No characters found" description="Try a different name, franchise or trait.">
          <Button variant="secondary" onClick={reset}>Clear filters</Button>
        </EmptyState>
      )}
    </PageContainer>
  );
}
