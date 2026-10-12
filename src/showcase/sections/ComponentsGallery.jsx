import { useState } from 'react';
import { ArrowRight, Bookmark, Layers, Play, Plus, Search, ShoppingBag, User } from 'lucide-react';
import { ShowcaseSection, Specimen } from '../ShowcaseLayout.jsx';
import Button from '../../components/common/Button.jsx';
import IconButton from '../../components/common/IconButton.jsx';
import Badge from '../../components/common/Badge.jsx';
import CategoryChip from '../../components/common/CategoryChip.jsx';
import SearchInput from '../../components/common/SearchInput.jsx';
import Select from '../../components/common/Select.jsx';
import Tabs from '../../components/common/Tabs.jsx';
import BookmarkButton from '../../components/common/BookmarkButton.jsx';
import ThemeToggle from '../../components/theme/ThemeToggle.jsx';
import Navbar from '../../components/layout/Navbar.jsx';
import CategoryCard from '../../components/cards/CategoryCard.jsx';
import ArticleCard from '../../components/cards/ArticleCard.jsx';
import CharacterCard from '../../components/cards/CharacterCard.jsx';
import ProductCard from '../../components/cards/ProductCard.jsx';
import EventCard from '../../components/cards/EventCard.jsx';
import MediaCard from '../../components/cards/MediaCard.jsx';
import ReleaseCard from '../../components/cards/ReleaseCard.jsx';
import ChatbotPanel from '../../components/chatbot/ChatbotPanel.jsx';
import { CartPanel } from '../../components/cart/CartDrawer.jsx';
import { PasswordInput } from '../../pages/Login.jsx';
import Lightbox from '../../components/media/Lightbox.jsx';
import { categories } from '../../data/categories.js';
import { articles } from '../../data/articles.js';
import { characters } from '../../data/characters.js';
import { products } from '../../data/products.js';
import { events } from '../../data/events.js';
import { media, gallery } from '../../data/media.js';
import { releases } from '../../data/releases.js';
import { useUI } from '../../context/UIContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function ComponentsGallery() {
  const [tab, setTab] = useState('all');
  const [utab, setUtab] = useState('overview');
  const [chips, setChips] = useState('anime');
  const [q, setQ] = useState('Neon');
  const [sel, setSel] = useState('featured');
  const [pw, setPw] = useState('fandomverse');
  const [lightbox, setLightbox] = useState(null);
  const { openSearch, openCart, notify } = useUI();
  const { addItem, count } = useCart();

  return (
    <ShowcaseSection id="components" index="02" title="Components" description="Every component below is the live production component — interact with them directly.">
      <div className="space-y-6">
        <Specimen title="Buttons" note="Pill · 36 / 44 / 52px heights">
          <div className="flex flex-wrap items-center gap-3">
            <Button iconRight={ArrowRight}>Explore Story</Button>
            <Button variant="secondary" icon={Play}>Watch Trailer</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="dark">Dark</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <span className="mx-2 h-8 w-px bg-line" />
            <IconButton icon={Search} label="Search" variant="outline" />
            <IconButton icon={ShoppingBag} label="Cart" variant="outline" badge={3} />
            <IconButton icon={User} label="Profile" variant="outline" />
            <IconButton icon={Plus} label="Add" variant="brand" />
          </div>
        </Specimen>

        <div className="grid gap-6 lg:grid-cols-2">
          <Specimen title="Inputs">
            <div className="space-y-4">
              <div><label htmlFor="sc-email" className="label">Email</label><input id="sc-email" className="input" placeholder="you@example.com" /></div>
              <PasswordInput id="sc-pass" label="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
              <Select label="Category" icon={Layers} value={sel} onChange={setSel} options={[{ value: 'featured', label: 'All categories' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]} />
            </div>
          </Specimen>
          <Specimen title="Search" note="⌘K opens the global overlay">
            <div className="space-y-4">
              <SearchInput value={q} onChange={setQ} onClear={() => setQ('')} kbd="⌘ K" />
              <SearchInput size="lg" value="" onChange={() => {}} placeholder="Search stories, characters, trailers..." />
              <Button variant="secondary" icon={Search} onClick={openSearch}>Open search overlay</Button>
            </div>
          </Specimen>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Specimen title="Badges" note="Colour + icon/dot + label">
            <div className="flex flex-wrap gap-2">{categories.map((c) => <Badge key={c.slug} category={c.slug} />)}</div>
            <div className="mt-3 flex flex-wrap gap-2">{categories.slice(0, 4).map((c) => <Badge key={c.slug} category={c.slug} icon />)}<Badge>Neutral</Badge></div>
          </Specimen>
          <Specimen title="Category chips & tabs">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((c) => <CategoryChip key={c.slug} category={c.slug} active={chips === c.slug} onClick={() => setChips(c.slug)} />)}
            </div>
            <Tabs className="mt-4" tabs={['all', 'anime', 'gaming', 'movies'].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }))} value={tab} onChange={setTab} />
            <Tabs className="mt-3" variant="underline" tabs={['overview', 'articles', 'characters', 'media'].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }))} value={utab} onChange={setUtab} />
          </Specimen>
        </div>

        <Specimen title="Navbar" note="Sticky · desktop shown; below 1024px collapses to logo · theme · cart · menu" bodyClass="!p-0">
          <div className="relative"><Navbar /></div>
        </Specimen>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Specimen title="Theme toggle" note="Persists · respects prefers-color-scheme">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2"><ThemeToggle /><span className="text-[12px] text-muted">Icon</span></div>
              <div className="flex flex-col items-center gap-2"><ThemeToggle variant="switch" /><span className="text-[12px] text-muted">Switch</span></div>
            </div>
          </Specimen>
          <Specimen title="Bookmark" note="Pop animation · aria-pressed">
            <div className="flex items-center gap-3">
              <BookmarkButton item={{ kind: 'article', slug: articles[0].slug, title: articles[0].title, category: 'anime' }} variant="outline" withLabel />
              <BookmarkButton item={{ kind: 'article', slug: articles[1].slug, title: articles[1].title, category: 'gaming' }} variant="outline" />
              <span className="rounded-xl bg-[#1B1030] p-2"><BookmarkButton item={{ kind: 'article', slug: articles[2].slug, title: articles[2].title, category: 'movies' }} /></span>
            </div>
          </Specimen>
        </div>

        <Specimen title="Cards">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.slice(0, 4).map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ArticleCard article={articles[2]} />
            <EventCard event={events[0]} />
            <MediaCard item={media[1]} onPlay={() => notify('Opens in the media player')} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            <CharacterCard character={characters[0]} />
            <ProductCard product={products[3]} />
            <ReleaseCard release={releases[1]} />
            <CharacterCard character={characters[4]} compact />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ArticleCard article={articles[4]} variant="horizontal" />
            <EventCard event={events[2]} variant="row" />
          </div>
        </Specimen>

        <div className="grid gap-6 lg:grid-cols-2">
          <Specimen title="Chatbot" note="380 × 540 · scripted, no backend">
            <div className="flex justify-center"><ChatbotPanel embedded /></div>
          </Specimen>
          <Specimen title="Cart" note="Session-only · no payments">
            <div className="flex flex-col items-center gap-4">
              <div className="h-[540px] w-full max-w-[380px] overflow-hidden rounded-2xl shadow-lift"><CartPanel embedded onClose={() => notify('Closes the drawer')} /></div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" icon={Plus} onClick={() => { addItem(products[0].slug); addItem(products[3].slug); }}>Add sample items</Button>
                <Button size="sm" icon={ShoppingBag} onClick={openCart}>Open drawer ({count})</Button>
              </div>
            </div>
          </Specimen>
        </div>

        <Specimen title="Modals & overlays" note="Esc to close · focus moves into the dialog">
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" icon={Search} onClick={openSearch}>Search overlay</Button>
            <Button variant="secondary" icon={ShoppingBag} onClick={openCart}>Cart drawer</Button>
            <Button variant="secondary" icon={Layers} onClick={() => setLightbox(0)}>Gallery lightbox</Button>
            <Button variant="secondary" icon={Bookmark} onClick={() => notify('Saved to bookmarks')}>Toast</Button>
          </div>
        </Specimen>
      </div>
      {lightbox != null && <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />}
    </ShowcaseSection>
  );
}
