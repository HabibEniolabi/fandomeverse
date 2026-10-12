import { useMemo, useState } from 'react';
import { CalendarDays, CalendarX, Layers, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import Tabs from '../components/common/Tabs.jsx';
import Select from '../components/common/Select.jsx';
import EventCard from '../components/cards/EventCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Badge from '../components/common/Badge.jsx';
import Artwork from '../components/art/Artwork.jsx';
import { events, formatDate } from '../data/events.js';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

const TODAY = new Date('2026-09-24T12:00:00');
const dateOptions = [
  { value: 'all', label: 'Any date' },
  { value: '30', label: 'Next 30 days' },
  { value: '90', label: 'Next 3 months' },
  { value: '2026', label: 'Rest of 2026' },
];

export default function Events() {
  usePageTitle('Events');
  const [tab, setTab] = useState('upcoming');
  const [category, setCategory] = useState('all');
  const [range, setRange] = useState('all');

  const list = useMemo(
    () =>
      events
        .filter((e) => e.status === tab)
        .filter((e) => category === 'all' || e.category === category)
        .filter((e) => {
          if (range === 'all' || tab === 'past') return true;
          const days = (new Date(e.date + 'T12:00:00') - TODAY) / 86400000;
          if (range === '2026') return e.date.startsWith('2026');
          return days <= Number(range);
        })
        .sort((a, b) => (tab === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))),
    [tab, category, range]
  );
  const featured = events.find((e) => e.featured);

  return (
    <PageContainer>
      <PageHeader eyebrow="Events" title="Where fans meet" description="Conventions, premieres, concerts, tournaments and watch parties — online and around the world." />

      {featured && tab === 'upcoming' && (
        <Link to={`/events/${featured.slug}`} className="group mb-12 grid overflow-hidden rounded-3xl border border-line bg-surface transition hover:shadow-lift md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[340px]">
            <div className="img-zoom absolute inset-0"><Artwork seed={featured.slug} category={featured.category} figure label={featured.title} /></div>
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#17171F]">Featured event</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Badge category={featured.category} />
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{featured.title}</h2>
            <p className="mt-3 text-ink-2">{featured.description}</p>
            <ul className="mt-5 space-y-2 text-[15px] text-ink-2">
              <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted" aria-hidden="true" />{formatDate(featured.date, { day: 'numeric', month: 'long' })} – {formatDate(featured.endDate, { day: 'numeric', month: 'long', year: 'numeric' })}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted" aria-hidden="true" />{featured.location}</li>
            </ul>
            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">View Event <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs tabs={[{ value: 'upcoming', label: 'Upcoming', count: events.filter((e) => e.status === 'upcoming').length }, { value: 'past', label: 'Past', count: events.filter((e) => e.status === 'past').length }]} value={tab} onChange={setTab} label="Event timing" />
        <div className="grid grid-cols-2 gap-3 md:w-[420px]">
          <Select label="Category" hideLabel icon={Layers} value={category} onChange={setCategory} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]} />
          <Select label="Date" hideLabel icon={CalendarDays} value={range} onChange={setRange} options={dateOptions} />
        </div>
      </div>

      <div className="mt-8">
        {list.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <EmptyState icon={CalendarX} title="No events match" description="Try another category or a wider date range." />
        )}
      </div>
    </PageContainer>
  );
}
