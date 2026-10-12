import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import Artwork from '../art/Artwork.jsx';

const toSeconds = (d) => d.split(':').reduce((acc, n) => acc * 60 + Number(n), 0);
const fmt = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return h ? `${h}:${m.toString().padStart(2, '0')}:${sec}` : `${m}:${sec}`;
};

/** A demo media player (no real video). Play/pause, scrub, mute — all keyboard accessible. */
export default function VideoPlayer({ item, autoPlay = false, className = '' }) {
  const total = toSeconds(item.duration);
  const [playing, setPlaying] = useState(autoPlay);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const raf = useRef();

  useEffect(() => {
    setTime(0);
    setPlaying(autoPlay);
  }, [item.slug, autoPlay]);

  useEffect(() => {
    if (!playing) return undefined;
    raf.current = setInterval(() => setTime((t) => (t + 1 >= total ? (setPlaying(false), total) : t + 1)), 1000);
    return () => clearInterval(raf.current);
  }, [playing, total]);

  const pct = (time / total) * 100;

  return (
    <div className={`group/player relative overflow-hidden rounded-2xl bg-black sm:rounded-3xl ${className}`}>
      <div className={`aspect-video transition duration-700 ${playing ? 'scale-[1.03]' : ''}`}>
        <Artwork seed={item.slug} category={item.category} figure label={item.title} />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 transition-opacity ${playing ? 'opacity-60' : 'opacity-100'}`} />
      {!playing && (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${item.title}`} className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#17171F] shadow-lift transition duration-200 hover:scale-110 sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
          </span>
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
        <div className="relative mb-2 h-1.5 rounded-full bg-white/25">
          <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${pct}%` }} />
          <input
            type="range"
            min={0}
            max={total}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            aria-label="Seek"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="flex items-center gap-1 text-white">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15">
            {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15">
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <span className="ml-1 text-[13px] font-medium tabular-nums text-white/85">{fmt(time)} / {item.duration}</span>
          <span className="ml-auto hidden rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider sm:inline">Demo preview</span>
          <button type="button" aria-label="Fullscreen (demo)" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15">
            <Maximize2 className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
