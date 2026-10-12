import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';
import { formatDate } from '../../data/events.js';

export default function EventCard({ event, variant = 'default' }) {
  const href = `/events/${event.slug}`;
  const d = new Date(event.date + 'T12:00:00');
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'short' });
  const bm = { kind: 'event', slug: event.slug, title: event.title, category: event.category };

  if (variant === 'row') {
    return (
      <article className="card card-hover group relative flex flex-col gap-5 p-4 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-surface-2 text-center">
          <span className="text-[12px] font-semibold uppercase text-brand">{month}</span>
          <span className="font-display text-2xl font-bold leading-none">{day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <Badge category={event.category} />
          <h3 className="mt-2 text-lg font-semibold"><Link to={href} className="after:absolute after:inset-0">{event.title}</Link></h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-2"><MapPin className="h-4 w-4" aria-hidden="true" />{event.location}</p>
        </div>
        <ArrowRight className="hidden h-5 w-5 text-ink-2 transition group-hover:translate-x-1 group-hover:text-brand sm:block" aria-hidden="true" />
      </article>
    );
  }

  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <Media seed={event.slug} category={event.category} ratio="aspect-[16/10]" rounded="rounded-none" label={event.title}>
          <div className="absolute left-4 top-4 flex h-16 w-14 flex-col items-center justify-center rounded-xl bg-white text-center text-[#17171F] shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#6454E8]">{month}</span>
            <span className="font-display text-2xl font-bold leading-none">{day}</span>
          </div>
          {event.status === 'past' && <span className="absolute bottom-3 left-4 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">Past event</span>}
        </Media>
      </Link>
      <BookmarkButton item={bm} className="absolute right-3 top-3" />
      <div className="flex flex-1 flex-col p-5">
        <Badge category={event.category} />
        <h3 className="mt-3 text-lg font-semibold leading-snug text-ink transition group-hover:text-brand">
          <Link to={href}>{event.title}</Link>
        </h3>
        <ul className="mt-3 space-y-1.5 text-[14px] text-ink-2">
          <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />{formatDate(event.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {event.time}</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" /><span className="line-clamp-1">{event.location}</span></li>
        </ul>
        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-ink-2">{event.description}</p>
        <Link to={href} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-semibold text-brand">
          View Event <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
