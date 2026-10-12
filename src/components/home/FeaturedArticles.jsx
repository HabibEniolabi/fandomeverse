import SectionHeader from '../common/SectionHeader.jsx';
import ArticleCard from '../cards/ArticleCard.jsx';
import { articles } from '../../data/articles.js';

export default function FeaturedArticles() {
  const [lead, ...rest] = articles;
  return (
    <section className="container-page py-14 md:py-20" aria-labelledby="articles-heading">
      <SectionHeader eyebrow="Editor’s picks" title={<span id="articles-heading">Featured articles</span>} description="Long reads, breakdowns and interviews from the FandomVerse editorial desk." action="All articles" actionTo="/discover?type=article" />
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <ArticleCard article={lead} variant="feature" />
        <div className="flex flex-col justify-between gap-6 divide-y divide-line">
          {rest.slice(0, 4).map((a, i) => (
            <div key={a.slug} className={i ? 'pt-6' : ''}><ArticleCard article={a} variant="horizontal" /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
