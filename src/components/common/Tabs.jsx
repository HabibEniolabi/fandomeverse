/** Accessible pill tabs. `tabs` = [{ value, label, count? }] */
export default function Tabs({ tabs, value, onChange, label = 'Tabs', variant = 'pill', inverted = false, className = '' }) {
  const onKeyDown = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[next].value);
    e.currentTarget.parentElement?.children[next]?.focus();
  };

  if (variant === 'underline') {
    return (
      <div role="tablist" aria-label={label} className={`scrollbar-none -mx-5 flex gap-6 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0 ${className}`}>
        {tabs.map((t, i) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              role="tab"
              type="button"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onKeyDown={(e) => onKeyDown(e, i)}
              onClick={() => onChange(t.value)}
              className={`relative flex h-12 shrink-0 items-center gap-1.5 text-[15px] font-semibold transition ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
            >
              {t.label}
              {t.count != null && <span className="rounded-full bg-surface-2 px-1.5 text-xs text-ink-2">{t.count}</span>}
              <span className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="tablist" aria-label={label} className={`scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0 ${className}`}>
      {tabs.map((t, i) => {
        const active = t.value === value;
        const activeCls = inverted ? 'bg-white text-[#17171F]' : 'bg-ink text-bg';
        const idleCls = inverted ? 'text-white/70 hover:text-white hover:bg-white/10 border border-white/15' : 'border border-line bg-surface text-ink-2 hover:text-ink hover:border-ink/25';
        return (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => onChange(t.value)}
            className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition duration-200 ${active ? activeCls : idleCls}`}
          >
            {t.label}
            {t.count != null && <span className="text-xs opacity-60">{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
