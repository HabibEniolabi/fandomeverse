import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ eyebrow, title, description, action, actionTo, align = 'left', inverted = false, children, className = '' }) {
  return (
    <div className={`mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between ${align === 'center' ? 'items-center text-center md:flex-col md:items-center' : ''} ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow mb-3 ${inverted ? '!text-[#B3AAFF]' : ''}`}>{eyebrow}</p>}
        <h2 className={`text-[28px] font-bold leading-[1.1] sm:text-4xl ${inverted ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {description && <p className={`mt-3 text-base leading-relaxed sm:text-[17px] ${inverted ? 'text-white/70' : 'text-ink-2'}`}>{description}</p>}
      </div>
      {children}
      {action && actionTo && (
        <Link
          to={actionTo}
          className={`group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold ${inverted ? 'text-white' : 'text-ink'} hover:text-brand`}
        >
          {action}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
