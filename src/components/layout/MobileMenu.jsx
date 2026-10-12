import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bookmark, CalendarDays, Compass, Home, Newspaper, Search, ShoppingBag, User, X, PlayCircle, Users } from 'lucide-react';
import { categories, tint } from '../../data/categories.js';
import { useUI } from '../../context/UIContext.jsx';
import { useBookmarks } from '../../context/BookmarkContext.jsx';
import Logo from '../common/Logo.jsx';
import Button from '../common/Button.jsx';
import CategoryIcon from '../common/CategoryIcon.jsx';
import ThemeToggle from '../theme/ThemeToggle.jsx';

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/discover?type=article', label: 'Articles', icon: Newspaper },
  { to: '/characters', label: 'Characters', icon: Users },
  { to: '/media', label: 'Media', icon: PlayCircle },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
];

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, openSearch } = useUI();
  const { count } = useBookmarks();
  const { pathname, search } = useLocation();
  const closeRef = useRef(null);
  const close = () => setMenuOpen(false);

  const lastLoc = useRef(pathname + search);
  useEffect(() => {
    if (lastLoc.current !== pathname + search) close();
    lastLoc.current = pathname + search;
  }, [pathname, search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" id="mobile-menu">
      <button type="button" aria-label="Close menu" className="animate-fade-in absolute inset-0 bg-[#0B0C12]/50" onClick={close} tabIndex={-1} />
      <div className="animate-slide-in-right absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-bg shadow-lift">
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
          <Logo />
          <button ref={closeRef} type="button" onClick={close} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <button
            type="button"
            onClick={() => { close(); openSearch(); }}
            className="mb-5 flex h-12 w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 text-left text-muted"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            Search across FandomVerse...
          </button>

          <nav aria-label="Mobile" className="flex flex-col">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex h-12 items-center gap-3 rounded-xl px-3 text-[16px] font-semibold transition ${isActive && !to.includes('?') ? 'bg-surface-2 text-ink' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'}`
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <p className="eyebrow mb-3 mt-7 !text-muted">Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="flex h-12 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-sm font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: tint(c.color, 0.14), color: c.color }}>
                  <CategoryIcon slug={c.slug} className="h-4 w-4" />
                </span>
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2">
            <span className="text-sm font-semibold">Appearance</span>
            <ThemeToggle variant="switch" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-line p-5">
          <Button to="/bookmarks" variant="secondary" icon={Bookmark}>Saved{count ? ` (${count})` : ''}</Button>
          <Button to="/login" variant="secondary" icon={User}>Sign in</Button>
          <Button to="/signup" className="col-span-2">Sign Up — it’s free</Button>
        </div>
      </div>
    </div>
  );
}
