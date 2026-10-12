import Hero from '../components/home/Hero.jsx';
import ExploreUniverse from '../components/home/ExploreUniverse.jsx';
import Trending from '../components/home/Trending.jsx';
import FeaturedArticles from '../components/home/FeaturedArticles.jsx';
import PopularCharacters from '../components/home/PopularCharacters.jsx';
import TrailersMedia from '../components/home/TrailersMedia.jsx';
import UpcomingEvents from '../components/home/UpcomingEvents.jsx';
import Merchandise from '../components/home/Merchandise.jsx';
import UpcomingReleases from '../components/home/UpcomingReleases.jsx';
import CommunityCTA from '../components/home/CommunityCTA.jsx';
import usePageTitle from './usePageTitle.js';

export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <ExploreUniverse />
      <Trending />
      <FeaturedArticles />
      <PopularCharacters />
      <TrailersMedia />
      <UpcomingEvents />
      <Merchandise />
      <UpcomingReleases />
      <CommunityCTA />
    </>
  );
}
