export const events = [
  {
    slug: 'fandomverse-con-lagos-2026', title: 'FandomVerse Con Lagos 2026', category: 'anime',
    date: '2026-11-14', endDate: '2026-11-16', time: '10:00 – 20:00',
    location: 'Eko Convention Centre, Lagos', city: 'Lagos',
    description: 'Three days of panels, cosplay, artist alley and exclusive premieres across all seven universes.',
    long: 'FandomVerse Con returns to Lagos for its biggest edition yet. Expect a world premiere of Neon Ronin episode 10, an ECHO//7 fan meet, 120+ artist alley tables, a cosplay championship and a dedicated indie games arcade.',
    price: 'From ₦15,000', status: 'upcoming', featured: true,
    schedule: [
      { time: '10:00', title: 'Doors open & artist alley' },
      { time: '12:30', title: 'Neon Ronin: Director’s panel' },
      { time: '15:00', title: 'Cosplay championship heats' },
      { time: '18:00', title: 'Episode 10 world premiere' },
    ],
  },
  {
    slug: 'skyfall-protocol-world-finals', title: 'Skyfall Protocol World Finals', category: 'gaming',
    date: '2026-12-05', time: '14:00 – 23:00', location: 'Arena Nova, Berlin', city: 'Berlin',
    description: 'Sixteen teams, one orbital crown. Watch the best Skyfall squads compete live.',
    long: 'The Skyfall Protocol World Finals bring the season’s sixteen best squads to Berlin for a single day of elimination matches, with a live reveal of season five.',
    price: 'From €45', status: 'upcoming',
    schedule: [{ time: '14:00', title: 'Group stage' }, { time: '19:00', title: 'Semi-finals' }, { time: '21:30', title: 'Grand final' }],
  },
  {
    slug: 'solar-district-premiere-night', title: 'Solar District Premiere Night', category: 'movies',
    date: '2026-10-22', time: '19:00', location: 'Leicester Square, London', city: 'London',
    description: 'Red-carpet screening with a live Q&A with director Ines Laurent.',
    long: 'Join the cast and crew of Solar District for its UK premiere, followed by a conversation with director Ines Laurent about building a practical sun.',
    price: 'Ballot entry', status: 'upcoming',
    schedule: [{ time: '18:00', title: 'Red carpet' }, { time: '19:00', title: 'Screening' }, { time: '21:30', title: 'Director Q&A' }],
  },
  {
    slug: 'echo-stage-seoul', title: 'Echo Stage: Afterglow in Seoul', category: 'kpop',
    date: '2026-10-31', time: '18:30', location: 'Olympic Hall, Seoul', city: 'Seoul',
    description: 'ECHO//7’s comeback concert, with the full “Afterglow” stage for the first time.',
    long: 'The opening night of the Afterglow tour. Light sticks recommended — the stage is designed around them.',
    price: 'From ₩132,000', status: 'upcoming',
    schedule: [{ time: '17:00', title: 'Merch & fan zone' }, { time: '18:30', title: 'Concert' }],
  },
  {
    slug: 'chronicle-zero-finale-watch-party', title: 'Chronicle Zero Finale Watch Party', category: 'tv',
    date: '2026-10-09', time: '20:00', location: 'Online & Toronto', city: 'Toronto',
    description: 'Watch the finale together, then stay for a live theory-breakdown stream.',
    long: 'A simultaneous in-person and online watch party for the Chronicle Zero finale, hosted by the FandomVerse TV desk.',
    price: 'Free', status: 'upcoming',
    schedule: [{ time: '20:00', title: 'Finale' }, { time: '21:15', title: 'Live breakdown' }],
  },
  {
    slug: 'meridian-comic-fair', title: 'Meridian Comic & Zine Fair', category: 'comics',
    date: '2026-11-02', time: '11:00 – 18:00', location: 'Printworks Hall, Accra', city: 'Accra',
    description: 'Independent creators, signed variants and a live-drawing jam.',
    long: 'A celebration of independent comics and zines with 80 creators, portfolio reviews and a 12-hour drawing marathon.',
    price: 'GH₵ 60', status: 'upcoming',
    schedule: [{ time: '11:00', title: 'Fair opens' }, { time: '14:00', title: 'Portfolio reviews' }],
  },
  {
    slug: 'tidebound-exhibition', title: 'Tidebound: The Art of the Sea', category: 'manga',
    date: '2026-08-12', endDate: '2026-09-10', time: '10:00 – 18:00', location: 'Harbour Gallery, Osaka', city: 'Osaka',
    description: 'Original ink pages and storyboards from twelve volumes of Tidebound.',
    long: 'More than 200 original pages, including the full wordless lighthouse chapter.',
    price: '¥1,800', status: 'past',
    schedule: [{ time: '10:00', title: 'Gallery open' }],
  },
  {
    slug: 'pixel-vanguard-speedrun-marathon', title: 'Pixel Vanguard Speedrun Marathon', category: 'gaming',
    date: '2026-07-20', time: '12:00', location: 'Online', city: 'Online',
    description: 'A 48-hour charity speedrun marathon with the game’s developers on commentary.',
    long: 'Raised funds for youth game-design programmes across three continents.',
    price: 'Free', status: 'past',
    schedule: [{ time: '12:00', title: 'Marathon begins' }],
  },
];

export const getEvent = (slug) => events.find((e) => e.slug === slug);

export const formatDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', opts);
