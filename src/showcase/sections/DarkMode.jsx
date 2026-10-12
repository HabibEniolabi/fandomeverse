import { ShowcaseSection } from '../ShowcaseLayout.jsx';
import DeviceFrame from '../DeviceFrame.jsx';
import ThemeToggle from '../../components/theme/ThemeToggle.jsx';
import ArticleCard from '../../components/cards/ArticleCard.jsx';
import ProductCard from '../../components/cards/ProductCard.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import SearchInput from '../../components/common/SearchInput.jsx';
import { articles } from '../../data/articles.js';
import { products } from '../../data/products.js';
import { categories } from '../../data/categories.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ArrowRight } from 'lucide-react';

function Panel({ mode }) {
  return (
    <div className={`${mode} print-block rounded-2xl border border-line bg-bg p-5 text-ink sm:p-6`}>
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{mode === 'dark' ? 'Dark mode' : 'Light mode'}</p>
      <SearchInput value="" onChange={() => {}} placeholder="Search across FandomVerse..." />
      <div className="mt-4 flex flex-wrap gap-2">{categories.slice(0, 4).map((c) => <Badge key={c.slug} category={c.slug} />)}</div>
      <div className="mt-4 flex gap-2"><Button size="sm" iconRight={ArrowRight}>Explore</Button><Button size="sm" variant="secondary">Watch</Button></div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <ArticleCard article={articles[1]} />
        <ProductCard product={products[4]} />
      </div>
    </div>
  );
}

export default function DarkMode() {
  const { theme } = useTheme();
  return (
    <ShowcaseSection id="dark-mode" index="06" title="Light vs Dark" description="Dark mode is re-tuned, not inverted: navy-charcoal surfaces, softened borders and a brighter violet for contrast.">
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <ThemeToggle variant="switch" />
        <p className="text-[15px] text-ink-2">
          The whole showcase is currently in <span className="font-semibold text-ink">{theme}</span> mode. Toggle it — every live frame on this page follows (except the fixed comparison below).
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel mode="light" />
        <Panel mode="dark" />
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {['light', 'dark'].map((m) => (
          <figure key={m} className="print-block">
            <DeviceFrame path="/" theme={m} title={`Home — ${m}`} height={1400} />
            <figcaption className="mt-3 text-center text-sm font-semibold capitalize">{m} — Home</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {[['light', '/shop/pixel-vanguard-figure'], ['dark', '/shop/pixel-vanguard-figure'], ['light', '/?chat=open'], ['dark', '/?chat=open']].map(([m, p]) => (
          <figure key={m + p} className="print-block">
            <DeviceFrame path={p} device="mobile" theme={m} title={`${p} ${m}`} />
            <figcaption className="mt-2 text-center text-[13px] font-semibold capitalize">{m} · {p.includes('chat') ? 'Chatbot' : 'Product'}</figcaption>
          </figure>
        ))}
      </div>
    </ShowcaseSection>
  );
}
