import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, BellRing, Inbox } from 'lucide-react';
import { categories, getCategory, tint } from '../data/categories.js';
import { articles } from '../data/articles.js';
import { characters } from '../data/characters.js';
import { media } from '../data/media.js';
import { events } from '../data/events.js';
import { products } from '../data/products.js';
import { releases } from '../data/releases.js';
import Artwork from '../components/art/Artwork.jsx';
import CategoryIcon from '../components/common/CategoryIcon.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Tabs from '../components/common/Tabs.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Button from '../components/common/Button.jsx';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import CharacterCard from '../components/cards/CharacterCard.jsx';
import MediaCard from '../components/cards/MediaCard.jsx';
import EventCard from '../components/cards/EventCard.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import ReleaseCard from '../components/cards/ReleaseCard.jsx';
import CategoryCard from '../components/cards/CategoryCard.jsx';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from './usePageTitle.js';

const tabDefs = [
  { value: 'overview', label: 'Overview' },
  { value: 'articles', label: 'Articles' },
  { value: 'characters', label: 'Characters' },
  { value: 'media', label: 'Media' },
  { value: 'events', label: 'Events' },
  { value: 'merch', label: 'Merch' },
  { value: 'releases', label: 'Releases' },
];

function Grid({ items, render, cols = 'sm:grid-cols-2 lg:grid-cols-3', empty }) {
  if (!items.length) return <EmptyState icon={Inbox} title={`No ${empty} yet`} description="We’re adding new content to this universe every week. Check back soon." />;
  return <div className={`grid grid-cols-1 gap-x-5 gap-y-8 ${cols}`}>{items.map(render)}</div>;
}

export function CategoriesIndex() {
  usePageTitle('Categories');
  return (
    <PageContainer>
      <PageHeader eyebrow="Categories" title="Seven universes. One home." description="Every fandom on FandomVerse lives in one of seven universes. Pick one to explore its stories, characters, media, events and merch." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
      </div>
    </PageContainer>
  );
}

export default function Category() {
  const { slug } = useParams();
  const [tab, setTab] = useState('overview');
  const [following, setFollowing] = useState(false);
  const { notify } = useUI();
  const navigate = useNavigate();
  const exists = categories.some((c) => c.slug === slug);
  const cat = getCategory(slug);
  usePageTitle(exists ? cat.name : 'Not found');
  if (!exists) return <NotFound />;

  const by = (list) => list.filter((i) => i.category === slug);
  const data = {
    articles: by(articles), characters: by(characters), media: by(media),
    events: by(events), merch: by(products), releases: by(releases),
  };
  const tabs = tabDefs.map((t) => ({ ...t, count: t.value === 'overview' ? undefined : data[t.value].length }));
  const others = categories.filter((c) => c.slug !== slug);

  return (
    <>
      {/* Category hero */}
      <section className="relative overflow-hidden border-b border-line" style={{ background: `linear-gradient(180deg, ${tint(cat.color, 0.1)}, transparent)` }}>
        <div className="container-page pb-10 pt-8 md:pb-14 md:pt-10">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories' }, { label: cat.name }]} />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: tint(cat.color, 0.16), color: cat.color }}>
                <CategoryIcon slug={cat.slug} className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{cat.name}</h1>
              <p className="mt-4 max-w-lg font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">“{cat.heroLine}”</p>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-2">{cat.intro}</p>
              <dl className="mt-7 flex gap-8">
                {[['Stories', cat.stats.stories], ['Characters', cat.stats.characters], ['Fans', cat.stats.fans]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[13px] text-muted">{k}</dt>
                    <dd className="font-display text-2xl font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button icon={following ? BellRing : Bell} variant={following ? 'secondary' : 'primary'} onClick={() => { setFollowing(!following); notify(following ? `Unfollowed ${cat.name}` : `Following ${cat.name}`); }} aria-pressed={following}>
                  {following ? 'Following' : `Follow ${cat.name}`}
                </Button>
                <Button variant="secondary" onClick={() => navigate(`/discover?category=${cat.slug}`)}>Browse all</Button>
              </div>
            </div>
            <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[28px] shadow-lift sm:block">
              <Artwork seed={`${cat.slug}-category-hero`} category={cat.slug} figure={cat.slug === 'anime' || cat.slug === 'movies'} label={`${cat.name} key art`} />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="container-page">
          <Tabs variant="underline" tabs={tabs} value={tab} onChange={setTab} label={`${cat.name} sections`} className="border-b-0" />
        </div>
      </div>

      <div className="container-page py-10 md:py-14" role="tabpanel" aria-label={tab}>
        {tab === 'overview' && (
          <div className="space-y-16">
            <div>
              <p className="eyebrow mb-3">Popular topics</p>
              <div className="flex flex-wrap gap-2">
                {cat.topics.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-2">#{t.replace(/\s/g, '')}</span>
                ))}
              </div>
            </div>
            {data.articles.length > 0 && (
              <section>
                <SectionHeader title="Latest stories" action="All articles" actionTo={`/discover?type=article&category=${slug}`} />
                <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
                  <ArticleCard article={data.articles[0]} variant="feature" />
                  <div className="flex flex-col gap-6 divide-y divide-line">
                    {[...data.articles.slice(1), ...articles.filter((a) => a.category !== slug)].slice(0, 3).map((a, i) => (
                      <div key={a.slug} className={i ? 'pt-6' : ''}><ArticleCard article={a} variant="horizontal" /></div>
                    ))}
                  </div>
                </div>
              </section>
            )}
            <section>
              <SectionHeader title="Characters" action="Directory" actionTo="/characters" />
              <Grid items={data.characters} empty="characters" cols="grid-cols-2 md:grid-cols-4" render={(c) => <CharacterCard key={c.slug} character={c} />} />
            </section>
            {data.media.length > 0 && (
              <section>
                <SectionHeader title="Watch & listen" action="Media hub" actionTo="/media" />
                <Grid items={data.media} empty="media" render={(m) => <MediaCard key={m.slug} item={m} onPlay={(it) => navigate(`/media?play=${it.slug}`)} />} />
              </section>
            )}
            <section>
              <SectionHeader title="Events, merch & releases" />
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {data.events.slice(0, 1).map((e) => <EventCard key={e.slug} event={e} />)}
                {data.merch.slice(0, 2).map((p) => <ProductCard key={p.slug} product={p} />)}
                {data.releases.slice(0, 1).map((r) => <ReleaseCard key={r.slug} release={r} />)}
              </div>
            </section>
            <section>
              <SectionHeader title="Explore other universes" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {others.map((c) => <CategoryCard key={c.slug} category={c} compact />)}
              </div>
            </section>
          </div>
        )}
        {tab === 'articles' && <Grid items={data.articles} empty="articles" render={(a) => <ArticleCard key={a.slug} article={a} />} />}
        {tab === 'characters' && <Grid items={data.characters} empty="characters" cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" render={(c) => <CharacterCard key={c.slug} character={c} />} />}
        {tab === 'media' && <Grid items={data.media} empty="media" render={(m) => <MediaCard key={m.slug} item={m} onPlay={(it) => navigate(`/media?play=${it.slug}`)} />} />}
        {tab === 'events' && <Grid items={data.events} empty="events" render={(e) => <EventCard key={e.slug} event={e} />} />}
        {tab === 'merch' && <Grid items={data.merch} empty="merchandise" cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" render={(p) => <ProductCard key={p.slug} product={p} />} />}
        {tab === 'releases' && <Grid items={data.releases} empty="releases" cols="grid-cols-2 md:grid-cols-4" render={(r) => <ReleaseCard key={r.slug} release={r} />} />}
      </div>
    </>
  );
}
