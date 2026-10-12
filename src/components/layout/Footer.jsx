import { Link } from 'react-router-dom';
import { ArrowRight, Github, Instagram, Twitch, Twitter, Youtube } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { categories } from '../../data/categories.js';

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/discover', label: 'Discover' },
      { to: '/characters', label: 'Characters' },
      { to: '/media', label: 'Trailers & Media' },
      { to: '/events', label: 'Events' },
      { to: '/releases', label: 'Coming Soon' },
      { to: '/shop', label: 'Shop' },
    ],
  },
  { title: 'Universes', links: categories.map((c) => ({ to: `/category/${c.slug}`, label: c.name })) },
  {
    title: 'FandomVerse',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/bookmarks', label: 'Bookmarks' },
      { to: '/signup', label: 'Create account' },
      { to: '/showcase', label: 'UI Showcase' },
    ],
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'X / Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitch, label: 'Twitch' },
  { icon: Github, label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2/60">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 font-display text-lg font-semibold text-ink">Your Universe. Your Fandom.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              Stories, characters, trailers, events, releases and collectibles across seven fandom universes — in one place.
            </p>
            <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Your email" className="input h-11 flex-1 rounded-full" />
              <button type="submit" aria-label="Subscribe to newsletter" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-hover">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-2 text-[13px] text-muted">The Weekly Drop — every Friday. No spam.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-[15px] text-ink-2 transition hover:text-ink">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">© 2026 FandomVerse. A hackathon showcase — all franchises and characters are fictional.</p>
          <div className="flex gap-1">
            {socials.map(({ icon: Icon, label }) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition hover:bg-surface hover:text-ink">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
