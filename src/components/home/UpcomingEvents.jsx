import SectionHeader from '../common/SectionHeader.jsx';
import EventCard from '../cards/EventCard.jsx';
import { events } from '../../data/events.js';

export default function UpcomingEvents() {
  const upcoming = events.filter((e) => e.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return (
    <section className="container-page py-14 md:py-20" aria-labelledby="events-heading">
      <SectionHeader eyebrow="On the calendar" title={<span id="events-heading">Upcoming events</span>} description="Conventions, premieres, concerts and watch parties — online and around the world." action="All events" actionTo="/events" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((e) => <EventCard key={e.slug} event={e} />)}
      </div>
    </section>
  );
}
