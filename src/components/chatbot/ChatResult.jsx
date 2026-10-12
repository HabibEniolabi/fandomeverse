import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Play } from 'lucide-react';
import Artwork from '../art/Artwork.jsx';
import CategoryIcon from '../common/CategoryIcon.jsx';
import { getCategory, tint } from '../../data/categories.js';
import { events, formatDate } from '../../data/events.js';
import { products, formatPrice } from '../../data/products.js';
import { media } from '../../data/media.js';
import { characters } from '../../data/characters.js';
import { releases } from '../../data/releases.js';

function Row({ to, onNavigate, art, title, sub, meta }) {
  return (
    <Link to={to} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-2 pr-3 transition hover:border-brand/40">
      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">{art}</span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-1 text-[13px] font-semibold text-ink">{title}</span>
        <span className="line-clamp-1 flex items-center gap-1 text-[12px] text-muted">{sub}</span>
      </span>
      {meta && <span className="text-[13px] font-bold text-ink">{meta}</span>}
    </Link>
  );
}

/** Recommendation cards rendered inside bot messages. */
export default function ChatResult({ result, onNavigate }) {
  if (!result) return null;

  if (result.kind === 'category') {
    const c = getCategory(result.slug);
    return (
      <Link to={`/category/${c.slug}`} onClick={onNavigate} className="group block overflow-hidden rounded-xl border border-line bg-surface transition hover:border-brand/40">
        <div className="h-24"><Artwork seed={`${c.slug}-chat`} category={c.slug} label={`${c.name} artwork`} /></div>
        <div className="flex items-center gap-3 p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: tint(c.color, 0.14), color: c.color }}>
            <CategoryIcon slug={c.slug} className="h-[18px] w-[18px]" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{c.name}</span>
            <span className="block text-[12px] text-muted">{c.stats.stories} stories · {c.stats.characters} characters</span>
          </span>
          <ArrowRight className="h-4 w-4 text-brand transition group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </Link>
    );
  }

  const lists = {
    events: () => events.filter((e) => e.status === 'upcoming').slice(0, 3).map((e) => (
      <Row key={e.slug} to={`/events/${e.slug}`} onNavigate={onNavigate} art={<Artwork seed={e.slug} category={e.category} label="" />} title={e.title}
        sub={<><CalendarDays className="h-3 w-3" aria-hidden="true" />{formatDate(e.date, { day: 'numeric', month: 'short' })} <MapPin className="ml-1 h-3 w-3" aria-hidden="true" />{e.city}</>} />
    )),
    products: () => products.slice(0, 3).map((p) => (
      <Row key={p.slug} to={`/shop/${p.slug}`} onNavigate={onNavigate} art={<Artwork seed={p.slug} category={p.category} variant="product" productType={p.art} label="" />} title={p.name} sub={p.productType} meta={formatPrice(p.price)} />
    )),
    media: () => media.filter((m) => m.type === 'trailer').slice(0, 3).map((m) => (
      <Row key={m.slug} to={`/media?play=${m.slug}`} onNavigate={onNavigate} art={<span className="relative block h-full w-full"><Artwork seed={m.slug} category={m.category} label="" /><Play className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 fill-white text-white" /></span>} title={m.title} sub={`${m.duration} · ${m.status}`} />
    )),
    characters: () => characters.slice(0, 3).map((c) => (
      <Row key={c.slug} to={`/characters/${c.slug}`} onNavigate={onNavigate} art={<Artwork seed={c.slug} category={c.category} variant="portrait" label="" />} title={c.name} sub={c.series} />
    )),
    releases: () => releases.slice(0, 3).map((r) => (
      <Row key={r.slug} to={`/releases#${r.slug}`} onNavigate={onNavigate} art={<Artwork seed={r.slug} category={r.category} label="" />} title={r.title} sub={`${r.kind} · ${formatDate(r.date, { day: 'numeric', month: 'short' })}`} />
    )),
  };
  const render = lists[result.kind];
  return render ? <div className="space-y-2">{render()}</div> : null;
}
