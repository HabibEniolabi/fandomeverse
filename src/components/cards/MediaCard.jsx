import { Headphones, Play } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';

const typeLabel = { trailer: 'Trailer', interview: 'Interview', fanvideo: 'Fan Video', podcast: 'Podcast' };

/** Video / audio card. `dark` renders for navy sections. `onPlay` opens the player. */
export default function MediaCard({ item, onPlay, dark = false, active = false, layout = 'stack' }) {
  const isAudio = item.type === 'podcast';
  const Icon = isAudio ? Headphones : Play;
  return (
    <article className={`group relative flex h-full ${layout === 'row' ? 'flex-col lg:flex-row lg:items-center lg:gap-4' : 'flex-col'} ${active ? 'rounded-2xl ring-2 ring-brand ring-offset-4 ring-offset-bg' : ''}`}>
      <button type="button" onClick={() => onPlay?.(item)} className={`block text-left ${layout === 'row' ? 'w-full lg:w-44 lg:shrink-0' : 'w-full'}`} aria-label={`Play ${item.title}`}>
        <Media seed={item.slug} category={item.category} ratio="aspect-video" label={item.title}>
          <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#17171F] shadow-lift transition duration-200 group-hover:scale-110">
              <Icon className={`h-5 w-5 ${isAudio ? '' : 'ml-0.5 fill-current'}`} aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[12px] font-semibold tabular-nums text-white">{item.duration}</span>
        </Media>
      </button>
      <BookmarkButton item={{ kind: 'media', slug: item.slug, title: item.title, category: item.category }} className={`absolute right-2.5 top-2.5 !h-9 !w-9 ${layout === 'row' ? 'lg:hidden' : ''}`} />
      <div className={layout === 'row' ? 'pt-3.5 lg:min-w-0 lg:flex-1 lg:pt-0' : 'pt-3.5'}>
        <div className="flex items-center gap-2">
          <Badge category={item.category} tone="plain" />
          <span className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${dark ? 'text-white/50' : 'text-muted'}`}>{typeLabel[item.type]}</span>
        </div>
        <h3 className={`mt-1.5 line-clamp-2 text-[16px] font-semibold leading-snug ${dark ? 'text-white' : 'text-ink'}`}>{item.title}</h3>
        <p className={`mt-1 text-[13px] ${dark ? 'text-white/60' : 'text-muted'}`}>{item.status} · {item.views} views</p>
      </div>
    </article>
  );
}
