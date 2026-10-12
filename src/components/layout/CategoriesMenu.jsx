import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { categories, tint } from '../../data/categories.js';
import CategoryIcon from '../common/CategoryIcon.jsx';

/** Desktop "Categories" dropdown with all seven universes. */
export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const active = pathname.startsWith('/category');

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`relative inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium transition hover:text-ink ${active || open ? 'text-ink' : 'text-ink-2'}`}
      >
        Categories
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        {active && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />}
      </button>
      {open && (
        <div className="animate-fade-up absolute left-1/2 top-[calc(100%+10px)] z-50 w-[560px] -translate-x-1/2 rounded-2xl border border-line bg-elevated p-3 shadow-lift">
          <div className="grid grid-cols-2 gap-1">
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-surface-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: tint(c.color, 0.14), color: c.color }}>
                  <CategoryIcon slug={c.slug} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-ink">{c.name}</span>
                  <span className="block text-[13px] text-ink-2">{c.tagline}</span>
                </span>
              </Link>
            ))}
            <Link to="/discover" className="group flex items-center justify-between gap-3 rounded-xl bg-surface-2 p-3 text-[15px] font-semibold text-ink">
              Discover everything
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
