import { Link } from 'react-router-dom';

/** 44px circular icon button. `label` is required for accessibility. */
export default function IconButton({ icon: Icon, label, to, badge, variant = 'ghost', size = 'md', className = '', ...rest }) {
  const base = {
    ghost: 'text-ink hover:bg-surface-2',
    outline: 'border border-line bg-surface text-ink hover:bg-surface-2',
    overlay: 'bg-black/35 text-white backdrop-blur-sm hover:bg-black/55',
    brand: 'bg-brand text-white hover:bg-brand-hover',
  }[variant];
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const cls = `relative inline-flex ${dim} shrink-0 items-center justify-center rounded-full transition duration-200 active:scale-95 ${base} ${className}`;
  const inner = (
    <>
      <Icon className="h-5 w-5" aria-hidden="true" />
      {badge > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white ring-2 ring-bg">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </>
  );
  if (to) return <Link to={to} aria-label={label} title={label} className={cls} {...rest}>{inner}</Link>;
  return <button type="button" aria-label={label} title={label} className={cls} {...rest}>{inner}</button>;
}
