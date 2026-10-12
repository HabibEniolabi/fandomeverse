import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Send, X } from 'lucide-react';
import ChatMessage, { BotAvatar, TypingIndicator } from './ChatMessage.jsx';
import QuickReply from './QuickReply.jsx';
import { botName, fallback, introMessage, quickReplies, resolveIntent } from '../../data/chatbot.js';

const now = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
let uid = 0;
const nextId = () => `m${++uid}`;

export const makeIntro = () => ({ id: nextId(), from: 'bot', text: introMessage.text, time: now(), followUps: quickReplies.map((q) => q.label) });

/**
 * The Fandom Assistant panel.
 * `initialMessages` and `forceTyping` let the /showcase render specific states.
 * `embedded` renders it inline (not fixed) for the showcase.
 */
export default function ChatbotPanel({ onClose, initialMessages, forceTyping = false, embedded = false, className = '' }) {
  const [messages, setMessages] = useState(() => initialMessages || [makeIntro()]);
  const [typing, setTyping] = useState(forceTyping);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef();

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!embedded) inputRef.current?.focus();
    return () => clearTimeout(timer.current);
  }, [embedded]);

  const send = (text) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: nextId(), from: 'user', text: clean, time: now() }]);
    setInput('');
    setTyping(true);
    timer.current = setTimeout(() => {
      const intent = resolveIntent(clean);
      const reply = intent
        ? { text: intent.reply, result: intent.result, followUps: intent.followUps }
        : { text: fallback.reply, followUps: fallback.followUps };
      setMessages((m) => [...m, { id: nextId(), from: 'bot', time: now(), ...reply }]);
      setTyping(false);
    }, 900 + Math.random() * 500);
  };

  const clear = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages([makeIntro()]);
  };

  const onNavigate = () => {
    if (!embedded && window.innerWidth < 640) onClose?.();
  };

  const last = messages[messages.length - 1];
  const suggestions = !typing && last?.from === 'bot' ? last.followUps : null;

  return (
    <section
      aria-label={botName}
      className={`flex flex-col overflow-hidden border border-line bg-elevated shadow-lift ${embedded ? 'h-[540px] w-full max-w-[380px] rounded-3xl' : ''} ${className}`}
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3">
        <BotAvatar size="h-10 w-10" />
        <div className="flex-1">
          <h2 className="font-display text-[15px] font-bold leading-tight">{botName}</h2>
          <p className="flex items-center gap-1.5 text-[12px] text-ink-2">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden="true" /> Online
          </p>
        </div>
        <button type="button" onClick={clear} aria-label="Clear conversation" title="Clear conversation" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2 hover:text-ink">
          <RotateCcw className="h-[18px] w-[18px]" />
        </button>
        <button type="button" onClick={onClose} aria-label="Close assistant" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((m) => <ChatMessage key={m.id} message={m} onNavigate={onNavigate} />)}
        {typing && <TypingIndicator />}
        {suggestions && (
          <div className="flex flex-wrap gap-2 pl-10">
            {suggestions.map((s) => <QuickReply key={s} label={s} onClick={send} />)}
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex shrink-0 items-center gap-2 border-t border-line p-3">
        <label htmlFor={embedded ? undefined : 'chat-input'} className="sr-only">Message</label>
        <input
          id={embedded ? undefined : 'chat-input'}
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about FandomVerse..."
          aria-label="Ask about FandomVerse"
          className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-[14px] text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
        />
        <button type="submit" aria-label="Send message" disabled={!input.trim() || typing} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-hover active:scale-95 disabled:opacity-40">
          <Send className="h-[18px] w-[18px]" />
        </button>
      </form>
    </section>
  );
}
