import { Link } from 'react-router-dom';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';

export default function CharacterCard({ character, compact = false }) {
  const href = `/characters/${character.slug}`;
  return (
    <article className="group relative flex h-full flex-col">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <Media seed={character.slug} category={character.category} variant="portrait" ratio="aspect-[4/5]" label={`${character.name} portrait`}>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3"><Badge category={character.category} tone="solid" icon /></div>
        </Media>
      </Link>
      <BookmarkButton item={{ kind: 'character', slug: character.slug, title: character.name, category: character.category }} className="absolute right-3 top-3" />
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-ink transition group-hover:text-brand">
          <Link to={href}>{character.name}</Link>
        </h3>
        <p className="text-[14px] text-ink-2">{character.series}</p>
        {!compact && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Traits">
            {character.traits.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium text-ink-2">{t}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
