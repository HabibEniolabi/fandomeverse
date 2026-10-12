import { Search, X } from 'lucide-react';

/** Search field with icon, optional clear button and keyboard hint. */
export default function SearchInput({ value, onChange, placeholder = 'Search across FandomVerse...', size = 'md', kbd, onClear, className = '', inputRef, ...rest }) {
  const h = size === 'lg' ? 'h-14 sm:h-16 text-base sm:text-lg pl-12 sm:pl-14' : size === 'sm' ? 'h-10 text-sm pl-10' : 'h-12 text-[15px] pl-11';
  const iconPos = size === 'lg' ? 'left-4 sm:left-5 h-5 w-5 sm:h-6 sm:w-6' : 'left-3.5 h-[18px] w-[18px]';
  return (
    <div className={`relative ${className}`}>
      <Search className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${iconPos}`} aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={rest['aria-label'] || placeholder}
        className={`w-full rounded-2xl border border-line bg-surface pr-24 text-ink placeholder:text-muted shadow-soft transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden ${h}`}
        {...rest}
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {value && onClear && (
          <button type="button" onClick={onClear} aria-label="Clear search" className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        )}
        {kbd && <kbd className="hidden rounded-md border border-line bg-surface-2 px-2 py-1 font-sans text-xs font-medium text-ink-2 sm:inline">{kbd}</kbd>}
      </div>
    </div>
  );
}
