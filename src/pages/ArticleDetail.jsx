import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { articles, authors, getArticle } from '../data/articles.js';
import { getCategory, tint } from '../data/categories.js';
import { formatDate } from '../data/events.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Badge from '../components/common/Badge.jsx';
import BookmarkButton from '../components/common/BookmarkButton.jsx';
import ShareButton from '../components/common/ShareButton.jsx';
import Artwork from '../components/art/Artwork.jsx';
import ArticleCard from '../components/cards/ArticleCard.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from './usePageTitle.js';

function Block({ block, color }) {
  if (block.type === 'h2') return <h2 className="mb-4 mt-12 text-2xl font-bold sm:text-[28px]">{block.text}</h2>;
  if (block.type === 'quote')
    return (
      <figure className="my-10 border-l-4 py-1 pl-6" style={{ borderColor: color }}>
        <blockquote className="font-display text-2xl font-semibold leading-snug text-ink sm:text-[28px]">“{block.text}”</blockquote>
        {block.cite && <figcaption className="mt-3 text-sm text-ink-2">— {block.cite}</figcaption>}
      </figure>
    );
  return <p className="mb-6 text-[17px] leading-[1.8] text-ink/90 sm:text-[18px]">{block.text}</p>;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticle(slug);
  usePageTitle(article?.title);
  if (!article) return <NotFound />;
  const cat = getCategory(article.category);
  const author = authors[article.author];
  const related = [...articles.filter((a) => a.slug !== slug && a.category === article.category), ...articles.filter((a) => a.category !== article.category)].slice(0, 3);
  const bm = { kind: 'article', slug: article.slug, title: article.title, category: article.category };

  return (
    <article>
      <header className="container-page max-w-4xl pt-8 md:pt-12">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: cat.name, to: `/category/${cat.slug}` }, { label: 'Article' }]} />
        <Badge category={article.category} icon />
        <h1 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">{article.title}</h1>
        {article.subtitle && <p className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl">{article.subtitle}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-line py-5">
          <div className="flex items-center gap-3">
            <span className="h-12 w-12 overflow-hidden rounded-full"><Artwork seed={`author-${article.author}`} category={article.category} variant="portrait" label={author.name} /></span>
            <div>
              <p className="font-semibold">{author.name}</p>
              <p className="flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
                <span>{author.role}</span><span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatDate(article.date, { day: 'numeric', month: 'long', year: 'numeric' })}</time><span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{article.readTime} min read</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <BookmarkButton item={bm} variant="outline" withLabel />
            <ShareButton title={article.title} withLabel />
          </div>
        </div>
      </header>

      <div className="container-page mt-8 max-w-6xl">
        <figure>
          <div className="aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[21/10]">
            <Artwork seed={article.slug} category={article.category} figure label={article.title} />
          </div>
          <figcaption className="mt-3 text-center text-[13px] text-muted">Key art from {article.tags?.[0] || cat.name}. Illustration: FandomVerse.</figcaption>
        </figure>
      </div>

      <div className="container-page max-w-[720px] py-12 md:py-16">
        <p className="mb-8 font-display text-xl font-semibold leading-relaxed text-ink sm:text-[22px]">{article.excerpt}</p>
        {article.body.map((b, i) => <Block key={i} block={b} color={cat.color} />)}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-8">
          {article.tags?.map((t) => (
            <span key={t} className="rounded-full px-3.5 py-1.5 text-sm font-medium" style={{ background: tint(cat.color, 0.1), color: cat.color }}>#{t.replace(/\s/g, '')}</span>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full"><Artwork seed={`author-${article.author}`} category={article.category} variant="portrait" label={author.name} /></span>
          <div>
            <p className="text-[13px] text-muted">Written by</p>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-ink-2">{author.role} at FandomVerse</p>
          </div>
        </div>
      </div>

      <section className="border-t border-line bg-surface-2/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Keep reading" title="Related articles" action="More stories" actionTo="/discover?type=article" />
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
