import { Share2 } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';

export default function ShareButton({ title, withLabel = false, className = '' }) {
  const { notify } = useUI();
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
      notify('Link copied to clipboard');
    } catch {
      notify('Link ready to share');
    }
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${title}`}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-semibold text-ink transition hover:bg-surface-2 active:scale-95 ${withLabel ? 'px-4' : 'w-11'} ${className}`}
    >
      <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
      {withLabel && 'Share'}
    </button>
  );
}
