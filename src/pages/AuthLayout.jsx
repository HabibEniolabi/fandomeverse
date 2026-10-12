import Logo from '../components/common/Logo.jsx';
import Artwork from '../components/art/Artwork.jsx';

/** Split auth layout: form on the left, artwork on the right (hidden on mobile). */
export default function AuthLayout({ title, subtitle, children, seed = 'auth', category = 'tv' }) {
  return (
    <div className="container-page grid min-h-[calc(100vh-72px)] items-stretch gap-10 py-8 lg:grid-cols-2 lg:py-10">
      <div className="flex flex-col justify-center py-6 lg:px-8">
        <div className="mx-auto w-full max-w-[420px]">
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-3 text-ink-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden rounded-[28px] lg:block">
        <Artwork seed={seed} category={category} figure label="FandomVerse artwork" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
        <div className="absolute left-8 top-8"><Logo inverted /></div>
        <blockquote className="absolute inset-x-8 bottom-8 text-white">
          <p className="font-display text-2xl font-semibold leading-snug">“Finally, one place for every fandom I care about — and it’s actually beautiful.”</p>
          <footer className="mt-3 text-sm text-white/70">Illustrative quote · FandomVerse concept</footer>
        </blockquote>
      </div>
    </div>
  );
}
