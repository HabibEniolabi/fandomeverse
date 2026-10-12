import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import Tabs from '../components/common/Tabs.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Button from '../components/common/Button.jsx';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import CharacterCard from '../components/cards/CharacterCard.jsx';
import MediaCard from '../components/cards/MediaCard.jsx';
import EventCard from '../components/cards/EventCard.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import ReleaseCard from '../components/cards/ReleaseCard.jsx';
import { useBookmarks } from '../context/BookmarkContext.jsx';
import { getArticle } from '../data/articles.js';
import { getCharacter } from '../data/characters.js';
import { getMedia } from '../data/media.js';
import { getEvent } from '../data/events.js';
import { getProduct } from '../data/products.js';
import { getRelease } from '../data/releases.js';
import { useNavigate } from 'react-router-dom';
import usePageTitle from './usePageTitle.js';

const tabDefs = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'character', label: 'Characters' },
  { value: 'media', label: 'Media' },
  { value: 'event', label: 'Events' },
  { value: 'product', label: 'Merchandise' },
];

function SavedItem({ b }) {
  const navigate = useNavigate();
  if (b.kind === 'article') { const a = getArticle(b.slug); return a ? <ArticleCard article={a} /> : null; }
  if (b.kind === 'character') { const c = getCharacter(b.slug); return c ? <CharacterCard character={c} /> : null; }
  if (b.kind === 'event') { const e = getEvent(b.slug); return e ? <EventCard event={e} /> : null; }
  if (b.kind === 'product') { const p = getProduct(b.slug); return p ? <ProductCard product={p} /> : null; }
  if (b.kind === 'media') {
    const m = getMedia(b.slug);
    if (m) return <MediaCard item={m} onPlay={(it) => navigate(`/media?play=${it.slug}`)} />;
    const r = getRelease(b.slug);
    return r ? <ReleaseCard release={r} /> : null;
  }
  return null;
}

export default function Bookmarks() {
  usePageTitle('Bookmarks');
  const { bookmarks, clearBookmarks } = useBookmarks();
  const [tab, setTab] = useState('all');
  const tabs = tabDefs.map((t) => ({ ...t, count: t.value === 'all' ? bookmarks.length : bookmarks.filter((b) => b.kind === t.value).length }));
  const list = bookmarks.filter((b) => tab === 'all' || b.kind === tab);

  return (
    <PageContainer>
      <PageHeader eyebrow="Your library" title="Bookmarks" description="Everything you’ve saved across the FandomVerse. Saved on this device.">
        {bookmarks.length > 0 && (
          <button type="button" onClick={clearBookmarks} className="mt-5 text-sm font-semibold text-ink-2 hover:text-[#D93F3F]">Clear all bookmarks</button>
        )}
      </PageHeader>
      <Tabs tabs={tabs} value={tab} onChange={setTab} label="Bookmark type" />
      <div className="mt-8">
        {list.length ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((b) => <SavedItem key={b.id} b={b} />)}
          </div>
        ) : (
          <EmptyState icon={Bookmark} title={tab === 'all' ? 'No bookmarks yet' : `No saved ${tabs.find((t) => t.value === tab).label.toLowerCase()}`} description="Tap the bookmark icon on any story, character, video, event or product to save it here.">
            <Button to="/discover">Start discovering</Button>
          </EmptyState>
        )}
      </div>
    </PageContainer>
  );
}
