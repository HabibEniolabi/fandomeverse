import { articles } from './articles.js';
import { characters } from './characters.js';
import { events } from './events.js';
import { media } from './media.js';
import { products } from './products.js';
import { releases } from './releases.js';
import { categories } from './categories.js';

export const contentTypes = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'character', label: 'Characters' },
  { value: 'video', label: 'Videos' },
  { value: 'audio', label: 'Audio' },
  { value: 'gallery', label: 'Galleries' },
  { value: 'event', label: 'Events' },
  { value: 'product', label: 'Merchandise' },
  { value: 'release', label: 'Releases' },
];

/** A unified, flat index of everything on FandomVerse — powers Discover, Search and Bookmarks. */
export const allContent = [
  ...articles.map((a, i) => ({ id: `article:${a.slug}`, kind: 'article', slug: a.slug, title: a.title, category: a.category, meta: `${a.readTime} min read`, date: a.date, popularity: 100 - i * 3, href: `/articles/${a.slug}`, featured: a.featured, raw: a })),
  ...characters.map((c) => ({ id: `character:${c.slug}`, kind: 'character', slug: c.slug, title: c.name, category: c.category, meta: c.series, date: '2026-09-01', popularity: c.popularity, href: `/characters/${c.slug}`, raw: c })),
  ...media.map((m) => ({ id: `media:${m.slug}`, kind: m.type === 'podcast' ? 'audio' : 'video', slug: m.slug, title: m.title, category: m.category, meta: `${m.duration} · ${m.status}`, date: '2026-09-10', popularity: parseFloat(m.views) * (m.views.includes('M') ? 10 : 0.01), href: `/media?play=${m.slug}`, featured: m.featured, raw: m })),
  ...events.map((e) => ({ id: `event:${e.slug}`, kind: 'event', slug: e.slug, title: e.title, category: e.category, meta: e.city, date: e.date, popularity: e.featured ? 95 : 70, href: `/events/${e.slug}`, featured: e.featured, raw: e })),
  ...products.map((p) => ({ id: `product:${p.slug}`, kind: 'product', slug: p.slug, title: p.name, category: p.category, meta: `$${p.price}`, date: '2026-08-01', popularity: p.rating * 18, href: `/shop/${p.slug}`, raw: p })),
  ...releases.map((r) => ({ id: `release:${r.slug}`, kind: 'release', slug: r.slug, title: r.title, category: r.category, meta: r.kind, date: r.date, popularity: 75, href: `/releases#${r.slug}`, raw: r })),
  ...categories.map((c) => ({ id: `gallery:${c.slug}`, kind: 'gallery', slug: c.slug, title: `${c.name} Gallery`, category: c.slug, meta: 'Key art & concepts', date: '2026-08-15', popularity: 60, href: `/media#gallery`, raw: c })),
];

export const kindLabel = {
  article: 'Article',
  character: 'Character',
  video: 'Video',
  audio: 'Audio',
  gallery: 'Gallery',
  event: 'Event',
  product: 'Merch',
  release: 'Release',
};

/** Trending feed on the home page — mixed content types. */
export const trending = [
  { id: 't1', kind: 'article', slug: 'neon-ronin-the-sword-that-remembers', category: 'anime', title: 'Neon Ronin episode 6 changes everything', type: 'Article', info: '8 min read', href: '/articles/neon-ronin-the-sword-that-remembers' },
  { id: 't2', kind: 'video', slug: 'skyfall-season-five-reveal', category: 'gaming', title: 'Skyfall Protocol: Season 5 Reveal', type: 'Trailer', info: '1:48 · Coming Dec 2026', href: '/media?play=skyfall-season-five-reveal' },
  { id: 't3', kind: 'release', slug: 'solar-district', category: 'movies', title: 'Solar District tickets are on sale', type: 'Release', info: 'In cinemas 24 Oct', href: '/releases#solar-district' },
  { id: 't4', kind: 'article', slug: 'echo-stage-comeback-choreography', category: 'kpop', title: 'ECHO//7’s 32-formation comeback', type: 'Article', info: '5 min read', href: '/articles/echo-stage-comeback-choreography' },
  { id: 't5', kind: 'article', slug: 'moonlit-academy-season-two', category: 'anime', title: 'Moonlit Academy’s softer, braver second year', type: 'Article', info: '5 min read', href: '/articles/moonlit-academy-season-two' },
  { id: 't6', kind: 'article', slug: 'pixel-vanguard-indie-to-icon', category: 'gaming', title: 'Pixel Vanguard: four people, two million players', type: 'Article', info: '8 min read', href: '/articles/pixel-vanguard-indie-to-icon' },
  { id: 't7', kind: 'video', slug: 'solar-district-final-trailer', category: 'movies', title: 'Solar District — Final Trailer', type: 'Trailer', info: '2:51 · In cinemas 24 Oct', href: '/media?play=solar-district-final-trailer' },
  { id: 't8', kind: 'video', slug: 'echo7-afterglow-mv', category: 'kpop', title: '“Afterglow” performance video hits 12M', type: 'Video', info: '3:36 · Out now', href: '/media?play=echo7-afterglow-mv' },
];

export const recentSearches = ['Neon Ronin', 'light stick', 'Chronicle Zero theories'];
export const trendingSearches = ['Skyfall season 5', 'Solar District tickets', 'Aiko Vale', 'Tidebound vol 13', 'FandomVerse Con'];

export function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allContent.filter((item) => {
    const hay = `${item.title} ${item.meta} ${item.category} ${item.raw.series || ''} ${item.raw.excerpt || ''} ${(item.raw.tags || []).join(' ')}`.toLowerCase();
    return q.split(/\s+/).every((word) => hay.includes(word));
  });
}

/** Group search results into the sections shown in the overlay. */
export function groupResults(results) {
  const groups = [
    { key: 'articles', label: 'Articles', kinds: ['article'] },
    { key: 'characters', label: 'Characters', kinds: ['character'] },
    { key: 'media', label: 'Media', kinds: ['video', 'audio', 'gallery', 'release'] },
    { key: 'events', label: 'Events', kinds: ['event'] },
    { key: 'merch', label: 'Merchandise', kinds: ['product'] },
  ];
  return groups
    .map((g) => ({ ...g, items: results.filter((r) => g.kinds.includes(r.kind)) }))
    .filter((g) => g.items.length);
}
