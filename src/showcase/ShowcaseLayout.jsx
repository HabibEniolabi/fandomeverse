import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Blocks, ExternalLink, Layers, Menu, Monitor, MousePointerClick, Moon, Palette, Printer, Smartphone, X, LayoutGrid } from 'lucide-react';
import Logo from '../components/common/Logo.jsx';
import ThemeToggle from '../components/theme/ThemeToggle.jsx';
import SearchOverlay from '../components/search/SearchOverlay.jsx';
import CartDrawer from '../components/cart/CartDrawer.jsx';
import Toast from '../components/common/Toast.jsx';
import { screenGroups } from './screens.js';

export const showcaseNav = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'foundations', label: 'Foundations', icon: Palette },
  { id: 'components', label: 'Components', icon: Blocks },
  { id: 'desktop', label: 'Desktop Screens', icon: Monitor },
  { id: 'mobile', label: 'Mobile Screens', icon: Smartphone },
  { id: 'interactions', label: 'Interactions', icon: MousePointerClick },
  { id: 'dark-mode', label: 'Dark Mode', icon: Moon },
];

/** Sidebar + main layout for the design review. `sections` enables scroll-spy on /showcase. */
export default function ShowcaseLayout({ children, activeScreen, sections = true }) {
  const [active, setActive] = useState('overview');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = 'FandomVerse — UI / UX Showcase';
  }, []);

  useEffect(() => {
    if (!sections) return undefined;
    const els = showcaseNav.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (id) => {
    setOpen(false);
    if (!sections) {
      window.location.href = `/showcase#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-[72px] items-center justify-between px-5">
        <Logo to="/showcase" />
        <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2 lg:hidden" aria-label="Close navigation"><X className="h-5 w-5" /></button>
      </div>
      <p className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Design review</p>
      <nav className="flex-1 overflow-y-auto px-3 pb-6" aria-label="Showcase sections">
        <ul className="space-y-0.5">
          {showcaseNav.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={sections && active === id ? 'true' : undefined}
                className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[14px] font-medium transition ${sections && active === id ? 'bg-brand/10 text-brand' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />{label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Screen deep-dives</p>
        <ul className="space-y-0.5">
          {Object.entries(screenGroups).map(([key, g]) => (
            <li key={key}>
              <Link to={`/showcase/${key}`} onClick={() => setOpen(false)} className={`flex h-9 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition ${activeScreen === key ? 'bg-brand/10 text-brand' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'}`}>
                <Layers className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />{g.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-3 border-t border-line p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink-2">Theme</span>
          <ThemeToggle variant="switch" />
        </div>
        <button type="button" onClick={() => window.print()} className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface text-[13px] font-semibold hover:bg-surface-2">
          <Printer className="h-4 w-4" aria-hidden="true" /> Print / Save as PDF
        </button>
        <Link to="/" className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-brand text-[13px] font-semibold text-white hover:bg-brand-hover">
          Open live site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg">
      <aside className="print-hide fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-surface lg:block">{sidebar}</aside>
      {open && (
        <div className="print-hide fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Showcase navigation">
          <button type="button" tabIndex={-1} aria-label="Close" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="animate-fade-in absolute inset-y-0 left-0 w-72 bg-surface shadow-lift">{sidebar}</div>
        </div>
      )}
      <header className="print-hide sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2" aria-label="Open showcase navigation"><Menu className="h-5 w-5" /></button>
        <span className="font-display text-sm font-bold">FandomVerse · UI Showcase</span>
        <ThemeToggle />
      </header>
      <main className="showcase-main lg:ml-64">{children}</main>
      <SearchOverlay />
      <CartDrawer />
      <Toast />
    </div>
  );
}

/** A printable section block with consistent heading. */
export function ShowcaseSection({ id, index, title, description, children, className = '' }) {
  return (
    <section id={id} className={`print-page scroll-mt-16 border-b border-line px-5 py-14 sm:px-8 lg:scroll-mt-0 lg:px-12 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[13px] font-semibold tabular-nums text-brand">{index}</p>
            <h2 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
          </div>
          {description && <p className="max-w-md text-[15px] leading-relaxed text-ink-2">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A labelled specimen box used across the component gallery. */
export function Specimen({ title, note, children, className = '', bodyClass = '' }) {
  return (
    <div className={`print-block overflow-hidden rounded-2xl border border-line bg-surface ${className}`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-3">
        <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">{title}</h3>
        {note && <p className="text-[12px] text-muted">{note}</p>}
      </div>
      <div className={`bg-bg p-5 sm:p-6 ${bodyClass}`} style={{ backgroundImage: 'radial-gradient(rgb(var(--line)) 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        {children}
      </div>
    </div>
  );
}
