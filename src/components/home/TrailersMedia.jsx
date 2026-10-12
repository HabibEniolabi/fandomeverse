import { useState } from 'react';
import SectionHeader from '../common/SectionHeader.jsx';
import MediaCard from '../cards/MediaCard.jsx';
import VideoPlayer from '../common/VideoPlayer.jsx';
import Badge from '../common/Badge.jsx';
import { media } from '../../data/media.js';

/** Navy "screening room" section — intentionally dark in both themes. */
export default function TrailersMedia() {
  const trailers = media.filter((m) => m.type === 'trailer' || m.type === 'interview').slice(0, 4);
  const [current, setCurrent] = useState(trailers[0]);
  return (
    <section className="bg-navy py-14 text-white md:py-20 dark:bg-[#0B0D16]" aria-labelledby="media-heading">
      <div className="container-page">
        <SectionHeader inverted eyebrow="Now showing" title={<span id="media-heading">Trailers &amp; media</span>} description="Trailers, interviews and fan-made videos from across the FandomVerse." action="Open media hub" actionTo="/media" />
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <VideoPlayer item={current} />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Badge category={current.category} tone="solid" icon />
              <span className="text-sm text-white/60">{current.status}</span>
            </div>
            <h3 className="mt-3 text-2xl font-bold sm:text-[28px]">{current.title}</h3>
            <p className="mt-2 max-w-xl text-white/70">{current.description}</p>
          </div>
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">Up next</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {trailers.filter((t) => t.slug !== current.slug).slice(0, 3).map((m) => (
                <MediaCard key={m.slug} item={m} dark layout="row" onPlay={setCurrent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
