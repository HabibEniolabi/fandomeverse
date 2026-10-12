import {
  ArrowRight, ArrowUpDown, Bell, BookOpen, Bookmark, BookmarkCheck, CalendarDays, ChevronRight, Clock, Compass, Download, ExternalLink, Film, Flame,
  Gamepad2, Heart, Home, Image, MapPin, Menu, MessageCircle, Mic2, Minus, Moon, Newspaper, Play, Plus, Search, Send, Settings, Share2, ShoppingBag,
  ShoppingCart, SlidersHorizontal, Sparkles, Star, Sun, Trash2, Tv, User, Users, Volume2, X,
} from 'lucide-react';
import { ShowcaseSection, Specimen } from '../ShowcaseLayout.jsx';
import { categories, tint } from '../../data/categories.js';
import CategoryIcon from '../../components/common/CategoryIcon.jsx';

const light = [
  ['Page background', '#F7F4ED', 'bg'], ['Surface', '#FFFFFF', 'surface'], ['Secondary surface', '#F0EEE8', 'surface-2'],
  ['Primary text', '#17171F', 'ink'], ['Secondary text', '#686875', 'ink-2'], ['Muted', '#92909A', 'muted'],
  ['Border', '#DEDAD1', 'line'], ['Primary violet', '#6454E8', 'brand'], ['Primary hover', '#5646D5', 'brand-hover'],
];
const dark = [
  ['Page', '#10121B', 'bg'], ['Surface', '#181B27', 'surface'], ['Secondary surface', '#202330', 'surface-2'], ['Elevated', '#272A38', 'elevated'],
  ['Primary text', '#F8F8FA', 'ink'], ['Secondary text', '#A7A8B3', 'ink-2'], ['Border', '#323644', 'line'], ['Brand violet', '#7869F4', 'brand'],
];

const type = [
  { name: 'Display', spec: 'Sora 800 · 72 / 1.02 · -3%', cls: 'text-[44px] sm:text-[72px] font-extrabold leading-[1.02] tracking-[-0.03em] font-display', sample: 'Where fandoms' },
  { name: 'H1', spec: 'Sora 800 · 56 / 1.05', cls: 'text-[36px] sm:text-[56px] font-extrabold leading-[1.05] font-display tracking-tight', sample: 'Discover your next obsession' },
  { name: 'H2', spec: 'Sora 700 · 36 / 1.1', cls: 'text-[28px] sm:text-[36px] font-bold leading-[1.1] font-display tracking-tight', sample: 'What everyone’s talking about' },
  { name: 'H3', spec: 'Sora 600 · 24 / 1.3', cls: 'text-2xl font-semibold font-display tracking-tight', sample: 'Neon Ronin season two confirmed' },
  { name: 'Body', spec: 'Inter 400 · 17 / 1.7', cls: 'text-[17px] leading-[1.7] text-ink-2', sample: 'Discover stories, characters, trailers, events, releases and collectibles across seven fandom universes.' },
  { name: 'Small', spec: 'Inter 500 · 13 / 1.5', cls: 'text-[13px] font-medium text-muted', sample: 'Mara Okonkwo · 18 Sep · 8 min read' },
  { name: 'Eyebrow', spec: 'Inter 600 · 12 · +14% · caps', cls: 'eyebrow', sample: 'Trending' },
];

const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];
const radii = [['sm', 8], ['md', 12], ['xl', 16], ['2xl', 24], ['hero', 28], ['full', 999]];
const shadows = [['soft', 'shadow-soft', 'Cards at rest, inputs'], ['lift', 'shadow-lift', 'Hover, drawers, popovers'], ['brand', 'shadow-brand', 'Primary CTA hover, chat launcher']];
const icons = { Home, Compass, Search, SlidersHorizontal, ArrowUpDown, Bookmark, BookmarkCheck, ShoppingBag, ShoppingCart, CalendarDays, Clock, Play, Volume2, Image, Newspaper, User, Users, Star, Heart, MapPin, ChevronRight, ArrowRight, Menu, X, Share2, Download, ExternalLink, MessageCircle, Send, Settings, Sun, Moon, Gamepad2, Film, Tv, Mic2, BookOpen, Sparkles, Flame, Bell, Plus, Minus, Trash2 };

function Swatch({ name, hex, token, darkBg }) {
  return (
    <div className="print-block">
      <div className={`h-20 rounded-xl border ${darkBg ? 'border-white/15' : 'border-black/10'}`} style={{ background: hex }} />
      <p className={`mt-2 text-[13px] font-semibold ${darkBg ? 'text-white' : 'text-ink'}`}>{name}</p>
      <p className={`font-mono text-[12px] ${darkBg ? 'text-white/60' : 'text-muted'}`}>{hex} · {token}</p>
    </div>
  );
}

export default function Foundations() {
  return (
    <ShowcaseSection id="foundations" index="01" title="Foundations" description="Warm neutrals, one violet brand colour, and seven category accents used sparingly for recognition.">
      <div className="space-y-6">
        <Specimen title="Colour — Light theme" note="Default">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{light.map(([n, h, t]) => <Swatch key={t} name={n} hex={h} token={t} />)}</div>
        </Specimen>
        <div className="print-block overflow-hidden rounded-2xl border border-line bg-[#10121B] p-6">
          <h3 className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-white">Colour — Dark theme <span className="ml-2 font-normal normal-case tracking-normal text-white/50">Re-tuned, not inverted · no pure black</span></h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{dark.map(([n, h, t]) => <Swatch key={n} name={n} hex={h} token={t} darkBg />)}</div>
        </div>

        <Specimen title="Category colours" note="Icons, badges, tints, active states — never full pages">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {categories.map((c) => (
              <div key={c.slug} className="print-block">
                <div className="flex h-24 flex-col justify-between rounded-xl p-3" style={{ background: tint(c.color, 0.12) }}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ background: c.color }}><CategoryIcon slug={c.slug} className="h-[18px] w-[18px]" /></span>
                  <span className="h-1.5 w-full rounded-full" style={{ background: c.color }} />
                </div>
                <p className="mt-2 text-[13px] font-semibold">{c.name}</p>
                <p className="font-mono text-[12px] text-muted">{c.color}</p>
              </div>
            ))}
          </div>
        </Specimen>

        <Specimen title="Typography" note="Sora for headings · Inter for interface & body">
          <div className="divide-y divide-line">
            {type.map((t) => (
              <div key={t.name} className="grid gap-2 py-5 first:pt-0 last:pb-0 md:grid-cols-[180px_1fr] md:items-baseline">
                <div>
                  <p className="text-[13px] font-semibold">{t.name}</p>
                  <p className="text-[12px] text-muted">{t.spec}</p>
                </div>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Specimen>

        <div className="grid gap-6 lg:grid-cols-2">
          <Specimen title="Spacing" note="4px base grid">
            <div className="space-y-2">
              {spacing.map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <span className="w-10 text-right font-mono text-[12px] text-muted">{s}</span>
                  <span className="h-3 rounded-sm bg-brand/70" style={{ width: s * 3 }} />
                </div>
              ))}
            </div>
          </Specimen>
          <div className="space-y-6">
            <Specimen title="Border radius">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                {radii.map(([n, r]) => (
                  <div key={n} className="text-center">
                    <div className="mx-auto h-14 w-14 border-2 border-brand bg-brand/10" style={{ borderRadius: Math.min(r, 28) === 28 && r > 28 ? 999 : r }} />
                    <p className="mt-2 text-[12px] font-semibold">{n}</p>
                    <p className="font-mono text-[11px] text-muted">{r === 999 ? '9999' : r}px</p>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen title="Shadows" note="Subtle — never massive">
              <div className="grid grid-cols-3 gap-4">
                {shadows.map(([n, cls, use]) => (
                  <div key={n}>
                    <div className={`h-16 rounded-xl bg-surface ${cls}`} />
                    <p className="mt-3 text-[13px] font-semibold">{n}</p>
                    <p className="text-[12px] text-muted">{use}</p>
                  </div>
                ))}
              </div>
            </Specimen>
          </div>
        </div>

        <Specimen title="Icons" note="Lucide React · 1.5–2px stroke · 16 / 18 / 20 / 24px">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-9">
            {Object.entries(icons).map(([name, Icon]) => (
              <div key={name} className="flex flex-col items-center gap-2 rounded-xl bg-surface p-3 text-center">
                <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="w-full truncate text-[10px] text-muted">{name}</span>
              </div>
            ))}
          </div>
        </Specimen>
      </div>
    </ShowcaseSection>
  );
}
