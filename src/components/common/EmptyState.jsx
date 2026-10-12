export default function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      {Icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-ink-2">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
