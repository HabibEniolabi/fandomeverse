import SectionHeader from '../common/SectionHeader.jsx';
import CharacterCard from '../cards/CharacterCard.jsx';
import { characters } from '../../data/characters.js';

export default function PopularCharacters() {
  return (
    <section className="container-page py-14 md:py-20" aria-labelledby="characters-heading">
      <SectionHeader eyebrow="Fan favourites" title={<span id="characters-heading">Popular characters</span>} description="The heroes, rivals and icons fans are following right now." action="Character directory" actionTo="/characters" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
        {characters.slice(0, 4).map((c) => <CharacterCard key={c.slug} character={c} />)}
      </div>
    </section>
  );
}
