/** Every screen shown in the /showcase design review. `path` is the live route. */
export const desktopScreens = [
  { key: 'home', title: 'Home', path: '/', group: 'home' },
  { key: 'discover', title: 'Discover', path: '/discover', group: 'discover' },
  { key: 'category', title: 'Category — Anime', path: '/category/anime', group: 'category' },
  { key: 'article', title: 'Article', path: '/articles/neon-ronin-the-sword-that-remembers', group: 'articles' },
  { key: 'characters', title: 'Characters', path: '/characters', group: 'characters' },
  { key: 'character', title: 'Character Detail', path: '/characters/aiko-vale', group: 'characters' },
  { key: 'media', title: 'Media & Gallery', path: '/media', group: 'media' },
  { key: 'events', title: 'Events', path: '/events', group: 'events' },
  { key: 'event', title: 'Event Detail', path: '/events/fandomverse-con-lagos-2026', group: 'events' },
  { key: 'releases', title: 'Coming Soon', path: '/releases', group: 'events' },
  { key: 'shop', title: 'Shop', path: '/shop', group: 'shop' },
  { key: 'product', title: 'Product', path: '/shop/neon-ronin-graphic-tee', group: 'shop' },
  { key: 'cart', title: 'Cart', path: '/cart', group: 'cart' },
  { key: 'bookmarks', title: 'Bookmarks', path: '/bookmarks', group: 'bookmarks' },
  { key: 'about', title: 'About', path: '/about', group: 'home' },
  { key: 'contact', title: 'Contact', path: '/contact', group: 'home' },
  { key: 'login', title: 'Login', path: '/login', group: 'auth' },
  { key: 'signup', title: 'Signup', path: '/signup', group: 'auth' },
];

export const mobileScreens = [
  { key: 'm-home', title: 'Home', path: '/' },
  { key: 'm-menu', title: 'Navigation drawer', path: '/?menu=open' },
  { key: 'm-discover', title: 'Discover', path: '/discover' },
  { key: 'm-category', title: 'Category', path: '/category/kpop' },
  { key: 'm-product', title: 'Product', path: '/shop/echo-stage-light-stick' },
  { key: 'm-cart', title: 'Cart', path: '/cart' },
  { key: 'm-chat', title: 'Chatbot', path: '/?chat=open' },
];

/** Detail pages for /showcase/:screen */
export const screenGroups = {
  home: {
    title: 'Home', description: 'The editorial front page: hero, seven universes, trending feed, featured articles, characters, the navy media room, events, merch, releases and the community CTA.',
    routes: [{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }, { label: 'Contact', path: '/contact' }],
    notes: ['50/50 split hero with featured story card', 'Category colour used only for icons, tints and badges', 'Trailers & Media stays navy in both themes', 'Floating Fandom Assistant bottom-right'],
  },
  discover: {
    title: 'Discover', description: 'Search-led discovery across every content type with type tabs, universe chips and sorting. Filters are reflected in the URL so views can be shared.',
    routes: [{ label: 'Discover', path: '/discover' }, { label: 'Articles filter', path: '/discover?type=article' }, { label: 'Search results', path: '/search?q=neon' }],
    notes: ['Large search input', '9 content-type tabs', '7 colour-coded category chips', 'Featured / Newest / Popular / A–Z sort'],
  },
  category: {
    title: 'Category', description: 'One reusable template for all seven universes. The Anime page is the reference; switch the slug to see the others.',
    routes: ['anime', 'gaming', 'movies', 'tv', 'kpop', 'comics', 'manga'].map((s) => ({ label: s, path: `/category/${s}` })),
    notes: ['Tinted hero using the category colour at 10%', 'Sticky underline tabs: Overview → Releases', 'Empty states when a universe has no items yet'],
  },
  articles: {
    title: 'Article', description: 'A calm long-form reading experience: 720px measure, 18px body, pull quotes in the category colour, author block and related stories.',
    routes: [{ label: 'Neon Ronin feature', path: '/articles/neon-ronin-the-sword-that-remembers' }, { label: 'Skyfall meta', path: '/articles/skyfall-protocol-season-four-meta' }],
    notes: ['Breadcrumb, badge, headline, subtitle', 'Bookmark + Share actions', 'Related articles grid'],
  },
  characters: {
    title: 'Characters', description: 'A searchable directory with category, franchise and trait filters, and a detail page with tabs for About, Appearances, Gallery and Related.',
    routes: [{ label: 'Directory', path: '/characters' }, { label: 'Aiko Vale', path: '/characters/aiko-vale' }, { label: 'Ren Kairo', path: '/characters/ren-kairo' }],
    notes: ['Portrait cards (4:5)', 'Native selects for accessibility', 'Sticky portrait on desktop'],
  },
  media: {
    title: 'Media', description: 'A featured demo player, media type tabs and a masonry gallery with a keyboard-accessible lightbox.',
    routes: [{ label: 'Media hub', path: '/media' }, { label: 'Playing a trailer', path: '/media?play=solar-district-final-trailer' }],
    notes: ['Play / pause / seek / mute controls', 'Trailers · Interviews · Fan Videos · Podcasts', 'Lightbox: previous, next, close, arrow keys'],
  },
  events: {
    title: 'Events & Releases', description: 'Upcoming / past tabs with category and date filters, an event detail page with schedule timeline, and the release calendar.',
    routes: [{ label: 'Events', path: '/events' }, { label: 'Event detail', path: '/events/fandomverse-con-lagos-2026' }, { label: 'Coming soon', path: '/releases' }],
    notes: ['Date block on imagery', 'Sticky ticket card', 'Month-grouped release calendar'],
  },
  shop: {
    title: 'Shop & Product', description: 'A merchandise catalogue with category, type and price filters and a product page with gallery, quantity and add to cart. Showcase only — no payment.',
    routes: [{ label: 'Shop', path: '/shop' }, { label: 'Product', path: '/shop/neon-ronin-graphic-tee' }, { label: 'Light stick', path: '/shop/echo-stage-light-stick' }],
    notes: ['“Purchases are not processed” notice', 'Price Low–High / High–Low sorting', 'Add to cart opens the cart drawer'],
  },
  cart: {
    title: 'Cart', description: 'Temporary session cart with quantity steppers, item count, subtotal, shipping and total. Checkout is intentionally disabled.',
    routes: [{ label: 'Cart', path: '/cart' }, { label: 'Cart drawer', path: '/shop?cart=open' }],
    notes: ['Add items from the Shop first to see a full cart', 'Drawer + full page views'],
  },
  bookmarks: {
    title: 'Bookmarks', description: 'Everything the user saved, filterable by type. Persists with localStorage and survives refresh.',
    routes: [{ label: 'Bookmarks', path: '/bookmarks' }],
    notes: ['Bookmark from any card to populate this view', 'Tabs show live counts'],
  },
  auth: {
    title: 'Login & Signup', description: 'UI-only authentication screens with show/hide password, remember me, password match validation and social sign-in buttons.',
    routes: [{ label: 'Login', path: '/login' }, { label: 'Signup', path: '/signup' }],
    notes: ['Split layout with artwork panel on desktop', 'Form-only on mobile'],
  },
};
