export const media = [
  { slug: 'neon-ronin-season-trailer', title: 'Neon Ronin — Official Season Trailer', category: 'anime', type: 'trailer', duration: '2:24', status: 'Streaming now', views: '4.1M', featured: true,
    description: 'Aiko Vale returns to Oboro as the sword begins to remember its first owner.' },
  { slug: 'solar-district-final-trailer', title: 'Solar District — Final Trailer', category: 'movies', type: 'trailer', duration: '2:51', status: 'In cinemas 24 Oct', views: '2.8M',
    description: 'Seven days to relight a sun.' },
  { slug: 'skyfall-season-five-reveal', title: 'Skyfall Protocol: Season 5 Reveal', category: 'gaming', type: 'trailer', duration: '1:48', status: 'Coming Dec 2026', views: '1.9M',
    description: 'A first look at the next orbital battleground.' },
  { slug: 'echo7-afterglow-mv', title: 'ECHO//7 — “Afterglow” Performance Video', category: 'kpop', type: 'trailer', duration: '3:36', status: 'Out now', views: '12.4M',
    description: 'The full formation-heavy comeback stage.' },
  { slug: 'chronicle-zero-cast-interview', title: 'Chronicle Zero cast on the missing year', category: 'tv', type: 'interview', duration: '14:05', status: 'New', views: '640K',
    description: 'The cast dodge spoilers — mostly.' },
  { slug: 'ines-laurent-interview', title: 'Ines Laurent on building a real sun', category: 'movies', type: 'interview', duration: '18:40', status: 'New', views: '320K',
    description: 'The Solar District director on light, heat and patience.' },
  { slug: 'aiko-vale-fan-animation', title: 'Aiko Vale — fan animation “Rooftops”', category: 'anime', type: 'fanvideo', duration: '4:12', status: 'Community pick', views: '880K',
    description: 'A 90-second hand-drawn tribute from the FandomVerse community.' },
  { slug: 'pixel-vanguard-cosplay-reel', title: 'Pixel Vanguard cosplay reel', category: 'gaming', type: 'fanvideo', duration: '3:05', status: 'Community pick', views: '410K',
    description: 'The best Sable Quinn gliders from FandomVerse Con.' },
  { slug: 'panel-talk-ep-42', title: 'Panel Talk #42 — The Iron Meridian problem', category: 'comics', type: 'podcast', duration: '52:18', status: 'New episode', views: '96K',
    description: 'Is forty years of continuity a feature or a bug?' },
  { slug: 'ink-and-tide-ep-17', title: 'Ink & Tide #17 — Wordless chapters', category: 'manga', type: 'podcast', duration: '41:02', status: 'New episode', views: '72K',
    description: 'Why Tidebound’s silent pages hit so hard.' },
  { slug: 'lumina-prism-live', title: 'LUMINA — “Prism” live acoustic', category: 'kpop', type: 'fanvideo', duration: '4:48', status: 'Out now', views: '3.2M',
    description: 'Eli Park’s stripped-back version of the breakout ballad.' },
  { slug: 'season-watch-podcast', title: 'Season Watch — Autumn 2026 preview', category: 'tv', type: 'podcast', duration: '1:04:30', status: 'New episode', views: '110K',
    description: 'Every show worth your autumn evenings.' },
];

export const mediaTypes = [
  { value: 'all', label: 'All' },
  { value: 'trailer', label: 'Trailers' },
  { value: 'interview', label: 'Interviews' },
  { value: 'fanvideo', label: 'Fan Videos' },
  { value: 'podcast', label: 'Podcasts' },
];

export const gallery = [
  { id: 'g1', title: 'Oboro skyline, key art', category: 'anime', ratio: 'tall' },
  { id: 'g2', title: 'Vanta Rig concept', category: 'gaming', ratio: 'wide' },
  { id: 'g3', title: 'District 9 at golden hour', category: 'movies', ratio: 'square' },
  { id: 'g4', title: 'Zero Archive set design', category: 'tv', ratio: 'tall' },
  { id: 'g5', title: 'Afterglow stage lights', category: 'kpop', ratio: 'square' },
  { id: 'g6', title: 'Brass Dawn cover study', category: 'comics', ratio: 'wide' },
  { id: 'g7', title: 'Shiokaze coast, ink wash', category: 'manga', ratio: 'tall' },
  { id: 'g8', title: 'Moonlit Academy courtyard', category: 'anime', ratio: 'square' },
  { id: 'g9', title: 'Floating islands sketch', category: 'gaming', ratio: 'square' },
];

export const getMedia = (slug) => media.find((m) => m.slug === slug);
