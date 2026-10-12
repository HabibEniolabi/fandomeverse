import { Compass, Layers, Sparkles, Target, Users, Zap } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CategoryCard from '../components/cards/CategoryCard.jsx';
import Artwork from '../components/art/Artwork.jsx';
import Button from '../components/common/Button.jsx';
import { categories } from '../data/categories.js';
import usePageTitle from './usePageTitle.js';

const problems = [
  { icon: Layers, title: 'Fandom is fragmented', text: 'Fans juggle a dozen apps, wikis, forums and stores to follow a single franchise.' },
  { icon: Zap, title: 'Discovery is noisy', text: 'Algorithms reward outrage and spoilers, not the stories and creators fans actually love.' },
  { icon: Users, title: 'Communities are siloed', text: 'Anime fans, gamers and K-Pop stans overlap more than ever — but rarely share a home.' },
];

const solutions = [
  { icon: Compass, title: 'One place to discover', text: 'Articles, characters, trailers, events, releases and merch — organised by universe.' },
  { icon: Target, title: 'Curated, not chaotic', text: 'Editorial picks and clear categories make it easy to find your next obsession.' },
  { icon: Sparkles, title: 'Built for fans', text: 'Bookmarks, a friendly assistant and light & dark modes — designed for long sessions.' },
];

const team = [
  { name: 'Team Member 1', role: 'Product Design Lead', cat: 'anime' },
  { name: 'Team Member 2', role: 'Frontend Engineer', cat: 'gaming' },
  { name: 'Team Member 3', role: 'Content & Editorial', cat: 'movies' },
  { name: 'Team Member 4', role: 'Community & Research', cat: 'kpop' },
];

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="card p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{text}</p>
    </div>
  );
}

export default function About() {
  usePageTitle('About');
  return (
    <>
      <PageContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Our story</p>
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Built by fans, for every fandom.</h1>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-2">
              FandomVerse started with a simple frustration: following the things we love meant twelve tabs, three apps and a spreadsheet of release dates. We set out to build one calm, beautiful place where every fandom — anime, games, film, TV, K-Pop, comics and manga — could live side by side.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-2">What began as a hackathon project is a blueprint for how entertainment discovery could feel: editorial, welcoming and made for the long haul.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] overflow-hidden rounded-3xl"><Artwork seed="about-1" category="anime" variant="portrait" label="Illustration" /></div>
            <div className="mt-10 aspect-[3/4] overflow-hidden rounded-3xl"><Artwork seed="about-2" category="kpop" label="Illustration" /></div>
          </div>
        </div>
      </PageContainer>

      <section className="border-y border-line bg-surface-2/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="The problem" title="Being a fan shouldn’t feel like work" />
          <div className="grid gap-4 md:grid-cols-3">{problems.map((p) => <Feature key={p.title} {...p} />)}</div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <SectionHeader eyebrow="Our solution" title="One universe for every fandom" />
        <div className="grid gap-4 md:grid-cols-3">{solutions.map((p) => <Feature key={p.title} {...p} />)}</div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <SectionHeader eyebrow="Seven universes" title="Everything, organised" action="Explore" actionTo="/categories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} compact />)}
        </div>
      </section>

      <section className="border-t border-line bg-surface-2/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="The team" title="The people behind FandomVerse" description="Swap in your hackathon team’s names, roles and photos in src/pages/About.jsx." />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {team.map((m) => (
              <div key={m.name}>
                <div className="aspect-square overflow-hidden rounded-3xl"><Artwork seed={`team-${m.name}`} category={m.cat} variant="portrait" label={`${m.name} portrait`} /></div>
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="text-sm text-ink-2">{m.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Button to="/signup">Join FandomVerse</Button>
            <Button to="/contact" variant="secondary">Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
