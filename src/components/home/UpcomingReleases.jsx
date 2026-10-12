import SectionHeader from '../common/SectionHeader.jsx';
import ReleaseCard from '../cards/ReleaseCard.jsx';
import { releases } from '../../data/releases.js';

export default function UpcomingReleases() {
  const list = [...releases].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 7);
  return (
    <section className="py-14 md:py-20" aria-labelledby="releases-heading">
      <div className="container-page">
        <SectionHeader eyebrow="Coming soon" title={<span id="releases-heading">Upcoming releases</span>} description="Anime, games, films, series, music, comics and manga — mark your calendar." action="Release calendar" actionTo="/releases" />
      </div>
      <div className="container-page">
        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 sm:scroll-px-6 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
          {list.map((r) => (
            <div key={r.slug} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-auto">
              <ReleaseCard release={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
