import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { tint } from '../../data/categories.js';
import CategoryIcon from '../common/CategoryIcon.jsx';

/** Fandom universe card — icon, name, short description, arrow and colour accent. */
export default function CategoryCard({ category, compact = false }) {
  const { slug, name, tagline, color, stats } = category;
  return (
    <Link
      to={`/category/${slug}`}
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
      style={{ '--cat': color, '--cat-tint': tint(color, 0.13) }}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--cat)] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--cat-tint)] text-[var(--cat)] transition-transform duration-300 group-hover:scale-105">
          <CategoryIcon slug={slug} className="h-6 w-6" />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-2 transition duration-200 group-hover:border-transparent group-hover:bg-[var(--cat)] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
        </span>
      </div>
      <h3 className={`mt-auto pt-8 font-display font-bold text-ink ${compact ? 'text-lg' : 'text-xl'}`}>{name}</h3>
      <p className="mt-1 text-[15px] leading-snug text-ink-2">{tagline}</p>
      {!compact && stats && <p className="mt-4 text-[13px] font-medium text-muted">{stats.stories} stories · {stats.fans} fans</p>}
    </Link>
  );
}
