import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-hover shadow-brand/0 hover:shadow-brand',
  secondary: 'bg-surface text-ink border border-line hover:border-ink/30 hover:bg-surface-2',
  ghost: 'text-ink hover:bg-surface-2',
  dark: 'bg-ink text-bg hover:opacity-90',
  light: 'bg-white text-[#17171F] hover:bg-white/90',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10',
};

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-[52px] px-6 text-base gap-2',
};

/** Pill button that renders a <Link>, <a> or <button> depending on props. */
export default function Button({ to, href, variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, className = '', children, ...rest }) {
  const cls = `inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-semibold transition duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />}
      {children}
      {IconRight && <IconRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={`group/btn ${cls}`} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={`group/btn ${cls}`} {...rest}>{content}</a>;
  return <button type="button" className={`group/btn ${cls}`} {...rest}>{content}</button>;
}
