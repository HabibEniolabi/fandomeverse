import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import Tabs from '../components/common/Tabs.jsx';
import VideoPlayer from '../components/common/VideoPlayer.jsx';
import MediaCard from '../components/cards/MediaCard.jsx';
import Badge from '../components/common/Badge.jsx';
import BookmarkButton from '../components/common/BookmarkButton.jsx';
import ShareButton from '../components/common/ShareButton.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Gallery from '../components/media/Gallery.jsx';
import { gallery, getMedia, media, mediaTypes } from '../data/media.js';
import usePageTitle from './usePageTitle.js';

const typeLabel = { trailer: 'Trailer', interview: 'Interview', fanvideo: 'Fan Video', podcast: 'Podcast' };

export default function Media() {
  usePageTitle('Trailers & Media');
  const [params, setParams] = useSearchParams();
  const [type, setType] = useState('all');
  const current = getMedia(params.get('play')) || media[0];
  const list = useMemo(() => media.filter((m) => type === 'all' || m.type === type), [type]);

  const play = (item) => {
    setParams({ play: item.slug }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageContainer>
        <PageHeader eyebrow="Media hub" title="Trailers & media" description="Trailers, interviews, fan-made videos and podcasts from every universe." />
        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <VideoPlayer item={current} autoPlay={Boolean(params.get('play'))} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge category={current.category} icon />
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{typeLabel[current.type]}</span>
            </div>
            <h2 className="mt-4 text-[28px] font-bold leading-tight">{current.title}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{current.description}</p>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
              {[['Duration', current.duration], ['Views', current.views], ['Status', current.status]].map(([k, v]) => (
                <div key={k}><dt className="text-[13px] text-muted">{k}</dt><dd className="mt-0.5 text-[15px] font-semibold">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-6 flex gap-2">
              <BookmarkButton item={{ kind: 'media', slug: current.slug, title: current.title, category: current.category }} variant="outline" withLabel />
              <ShareButton title={current.title} withLabel />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Tabs tabs={mediaTypes.map((t) => ({ ...t, count: t.value === 'all' ? media.length : media.filter((m) => m.type === t.value).length }))} value={type} onChange={setType} label="Media type" />
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((m) => <MediaCard key={m.slug} item={m} onPlay={play} active={m.slug === current.slug} />)}
          </div>
        </div>
      </PageContainer>

      <section id="gallery" className="scroll-mt-24 border-t border-line bg-surface-2/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Gallery" title="Key art & concepts" description="Select any image to open it full-screen. Use arrow keys to browse." />
          <Gallery images={gallery} columns="columns-2 md:columns-3" />
        </div>
      </section>
    </>
  );
}
