import { CheckCircle2 } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';

export default function Toast() {
  const { toast } = useUI();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 sm:bottom-8">
      {toast && (
        <div key={toast.key} className="animate-fade-up flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg shadow-lift">
          <CheckCircle2 className="h-4 w-4 text-[#7CE0A3]" aria-hidden="true" />
          {toast.message}
        </div>
      )}
    </div>
  );
}
