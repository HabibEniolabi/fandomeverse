import { MessageCircle, X } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';
import ChatbotPanel from './ChatbotPanel.jsx';

/** Floating bottom-right assistant button + panel (desktop card / mobile bottom sheet). */
export function LauncherButton({ open, onClick, className = 'fixed bottom-5 right-5 sm:bottom-6 sm:right-6' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close Fandom Assistant' : 'Open Fandom Assistant'}
      aria-expanded={open}
      className={`z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-brand transition duration-200 hover:scale-105 hover:bg-brand-hover active:scale-95 ${className}`}
    >
      {open ? <X className="animate-spin-in h-6 w-6" /> : <MessageCircle className="animate-spin-in h-6 w-6" />}
    </button>
  );
}

export default function ChatbotLauncher() {
  const { chatOpen, setChatOpen } = useUI();
  return (
    <>
      {chatOpen && (
        <>
          <div className="animate-fade-in fixed inset-0 z-[64] bg-[#0B0C12]/40 sm:hidden" onClick={() => setChatOpen(false)} aria-hidden="true" />
          <div className="fixed inset-x-0 bottom-0 z-[66] h-[88dvh] animate-fade-up sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[540px] sm:max-h-[calc(100vh-130px)] sm:w-[380px]">
            <ChatbotPanel onClose={() => setChatOpen(false)} className="h-full rounded-t-3xl sm:rounded-3xl" />
          </div>
        </>
      )}
      <LauncherButton open={chatOpen} onClick={() => setChatOpen(!chatOpen)} className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 ${chatOpen ? 'max-sm:hidden' : ''}`} />
    </>
  );
}
