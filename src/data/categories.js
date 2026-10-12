// The seven FandomVerse universes. Colour is used for accents only — never full pages.
export const categories = [
  {
    slug: 'anime',
    name: 'Anime',
    color: '#F45B9C',
    icon: 'anime',
    tagline: 'Stories beyond imagination.',
    heroLine: 'Stories, characters and worlds worth discovering.',
    intro:
      'From slow-burn slice of life to galaxy-spanning mecha sagas, the anime universe is where hand-drawn worlds carry some of the most ambitious storytelling on screen.',
    stats: { stories: 248, characters: 612, fans: '1.2M' },
    topics: ['Seasonal Picks', 'Studio Spotlights', 'Opening Themes', 'Cyberpunk', 'Slice of Life'],
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    color: '#3978F6',
    icon: 'gaming',
    tagline: 'Enter worlds worth playing.',
    heroLine: 'Worlds, rivals and quests worth your next hundred hours.',
    intro:
      'Open worlds, tactical shooters, cosy farming sims and indie gems — follow the games, the studios and the players shaping how we play.',
    stats: { stories: 310, characters: 540, fans: '2.4M' },
    topics: ['Patch Notes', 'Esports', 'Indie Spotlight', 'Lore Deep-Dives', 'Speedruns'],
  },
  {
    slug: 'movies',
    name: 'Movies',
    color: '#FF8A3D',
    icon: 'movies',
    tagline: 'Stories made for the big screen.',
    heroLine: 'Blockbusters, festival darlings and the stories behind them.',
    intro:
      'Premieres, practical effects, soundtrack breakdowns and director interviews — everything that makes the big screen feel big.',
    stats: { stories: 196, characters: 380, fans: '980K' },
    topics: ['Box Office', 'Behind the Scenes', 'Festival Circuit', 'Scores', 'Sci-Fi'],
  },
  {
    slug: 'tv',
    name: 'TV Shows',
    color: '#7459E8',
    icon: 'tv',
    tagline: 'Series worth getting obsessed with.',
    heroLine: 'Series, seasons and finales worth talking about.',
    intro:
      'Weekly recaps, theory threads and season rankings for the shows everyone is watching — and the ones they should be.',
    stats: { stories: 221, characters: 455, fans: '1.1M' },
    topics: ['Recaps', 'Showrunners', 'Finales', 'Limited Series', 'Theories'],
  },
  {
    slug: 'kpop',
    name: 'K-Pop',
    color: '#D94DCE',
    icon: 'kpop',
    tagline: 'Music, artists and culture.',
    heroLine: 'Comebacks, choreography and the culture around them.',
    intro:
      'Comebacks, world tours, choreography breakdowns and fan-chant guides — the rhythm of the K-Pop universe in one place.',
    stats: { stories: 174, characters: 210, fans: '1.6M' },
    topics: ['Comebacks', 'Tours', 'Choreography', 'Fan Chants', 'Rookies'],
  },
  {
    slug: 'comics',
    name: 'Comics',
    color: '#E5A900',
    icon: 'comics',
    tagline: 'Heroes, worlds and panels.',
    heroLine: 'Heroes, villains and the artists who draw them.',
    intro:
      'Crossover events, indie creators, variant covers and reading orders — a guide to the panel-by-panel universe.',
    stats: { stories: 142, characters: 690, fans: '640K' },
    topics: ['Reading Orders', 'Variant Covers', 'Creators', 'Crossovers', 'Indie Press'],
  },
  {
    slug: 'manga',
    name: 'Manga',
    color: '#16A6A1',
    icon: 'manga',
    tagline: 'Stories told panel by panel.',
    heroLine: 'Serialised stories, one chapter at a time.',
    intro:
      'Weekly chapters, volume releases, mangaka interviews and the series that shaped a generation of readers.',
    stats: { stories: 188, characters: 520, fans: '870K' },
    topics: ['New Volumes', 'Mangaka', 'Shonen', 'Seinen', 'Adaptations'],
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const getCategory = (slug) => categoryMap[slug] || categories[0];

/** Convert a hex colour to an rgba() string with the given alpha (0–1). */
export const tint = (hex, alpha = 0.12) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
