import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext.jsx';
import { useUI } from '../../context/UIContext.jsx';

/** Toggles a bookmark with a small pop animation. `item` = { kind, slug, title, category } */
export default function BookmarkButton({ item, variant = 'overlay', withLabel = false, className = '' }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { notify } = useUI();
  const [anim, setAnim] = useState(false);
  const id = `${item.kind}:${item.slug}`;
  const saved = isBookmarked(id);
  const Icon = saved ? BookmarkCheck : Bookmark;

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark({ ...item, id });
    setAnim(true);
    notify(saved ? 'Removed from bookmarks' : 'Saved to bookmarks');
  };

  const styles = {
    overlay: `h-10 w-10 bg-white/90 text-[#17171F] shadow-soft backdrop-blur hover:bg-white ${saved ? '!text-brand' : ''}`,
    plain: `h-10 w-10 text-ink-2 hover:bg-surface-2 hover:text-ink ${saved ? '!text-brand' : ''}`,
    outline: `h-11 border border-line bg-surface text-ink hover:bg-surface-2 ${withLabel ? 'px-4 gap-2' : 'w-11'} ${saved ? '!border-brand/40 !text-brand' : ''}`,
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from bookmarks` : `Bookmark ${item.title}`}
      title={saved ? 'Saved' : 'Bookmark'}
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold transition duration-200 active:scale-90 ${styles} ${className}`}
    >
      <Icon className={`h-[18px] w-[18px] ${anim ? 'animate-pop' : ''} ${saved ? 'fill-current' : ''}`} onAnimationEnd={() => setAnim(false)} aria-hidden="true" />
      {withLabel && <span>{saved ? 'Saved' : 'Bookmark'}</span>}
    </button>
  );
}
