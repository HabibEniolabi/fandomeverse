import { getCategory, tint } from '../../data/categories.js';
import CategoryIcon from './CategoryIcon.jsx';

/**
 * Category badge — colour + icon/dot + text, so meaning never relies on colour alone.
 * tone: 'soft' (tinted bg) | 'solid' (for use on images) | 'plain'
 */
export default function Badge({ category, children, tone = 'soft', icon = false, className = '' }) {
  if (!category) {
    return (
      <span className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-ink-2 ${className}`}>
        {children}
      </span>
    );
  }
  const cat = getCategory(category);
  const style =
    tone === 'solid'
      ? { background: 'rgba(255,255,255,0.92)', color: '#17171F' }
      : tone === 'plain'
        ? { color: cat.color }
        : { background: tint(cat.color, 0.12), color: cat.color };
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.06em] ${tone === 'plain' ? '' : 'px-2.5 py-1'} ${className}`}
      style={style}
    >
      {icon ? (
        <CategoryIcon slug={cat.slug} className="h-3.5 w-3.5" style={tone === 'solid' ? { color: cat.color } : undefined} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} aria-hidden="true" />
      )}
      {children || cat.name}
    </span>
  );
}
