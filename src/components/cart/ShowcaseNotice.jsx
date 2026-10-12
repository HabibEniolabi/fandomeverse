import { Info } from 'lucide-react';

export default function ShowcaseNotice({ className = '' }) {
  return (
    <div className={`flex gap-3 rounded-xl border border-brand/25 bg-brand/[0.07] p-3.5 text-[13px] leading-relaxed text-ink-2 ${className}`} role="note">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
      <p><span className="font-semibold text-ink">FandomVerse is a showcase platform.</span> Purchases are not processed.</p>
    </div>
  );
}
