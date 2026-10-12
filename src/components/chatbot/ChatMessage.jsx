import { Sparkles } from 'lucide-react';
import ChatResult from './ChatResult.jsx';

export function BotAvatar({ size = 'h-8 w-8' }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-brand text-white`} aria-hidden="true">
      <Sparkles className="h-4 w-4" />
    </span>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" aria-live="polite" aria-label="Fandom Assistant is typing">
      <BotAvatar />
      <div className="flex h-10 items-center gap-1 rounded-2xl rounded-bl-md bg-surface-2 px-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 animate-blink rounded-full bg-ink-2" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatMessage({ message, onNavigate }) {
  const isBot = message.from === 'bot';
  return (
    <div className={`animate-fade-up flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && <BotAvatar />}
      <div className={`flex max-w-[82%] flex-col gap-2 ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
            isBot ? 'rounded-bl-md bg-surface-2 text-ink' : 'rounded-br-md bg-brand text-white'
          }`}
        >
          {message.text}
        </div>
        {message.result && <div className="w-full min-w-[240px]"><ChatResult result={message.result} onNavigate={onNavigate} /></div>}
        {message.time && <span className="px-1 text-[11px] text-muted">{message.time}</span>}
      </div>
    </div>
  );
}
