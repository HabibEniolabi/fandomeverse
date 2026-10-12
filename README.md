# FandomVerse

**Your Universe. Your Fandom.**

FandomVerse is an entertainment and fandom discovery platform covering seven universes — **Anime, Gaming, Movies, TV Shows, K-Pop, Comics and Manga**. Fans can discover articles, characters, trailers, videos, podcasts, galleries, events, upcoming releases and merchandise, and save anything to their bookmarks.

This repository is the complete, working front-end UI for the hackathon. There is no backend: all content is local, fictional data.

> ### 🎨 Design review: open `/showcase`
> You don't need Figma. **`/showcase`** is a live design presentation inside the app. It includes the cover, foundations (colour, type, spacing, radius, shadows, icons), every component, every desktop screen at 1440px, mobile screens in 390px phone frames, chatbot states, motion and accessibility notes, and a light vs dark comparison.
> The frames are the real app running in iframes, so you can scroll and click inside them.
> To get a static PDF: **Browser → Print → Save as PDF** (A4 landscape print styles are included).

---

## Installation

Requirements: **Node.js 18+** and npm.

```bash
npm install
```

## Running locally

```bash
npm run dev       # start the dev server → http://localhost:5173
npm run build     # production build into /dist
npm run preview   # serve the production build → http://localhost:4173
```

Then open:

- http://localhost:5173/ for the product
- http://localhost:5173/showcase for the design review

> **Deploying:** this is a single-page app using `BrowserRouter`. On Netlify or Vercel, add a rewrite so every path serves `index.html`. On Netlify that means a `_redirects` file containing `/* /index.html 200`.

## Tech stack

| | |
|---|---|
| Framework | React 18 (functional components, JSX only; no TypeScript) |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + CSS variables for theme tokens |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| Fonts | Sora (headings) + Inter (body), bundled with `@fontsource`, so they work offline |

All imagery is **procedurally generated SVG** (`src/components/art/Artwork.jsx`) from a seed and a category palette. That makes it copyright-safe, and no external image hosts are needed. Every franchise and character is fictional.

## Features

- **Light / Dark theme.** Toggle in the navbar, driven by CSS variables. The choice is saved in `localStorage`, `prefers-color-scheme` sets it on the first visit, and a pre-paint script stops the theme from flashing on load. Colours cross-fade smoothly when you switch.
- **Global search.** Press ⌘K / Ctrl+K. It shows recent and trending searches plus suggested categories, and groups live results by type.
- **Fandom Assistant chatbot.** A floating button opens the assistant (a bottom sheet on mobile). It uses scripted intents (`src/data/chatbot.js`) and supports quick replies, a typing state, timestamps, recommendation cards and a clear-conversation action.
- **Cart.** A temporary cart (kept in `sessionStorage`) with a drawer and a full page, quantity steppers, subtotal and total. *FandomVerse is a showcase platform. Purchases are not processed.*
- **Bookmarks.** You can save articles, characters, media, events and merch. Bookmarks are kept in `localStorage`.
- **Responsive layouts** tuned for 1440 / 1280 / 1024 / 768 / 390px, including a slide-in mobile navigation drawer.
- **Accessibility:** semantic landmarks and a skip link, aria-labels on every icon button, visible focus rings, 44px touch targets, labels on every category (never colour alone), arrow-key tabs, Esc to close dialogs, and support for `prefers-reduced-motion`.

## Project structure

```
src/
  components/
    art/        Artwork.jsx (procedural SVG imagery)
    cards/      CategoryCard, ArticleCard, CharacterCard, EventCard, MediaCard,
                ProductCard, ReleaseCard, ContentCard
    cart/       CartDrawer, CartItem, ShowcaseNotice
    chatbot/    ChatbotLauncher, ChatbotPanel, ChatMessage, ChatResult, QuickReply
    common/     Button, IconButton, Badge, SectionHeader, SearchInput, CategoryChip,
                Tabs, Select, BookmarkButton, ShareButton, VideoPlayer, Media, Logo…
    home/       Hero, ExploreUniverse, Trending, FeaturedArticles, PopularCharacters,
                TrailersMedia, UpcomingEvents, Merchandise, UpcomingReleases, CommunityCTA
    layout/     Navbar, CategoriesMenu, MobileMenu, Footer, PageContainer
    media/      Gallery (masonry), Lightbox
    search/     SearchOverlay
    theme/      ThemeToggle
  context/      ThemeContext, CartContext, BookmarkContext, UIContext
  data/         categories, articles, characters, events, media, products, releases,
                chatbot, index (unified search index + trending)
  pages/        Home, Discover, Category, ArticleDetail, Characters, CharacterDetail,
                Media, Events, EventDetail, Releases, Shop, ProductDetail, Cart,
                Bookmarks, Search, About, Contact, Login, Signup, NotFound
  showcase/     Showcase, ShowcaseScreen, ShowcaseLayout, DeviceFrame, screens.js,
                sections/ (Cover, Foundations, ComponentsGallery, Screens,
                Interactions, DarkMode)
  App.jsx       routes
  main.jsx      providers + fonts
  index.css     tokens (light/dark), components layer, print styles
```

## Available routes

| Route | Page |
|---|---|
| `/` | Home |
| `/discover` | Discover (supports `?type=`, `?category=`, `?sort=`, `?q=`) |
| `/categories` | All seven universes |
| `/category/:slug` | Category: `anime`, `gaming`, `movies`, `tv`, `kpop`, `comics`, `manga` |
| `/articles/:slug` | Article, e.g. `/articles/neon-ronin-the-sword-that-remembers` |
| `/characters` | Character directory |
| `/characters/:slug` | Character detail, e.g. `/characters/aiko-vale` |
| `/media` | Media hub + gallery (`?play=<slug>` plays an item) |
| `/events` | Events (Upcoming / Past) |
| `/events/:slug` | Event detail, e.g. `/events/fandomverse-con-lagos-2026` |
| `/releases` | Coming Soon calendar |
| `/shop` | Merchandise catalogue |
| `/shop/:slug` | Product detail, e.g. `/shop/neon-ronin-graphic-tee` |
| `/cart` | Cart |
| `/bookmarks` | Bookmarks |
| `/search` | Search results (`?q=`) |
| `/about` · `/contact` | About · Contact |
| `/login` · `/signup` | Auth UI (no backend) |

**Developer / design routes**

| Route | Purpose |
|---|---|
| `/showcase` | Full design review (cover → foundations → components → screens → interactions → dark mode) |
| `/showcase/home` · `/discover` · `/category` · `/articles` · `/characters` · `/media` · `/events` · `/shop` · `/cart` · `/bookmarks` · `/auth` | Focused review of one screen group: desktop, mobile, light and dark |

Useful URL parameters (the showcase uses these, and you can too): `?theme=dark|light` forces a theme without saving it, and `?chat=open`, `?menu=open` and `?cart=open` open those overlays on load.

## Team workflow

1. **Branch per feature:** `git checkout -b feat/<area>-<short-name>` (for example `feat/shop-filters`).
2. **Content lives in `src/data/`.** To add an article, character, event or product, add an object to the matching file. Pages, search, Discover, bookmarks and the chatbot all pick it up automatically.
3. **Build from existing components.** Use the cards in `components/cards` and the primitives in `components/common` rather than new one-off markup. Colours come from tokens (`bg-surface`, `text-ink-2`, `border-line`, `bg-brand`), so light and dark mode work for free.
4. **Category colour is for accents only:** icons, badges, tints and active states. Never full pages.
5. **Check `/showcase` before opening a PR.** New screens go in `src/showcase/screens.js`, so reviewers can inspect them at desktop and mobile sizes in both themes.
6. **Before merging:** run `npm run build` (it must pass), check the page at 390px and 1440px, try it in dark mode, and try it with the keyboard only.
7. **Design hand-off:** open `/showcase` → Print → Save as PDF to share a static snapshot with judges or stakeholders.

## Notes

- Everything is fictional: franchises, characters, authors, events and prices.
- The About page's team section has placeholder names. Edit `team` in `src/pages/About.jsx` to add yours.
