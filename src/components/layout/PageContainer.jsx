/** Standard page wrapper: consistent width, gutters and vertical rhythm. */
export default function PageContainer({ children, className = '', as: Tag = 'div', narrow = false }) {
  return <Tag className={`container-page ${narrow ? '!max-w-3xl' : ''} py-10 md:py-14 ${className}`}>{children}</Tag>;
}

/** Page intro block used at the top of listing pages. */
export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 md:mb-10">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-[36px] font-bold leading-[1.05] sm:text-5xl lg:text-[56px]">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">{description}</p>}
      {children}
    </div>
  );
}
