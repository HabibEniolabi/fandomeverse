import { getCategory, tint } from '../../data/categories.js';
import CategoryIcon from './CategoryIcon.jsx';

/** Selectable filter chip. Pass `category` for a colour-coded fandom chip, or just `label`. */
export default function CategoryChip({ category, label, active = false, onClick, count, className = '' }) {
  const cat = category ? getCategory(category) : null;
  const activeStyle = cat && active ? { background: tint(cat.color, 0.14), borderColor: tint(cat.color, 0.5), color: cat.color } : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={activeStyle}
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition duration-200 ${
        active && !cat ? 'border-ink bg-ink text-bg' : active ? '' : 'border-line bg-surface text-ink-2 hover:border-ink/25 hover:text-ink'
      } ${className}`}
    >
      {cat && <CategoryIcon slug={cat.slug} className="h-4 w-4" style={{ color: cat.color }} />}
      {label || cat?.name}
      {count != null && <span className="text-xs opacity-60">{count}</span>}
    </button>
  );
}
