import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileMenu from './components/layout/MobileMenu.jsx';
import SearchOverlay from './components/search/SearchOverlay.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import ChatbotLauncher from './components/chatbot/ChatbotLauncher.jsx';
import Toast from './components/common/Toast.jsx';

import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import Category, { CategoriesIndex } from './pages/Category.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Characters from './pages/Characters.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import Media from './pages/Media.jsx';
import Events from './pages/Events.jsx';
import EventDetail from './pages/EventDetail.jsx';
import Releases from './pages/Releases.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import Search from './pages/Search.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';
import Showcase from './showcase/Showcase.jsx';
import ShowcaseScreen from './showcase/ShowcaseScreen.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Product shell: navbar, footer, overlays and the floating chatbot on every product page. */
function SiteLayout() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="min-h-[60vh]"><Outlet /></main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <ChatbotLauncher />
      <Toast />
    </>
  );
}

const siteRoutes = [
  ['/', Home],
  ['/discover', Discover],
  ['/categories', CategoriesIndex],
  ['/category/:slug', Category],
  ['/articles/:slug', ArticleDetail],
  ['/characters', Characters],
  ['/characters/:slug', CharacterDetail],
  ['/media', Media],
  ['/events', Events],
  ['/events/:slug', EventDetail],
  ['/releases', Releases],
  ['/shop', Shop],
  ['/shop/:slug', ProductDetail],
  ['/cart', Cart],
  ['/bookmarks', Bookmarks],
  ['/search', Search],
  ['/about', About],
  ['/contact', Contact],
  ['/login', Login],
  ['/signup', Signup],
];

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/showcase/:screen" element={<ShowcaseScreen />} />
        <Route element={<SiteLayout />}>
          {siteRoutes.map(([path, Page]) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
