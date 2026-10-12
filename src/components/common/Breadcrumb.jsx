import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="hover:text-ink">{item.label}</Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink-2">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
