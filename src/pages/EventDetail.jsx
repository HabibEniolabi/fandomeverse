import { useParams } from 'react-router-dom';
import { CalendarDays, CalendarPlus, Clock, MapPin, Ticket, Users } from 'lucide-react';
import { events, formatDate, getEvent } from '../data/events.js';
import { getCategory, tint } from '../data/categories.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import BookmarkButton from '../components/common/BookmarkButton.jsx';
import ShareButton from '../components/common/ShareButton.jsx';
import Artwork from '../components/art/Artwork.jsx';
import EventCard from '../components/cards/EventCard.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { useUI } from '../context/UIContext.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from './usePageTitle.js';

function MapCard({ event, color }) {
  return (
    <div className="card overflow-hidden">
      <svg viewBox="0 0 400 200" className="h-40 w-full bg-surface-2" role="img" aria-label={`Map showing ${event.location}`}>
        {Array.from({ length: 12 }, (_, i) => <line key={`h${i}`} x1="0" x2="400" y1={i * 20} y2={i * 20 + (i % 3) * 6} className="stroke-line" strokeWidth="6" />)}
        {Array.from({ length: 14 }, (_, i) => <line key={`v${i}`} y1="0" y2="200" x1={i * 32} x2={i * 32 - 20} className="stroke-line" strokeWidth={i % 4 ? 3 : 8} />)}
        <path d="M0 150 Q120 110 200 140 T400 120" fill="none" stroke={tint(color, 0.45)} strokeWidth="14" />
        <circle cx="200" cy="96" r="26" fill={tint(color, 0.25)} />
        <circle cx="200" cy="96" r="10" fill={color} stroke="#fff" strokeWidth="4" />
      </svg>
      <div className="p-4">
        <p className="font-semibold">{event.location}</p>
        <p className="text-sm text-ink-2">{event.city === 'Online' ? 'Streaming worldwide' : 'Venue opens 1 hour before start'}</p>
      </div>
    </div>
  );
}

export default function EventDetail() {
  const { slug } = useParams();
  const event = getEvent(slug);
  const { notify } = useUI();
  usePageTitle(event?.title);
  if (!event) return <NotFound />;
  const cat = getCategory(event.category);
  const related = events.filter((e) => e.slug !== slug && e.status === 'upcoming').slice(0, 3);
  const dateText = event.endDate
    ? `${formatDate(event.date, { day: 'numeric', month: 'short' })} – ${formatDate(event.endDate, { day: 'numeric', month: 'short', year: 'numeric' })}`
    : formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <section className="relative">
        <div className="relative h-[340px] overflow-hidden sm:h-[420px] lg:h-[480px]">
          <Artwork seed={event.slug} category={event.category} figure label={event.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        </div>
        <div className="container-page absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <Badge category={event.category} tone="solid" icon />
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">{event.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden="true" />{dateText}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{event.location}</span>
          </p>
        </div>
      </section>

      <div className="container-page py-10 md:py-14">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold">About this event</h2>
            <p className="mt-4 text-[17px] leading-[1.8] text-ink/90">{event.long}</p>
            <p className="mt-4 text-[17px] leading-[1.8] text-ink-2">{event.description}</p>

            <h2 className="mt-12 text-2xl font-bold">Schedule</h2>
            <ol className="relative mt-6 space-y-6 border-l-2 border-line pl-7">
              {event.schedule.map((s) => (
                <li key={s.time + s.title} className="relative">
                  <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-bg" style={{ background: cat.color }} aria-hidden="true" />
                  <p className="text-sm font-semibold tabular-nums" style={{ color: cat.color }}>{s.time}</p>
                  <p className="mt-0.5 text-lg font-semibold">{s.title}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="text-sm text-muted">Tickets</p>
              <p className="font-display text-3xl font-bold">{event.price}</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li className="flex gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />{dateText}</li>
                <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />{event.time}</li>
                <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />{event.location}</li>
                <li className="flex gap-3"><Users className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />2,480 fans interested</li>
              </ul>
              <div className="mt-6 grid gap-2">
                {event.status === 'upcoming' ? (
                  <Button icon={Ticket} size="lg" onClick={() => notify('Ticketing is a demo — nothing was booked')}>Get tickets</Button>
                ) : (
                  <Button size="lg" variant="secondary" disabled>Event has ended</Button>
                )}
                <div className="flex gap-2">
                  <Button variant="secondary" icon={CalendarPlus} className="flex-1" onClick={() => notify('Added to your calendar (demo)')}>Add to calendar</Button>
                  <BookmarkButton item={{ kind: 'event', slug: event.slug, title: event.title, category: event.category }} variant="outline" />
                  <ShareButton title={event.title} />
                </div>
              </div>
            </div>
            <MapCard event={event} color={cat.color} />
          </aside>
        </div>
      </div>

      <section className="border-t border-line bg-surface-2/50 py-14">
        <div className="container-page">
          <SectionHeader title="More upcoming events" action="All events" actionTo="/events" />
          <div className="grid gap-5 md:grid-cols-3">{related.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        </div>
      </section>
    </>
  );
}
