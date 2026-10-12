import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Mic2, Star, TrendingUp } from 'lucide-react';
import { characters, getCharacter } from '../data/characters.js';
import { getCategory, tint } from '../data/categories.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Badge from '../components/common/Badge.jsx';
import Tabs from '../components/common/Tabs.jsx';
import BookmarkButton from '../components/common/BookmarkButton.jsx';
import ShareButton from '../components/common/ShareButton.jsx';
import Artwork from '../components/art/Artwork.jsx';
import CharacterCard from '../components/cards/CharacterCard.jsx';
import Gallery from '../components/media/Gallery.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from './usePageTitle.js';

const tabs = [
  { value: 'about', label: 'About' },
  { value: 'appearances', label: 'Appearances' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'related', label: 'Related Characters' },
];

export default function CharacterDetail() {
  const { slug } = useParams();
  const c = getCharacter(slug);
  const [tab, setTab] = useState('about');
  usePageTitle(c?.name);
  if (!c) return <NotFound />;
  const cat = getCategory(c.category);
  const related = [...characters.filter((x) => x.slug !== slug && x.category === c.category), ...characters.filter((x) => x.category !== c.category)].slice(0, 4);
  const images = [
    { id: `${slug}-1`, seed: slug, title: `${c.name} — official portrait`, category: c.category, variant: 'portrait', ratio: 'tall' },
    { id: `${slug}-2`, seed: `${slug}-scene-1`, title: `${c.series} — key art`, category: c.category, ratio: 'wide' },
    { id: `${slug}-3`, seed: `${slug}-scene-2`, title: `${c.series} — location study`, category: c.category, ratio: 'square' },
    { id: `${slug}-4`, seed: `${slug}-alt`, title: `${c.name} — alternate design`, category: c.category, variant: 'portrait', ratio: 'tall' },
    { id: `${slug}-5`, seed: `${slug}-scene-3`, title: `${c.series} — concept`, category: c.category, ratio: 'wide' },
  ];

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Characters', to: '/characters' }, { label: c.name }]} />
      <div className="grid gap-10 lg:grid-cols-[440px_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <Artwork seed={c.slug} category={c.category} variant="portrait" label={`${c.name} portrait`} />
          </div>
        </div>
        <div>
          <Badge category={c.category} icon />
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">{c.name}</h1>
          <p className="mt-2 text-xl text-ink-2">{c.role} · <span className="font-semibold text-ink">{c.series}</span></p>
          <div className="mt-6 flex gap-2">
            <BookmarkButton item={{ kind: 'character', slug: c.slug, title: c.name, category: c.category }} variant="outline" withLabel />
            <ShareButton title={c.name} withLabel />
          </div>
          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: TrendingUp, k: 'Popularity', v: `${c.popularity}/100` },
              { icon: BookOpen, k: 'First appearance', v: c.firstAppearance.split(' — ')[0].split(',')[0] },
              { icon: Mic2, k: c.category === 'kpop' ? 'Position' : 'Voice', v: c.category === 'kpop' ? c.role : c.voice },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="card p-4">
                <dt className="flex items-center gap-1.5 text-[13px] text-muted"><Icon className="h-4 w-4" aria-hidden="true" />{k}</dt>
                <dd className="mt-1 line-clamp-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <Tabs variant="underline" tabs={tabs} value={tab} onChange={setTab} label="Character sections" className="mt-10" />
          <div className="pt-8" role="tabpanel">
            {tab === 'about' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold">Biography</h2>
                <p className="mt-4 text-[17px] leading-[1.8] text-ink/90">{c.bio}</p>
                <h3 className="mt-8 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Traits</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.traits.map((t) => (
                    <li key={t} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: tint(cat.color, 0.12), color: cat.color }}>
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />{t}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">First appearance</h3>
                <p className="mt-2 text-ink">{c.firstAppearance}</p>
              </div>
            )}
            {tab === 'appearances' && (
              <ol className="max-w-2xl space-y-3">
                {c.appearances.map((a, i) => (
                  <li key={a} className="card flex items-center gap-4 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold" style={{ background: tint(cat.color, 0.12), color: cat.color }}>{i + 1}</span>
                    <span className="font-medium">{a}</span>
                  </li>
                ))}
              </ol>
            )}
            {tab === 'gallery' && <Gallery images={images} columns="columns-2 xl:columns-3" />}
            {tab === 'related' && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
                {related.map((r) => <CharacterCard key={r.slug} character={r} compact />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
