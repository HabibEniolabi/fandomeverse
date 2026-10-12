import { ChevronDown } from 'lucide-react';

/** Native select styled to match the design system (keeps full keyboard + screen reader support). */
export default function Select({ label, value, onChange, options, icon: Icon, className = '', hideLabel = false }) {
  const id = `sel-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-[13px] font-medium text-ink-2'}>{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full cursor-pointer appearance-none rounded-full border border-line bg-surface pr-10 text-sm font-medium text-ink transition hover:border-ink/25 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 ${Icon ? 'pl-10' : 'pl-4'}`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      </div>
    </div>
  );
}
