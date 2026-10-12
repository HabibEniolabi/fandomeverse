import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Media from '../common/Media.jsx';
import Badge from '../common/Badge.jsx';
import BookmarkButton from '../common/BookmarkButton.jsx';
import { authors } from '../../data/articles.js';
import { formatDate } from '../../data/events.js';

function Meta({ article, light = false }) {
  const author = authors[article.author];
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] ${light ? 'text-white/75' : 'text-muted'}`}>
      <span className={`font-medium ${light ? 'text-white' : 'text-ink-2'}`}>{author?.name}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.date}>{formatDate(article.date, { day: 'numeric', month: 'short' })}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{article.readTime} min read</span>
    </div>
  );
}

/** variant: 'default' | 'feature' | 'horizontal' */
export default function ArticleCard({ article, variant = 'default' }) {
  const href = `/articles/${article.slug}`;
  const bm = { kind: 'article', slug: article.slug, title: article.title, category: article.category };

  if (variant === 'feature') {
    return (
      <article className="group relative h-full">
        <Link to={href} className="block h-full">
          <Media seed={article.slug} category={article.category} figure ratio="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[520px]" rounded="rounded-3xl" label={article.title}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <Badge category={article.category} tone="solid" icon />
              <h3 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-white sm:text-[32px]">{article.title}</h3>
              <p className="mt-3 line-clamp-2 max-w-lg text-[15px] leading-relaxed text-white/80 sm:text-base">{article.excerpt}</p>
              <div className="mt-5"><Meta article={article} light /></div>
            </div>
          </Media>
        </Link>
        <BookmarkButton item={bm} className="absolute right-4 top-4" />
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group relative flex gap-4 sm:gap-5">
        <Link to={href} className="w-28 shrink-0 sm:w-40" tabIndex={-1} aria-hidden="true">
          <Media seed={article.slug} category={article.category} ratio="aspect-[4/3]" rounded="rounded-xl" label={article.title} />
        </Link>
        <div className="min-w-0 flex-1">
          <Badge category={article.category} tone="plain" />
          <h3 className="mt-1.5 line-clamp-2 text-[16px] font-semibold leading-snug text-ink transition group-hover:text-brand sm:text-lg">
            <Link to={href}>{article.title}</Link>
          </h3>
          <div className="mt-2"><Meta article={article} /></div>
        </div>
        <BookmarkButton item={bm} variant="plain" className="-mr-2 -mt-1 hidden sm:inline-flex" />
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <Media seed={article.slug} category={article.category} ratio="aspect-[16/10]" label={article.title} />
      </Link>
      <BookmarkButton item={bm} className="absolute right-3 top-3" />
      <div className="flex flex-1 flex-col pt-4">
        <Badge category={article.category} />
        <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-ink transition group-hover:text-brand">
          <Link to={href}>{article.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-2">{article.excerpt}</p>
        <div className="mt-auto pt-4"><Meta article={article} /></div>
      </div>
    </article>
  );
}
