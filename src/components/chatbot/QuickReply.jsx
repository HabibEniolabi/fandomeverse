export default function QuickReply({ label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      disabled={disabled}
      className="inline-flex h-9 shrink-0 items-center rounded-full border border-brand/30 bg-surface px-3.5 text-[13px] font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white active:scale-95 disabled:opacity-50"
    >
      {label}
    </button>
  );
}
