import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bookmark, Menu, Search, ShoppingBag, User } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import IconButton from '../common/IconButton.jsx';
import Button from '../common/Button.jsx';
import ThemeToggle from '../theme/ThemeToggle.jsx';
import CategoriesMenu from './CategoriesMenu.jsx';
import { navLinks } from './navLinks.js';
import { useUI } from '../../context/UIContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useBookmarks } from '../../context/BookmarkContext.jsx';

export default function Navbar() {
  const { openSearch, openCart, setMenuOpen } = useUI();
  const { count } = useCart();
  const { count: savedCount } = useBookmarks();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (link) => {
    if (link.to.includes('?')) return location.pathname === '/discover' && location.search.includes('type=article');
    if (link.to === '/discover') return location.pathname === '/discover' && !location.search.includes('type=article');
    return undefined;
  };

  return (
    <header className={`sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-md transition-colors duration-200 ${scrolled ? 'border-line' : 'border-transparent'}`}>
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <CategoriesMenu key={link.label} />
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                className={({ isActive: routerActive }) => {
                  const active = isActive(link) ?? routerActive;
                  return `relative inline-flex h-11 items-center rounded-full px-3.5 text-[15px] font-medium transition hover:text-ink ${active ? 'text-ink' : 'text-ink-2'}`;
                }}
              >
                {({ isActive: routerActive }) => (
                  <>
                    {link.label}
                    {(isActive(link) ?? routerActive) && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />}
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-0.5 lg:flex">
          <ThemeToggle />
          <IconButton icon={Search} label="Search (⌘K)" onClick={openSearch} />
          <IconButton icon={Bookmark} label="Bookmarks" to="/bookmarks" badge={savedCount} />
          <IconButton icon={ShoppingBag} label="Cart" onClick={openCart} badge={count} />
          <IconButton icon={User} label="Profile / Sign in" to="/login" />
          <Button to="/signup" size="sm" className="ml-2 hidden xl:inline-flex">Sign Up</Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-0.5 lg:hidden">
          <ThemeToggle />
          <IconButton icon={ShoppingBag} label="Cart" onClick={openCart} badge={count} />
          <IconButton icon={Menu} label="Open menu" onClick={() => setMenuOpen(true)} aria-controls="mobile-menu" />
        </div>
      </div>
    </header>
  );
}
