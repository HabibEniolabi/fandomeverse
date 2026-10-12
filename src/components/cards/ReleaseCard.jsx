import { CalendarDays } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';
import { formatDate } from '../../data/events.js';

function daysUntil(iso) {
  const today = new Date('2026-09-24T12:00:00');
  return Math.max(0, Math.round((new Date(iso + 'T12:00:00') - today) / 86400000));
}

export default function ReleaseCard({ release, variant = 'default' }) {
  const days = daysUntil(release.date);
  if (variant === 'row') {
    return (
      <article id={release.slug} className="card group relative flex scroll-mt-28 items-center gap-4 p-3 pr-4 sm:gap-5">
        <div className="w-24 shrink-0 sm:w-32">
          <Media seed={release.slug} category={release.category} ratio="aspect-[4/3]" rounded="rounded-xl" label={release.title} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge category={release.category}>{release.kind}</Badge>
            <span className="text-[12px] font-semibold text-muted">{release.note}</span>
          </div>
          <h3 className="mt-2 line-clamp-1 text-[17px] font-semibold">{release.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-2"><CalendarDays className="h-4 w-4" aria-hidden="true" />{formatDate(release.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="hidden text-right sm:block">
          <p className="font-display text-2xl font-bold">{days}</p>
          <p className="text-xs text-muted">days to go</p>
        </div>
        <BookmarkButton item={{ kind: 'media', slug: release.slug, title: release.title, category: release.category }} variant="plain" />
      </article>
    );
  }
  return (
    <article id={release.slug} className="group relative flex h-full scroll-mt-28 flex-col">
      <Media seed={release.slug} category={release.category} ratio="aspect-[3/4]" label={release.title}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#17171F]">{release.status}</span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-3xl font-bold leading-none text-white">{formatDate(release.date, { day: 'numeric' })}</p>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-white/80">{formatDate(release.date, { month: 'short', year: 'numeric' })}</p>
        </div>
      </Media>
      <div className="pt-3.5">
        <Badge category={release.category} tone="plain">{release.kind}</Badge>
        <h3 className="mt-1.5 line-clamp-2 text-[16px] font-semibold leading-snug">{release.title}</h3>
        <p className="mt-0.5 text-[13px] text-muted">{release.note} · in {days} days</p>
      </div>
    </article>
  );
}
