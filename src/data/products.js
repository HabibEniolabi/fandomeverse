export const products = [
  { slug: 'neon-ronin-graphic-tee', name: 'Neon Ronin Graphic Tee', category: 'anime', productType: 'Apparel', art: 'tee', price: 32,
    description: 'Heavyweight organic cotton tee with a screen-printed Oboro skyline and Aiko Vale’s blade crest on the back.', badge: 'Bestseller', rating: 4.8 },
  { slug: 'pixel-vanguard-figure', name: 'Pixel Vanguard Figure', category: 'gaming', productType: 'Collectibles', art: 'figure', price: 64,
    description: 'A 16cm hand-painted Sable Quinn figure with interchangeable glider wings and display base.', badge: 'Limited', rating: 4.9 },
  { slug: 'solar-district-poster', name: 'Solar District Poster', category: 'movies', productType: 'Art Prints', art: 'poster', price: 24,
    description: 'Giclée print of the official golden-hour key art on 250gsm matte paper. 50 × 70cm.', rating: 4.7 },
  { slug: 'echo-stage-light-stick', name: 'Echo Stage Light Stick', category: 'kpop', productType: 'Accessories', art: 'lightstick', price: 45,
    description: 'Official ECHO//7 light stick v2 with Bluetooth concert sync and seven colour modes.', badge: 'New', rating: 4.9 },
  { slug: 'chronicle-zero-hoodie', name: 'Chronicle Zero Hoodie', category: 'tv', productType: 'Apparel', art: 'hoodie', price: 68,
    description: 'Brushed-fleece hoodie embroidered with the Zero Archive index mark.', rating: 4.6 },
  { slug: 'iron-meridian-omnibus', name: 'Iron Meridian Omnibus Vol. 1', category: 'comics', productType: 'Books', art: 'book', price: 54,
    description: 'Collects Brass Dawn issues 1–24 in a cloth-bound hardcover with new cover art.', rating: 4.8 },
  { slug: 'tidebound-art-book', name: 'Tidebound Art Book', category: 'manga', productType: 'Books', art: 'book', price: 38,
    description: 'Ink wash illustrations, storyboards and commentary from mangaka Rei Tsukino.', badge: 'New', rating: 4.9 },
  { slug: 'lumina-prism-vinyl', name: 'LUMINA “Prism” Vinyl', category: 'kpop', productType: 'Music', art: 'vinyl', price: 36,
    description: 'Translucent violet 12" pressing with a 20-page photo booklet.', rating: 4.7 },
  { slug: 'skyfall-halcyon-cap', name: 'Skyfall Halcyon Cap', category: 'gaming', productType: 'Apparel', art: 'cap', price: 26,
    description: 'Six-panel cap with the Team Halcyon drop insignia.', rating: 4.5 },
  { slug: 'moonlit-academy-mug', name: 'Moonlit Academy Mug', category: 'anime', productType: 'Homeware', art: 'mug', price: 18,
    description: 'Colour-changing ceramic mug — the crescent appears when your tea is hot.', rating: 4.6 },
];

export const productTypes = ['Apparel', 'Collectibles', 'Art Prints', 'Accessories', 'Books', 'Music', 'Homeware'];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const formatPrice = (n) => `$${n.toFixed(2)}`;
