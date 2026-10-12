import { Link } from 'react-router-dom';

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-brand" />
      <circle cx="32" cy="32" r="12.5" fill="none" stroke="#fff" strokeWidth="5" />
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="none" stroke="#fff" strokeWidth="3" transform="rotate(-25 32 32)" />
      <circle cx="51" cy="22" r="4" fill="#F45B9C" />
    </svg>
  );
}

export default function Logo({ to = '/', inverted = false, className = '' }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="FandomVerse home">
      <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:rotate-[-8deg]" />
      <span className={`font-display text-[19px] font-bold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        Fandom<span className="text-brand">Verse</span>
      </span>
    </Link>
  );
}
