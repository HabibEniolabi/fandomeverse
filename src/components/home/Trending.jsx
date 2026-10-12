import { useState } from 'react';
import SectionHeader from '../common/SectionHeader.jsx';
import Tabs from '../common/Tabs.jsx';
import ContentCard from '../cards/ContentCard.jsx';
import { trending } from '../../data/index.js';

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'anime', label: 'Anime' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'movies', label: 'Movies' },
  { value: 'kpop', label: 'K-Pop' },
];

export default function Trending() {
  const [tab, setTab] = useState('all');
  const items = trending.filter((t) => tab === 'all' || t.category === tab);
  return (
    <section className="border-y border-line bg-surface-2/50 py-14 md:py-20" aria-labelledby="trending-heading">
      <div className="container-page">
        <SectionHeader eyebrow="Trending" title={<span id="trending-heading">What everyone’s talking about</span>}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} label="Filter trending" />
        </SectionHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => <ContentCard key={t.id} item={t} type={t.type} info={t.info} />)}
        </div>
      </div>
    </section>
  );
}
