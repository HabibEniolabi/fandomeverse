import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';

const bmKind = { article: 'article', video: 'media', audio: 'media', release: 'media', character: 'character', event: 'event', product: 'product', gallery: 'media' };

/** Generic discovery card for mixed feeds (Trending, Discover). */
export default function ContentCard({ item, type, info }) {
  const isVideo = item.kind === 'video';
  const variant = item.kind === 'character' ? 'portrait' : item.kind === 'product' ? 'product' : 'scene';
  const ratio = item.kind === 'character' ? 'aspect-[4/5]' : 'aspect-[4/3]';
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Link to={item.href} tabIndex={-1} aria-hidden="true">
        <Media seed={item.slug} category={item.category} variant={variant} productType={item.raw?.art} ratio={ratio} rounded="rounded-none" label={item.title}>
          {isVideo && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#17171F] shadow-lift transition group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </span>
            </span>
          )}
        </Media>
      </Link>
      <BookmarkButton item={{ kind: bmKind[item.kind] || 'article', slug: item.slug, title: item.title, category: item.category }} className="absolute right-3 top-3 z-10" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge category={item.category} />
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">{type}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-[17px] font-semibold leading-snug text-ink transition group-hover:text-brand">
          <Link to={item.href} className="after:absolute after:inset-0 after:content-['']">{item.title}</Link>
        </h3>
        <p className="mt-auto pt-3 text-[13px] text-muted">{info}</p>
      </div>
    </article>
  );
}
