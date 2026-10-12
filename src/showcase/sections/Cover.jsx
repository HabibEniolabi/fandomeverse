import { ArrowDown } from 'lucide-react';
import DeviceFrame from '../DeviceFrame.jsx';
import { categories } from '../../data/categories.js';
import { LogoMark } from '../../components/common/Logo.jsx';

const core = ['#F7F4ED', '#FFFFFF', '#17171F', '#6454E8', '#10121B', '#7869F4'];

export default function Cover() {
  return (
    <section id="overview" className="print-page relative overflow-hidden border-b border-line px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-24 lg:pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-semibold text-ink-2">v1.0 · September 2026</span>
        </div>
        <h1 className="mt-10 font-display text-[56px] font-extrabold leading-[0.92] tracking-[-0.04em] sm:text-[96px] lg:text-[128px]">
          FANDOM<span className="text-brand">VERSE</span>
        </h1>
        <p className="mt-6 font-display text-2xl font-semibold sm:text-3xl">Your Universe. Your Fandom.</p>
        <p className="mt-2 text-lg text-ink-2">Hackathon Product UI / UX System</p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
          {[['Platform', 'Responsive web'], ['Stack', 'React · Vite · Tailwind'], ['Screens', '19 routes · 7 universes'], ['Themes', 'Light & Dark']].map(([k, v]) => (
            <div key={k}><p className="text-muted">{k}</p><p className="font-semibold">{v}</p></div>
          ))}
        </div>

        <div className="relative mt-14 grid items-end gap-6 lg:grid-cols-[1fr_230px]">
          <DeviceFrame path="/" title="Home — desktop" />
          <DeviceFrame path="/" device="mobile" title="Home — mobile" className="mx-auto w-[230px] lg:-ml-24 lg:mb-[-24px]" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Core palette</p>
            <div className="flex overflow-hidden rounded-2xl border border-line">
              {core.map((c) => (
                <div key={c} className="h-20 flex-1" style={{ background: c }} title={c}>
                  <span className="sr-only">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Seven universes</p>
            <div className="flex overflow-hidden rounded-2xl">
              {categories.map((c) => (
                <div key={c.slug} className="flex h-20 flex-1 items-end p-2" style={{ background: c.color }}>
                  <span className="text-[10px] font-bold uppercase text-white/90 sm:text-[11px]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href="#foundations" className="print-hide mt-12 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink">
          <ArrowDown className="h-4 w-4" aria-hidden="true" /> Scroll to explore the system
        </a>
      </div>
    </section>
  );
}
