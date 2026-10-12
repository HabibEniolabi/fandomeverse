export const releases = [
  { slug: 'neon-ronin-season-2', title: 'Neon Ronin Season 2', category: 'anime', kind: 'Anime', date: '2027-01-09', status: 'Confirmed', note: 'Studio Kasumi' },
  { slug: 'skyfall-protocol-season-5', title: 'Skyfall Protocol: Season 5', category: 'gaming', kind: 'Game', date: '2026-12-05', status: 'Pre-register', note: 'PC · Console' },
  { slug: 'solar-district', title: 'Solar District', category: 'movies', kind: 'Movie', date: '2026-10-24', status: 'Tickets on sale', note: 'In cinemas' },
  { slug: 'chronicle-zero-season-3', title: 'Chronicle Zero Season 3', category: 'tv', kind: 'TV Series', date: '2027-03-18', status: 'In production', note: '8 episodes' },
  { slug: 'echo7-afterglow-album', title: 'ECHO//7 — Afterglow (Full Album)', category: 'kpop', kind: 'Music', date: '2026-10-30', status: 'Pre-order', note: '11 tracks' },
  { slug: 'iron-meridian-brass-and-bone', title: 'Iron Meridian: Brass & Bone #1', category: 'comics', kind: 'Comic', date: '2026-11-11', status: 'Pre-order', note: 'Crossover event' },
  { slug: 'tidebound-volume-13', title: 'Tidebound Vol. 13', category: 'manga', kind: 'Manga', date: '2026-11-27', status: 'Confirmed', note: 'Final arc begins' },
  { slug: 'pixel-vanguard-skyline', title: 'Pixel Vanguard: Skyline DLC', category: 'gaming', kind: 'Game', date: '2027-02-14', status: 'Announced', note: 'Expansion' },
];

export const getRelease = (slug) => releases.find((r) => r.slug === slug);
