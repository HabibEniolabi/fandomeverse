import { ShowcaseSection, Specimen } from '../ShowcaseLayout.jsx';
import ChatbotPanel from '../../components/chatbot/ChatbotPanel.jsx';
import { LauncherButton } from '../../components/chatbot/ChatbotLauncher.jsx';
import CategoryCard from '../../components/cards/CategoryCard.jsx';
import ProductCard from '../../components/cards/ProductCard.jsx';
import { categories } from '../../data/categories.js';
import { products } from '../../data/products.js';
import { introMessage, intents, fallback } from '../../data/chatbot.js';

const t = '14:32';
const intent = (id) => intents.find((i) => i.id === id);
const intro = (withReplies = false) => ({ id: 'i', from: 'bot', text: introMessage.text, time: '14:30', followUps: withReplies ? ['Explore Anime', 'Browse Games', 'Upcoming Events', 'Watch Trailers', 'Popular Characters', 'Find Merchandise'] : undefined });

const states = [
  { key: 'suggested', title: 'Open · suggested replies', messages: [intro(true)] },
  {
    key: 'conversation', title: 'Conversation',
    messages: [
      intro(),
      { id: 'u1', from: 'user', text: 'Hey! What can you do?', time: '14:31' },
      { id: 'b1', from: 'bot', text: intent('greeting').reply, time: '14:31' },
      { id: 'u2', from: 'user', text: 'What’s the best fan theory right now?', time: t },
      { id: 'b2', from: 'bot', text: fallback.reply, time: t, followUps: fallback.followUps.slice(0, 3) },
    ],
  },
  { key: 'typing', title: 'Typing', typing: true, messages: [intro(), { id: 'u1', from: 'user', text: 'Show me upcoming events', time: t }] },
  {
    key: 'result', title: 'Recommendation result',
    messages: [
      { id: 'u1', from: 'user', text: 'Upcoming events', time: t },
      { id: 'b1', from: 'bot', text: intent('events').reply, result: intent('events').result, time: t, followUps: intent('events').followUps },
    ],
  },
  {
    key: 'category', title: 'Category recommendation',
    messages: [
      { id: 'u1', from: 'user', text: 'Explore Anime', time: t },
      { id: 'b1', from: 'bot', text: intent('anime').reply, result: intent('anime').result, time: t, followUps: intent('anime').followUps },
    ],
  },
];

const motion = [
  ['Card hover', 'translateY(-3px) + shadow-lift', '200ms ease-out'],
  ['Image hover', 'scale 1 → 1.03', '300ms ease-out'],
  ['Button press', 'scale 0.98 + colour', '200ms'],
  ['Bookmark', 'pop scale 1 → 1.25 → 1', '300ms'],
  ['Theme toggle', 'icon rotate + fade; colours cross-fade', '250–300ms'],
  ['Chatbot', 'fade + slide up 12px', '250ms'],
  ['Mobile nav / drawers', 'slide in from right', '280ms'],
  ['Reduced motion', 'All durations → 1ms', 'prefers-reduced-motion'],
];

export default function Interactions() {
  return (
    <ShowcaseSection id="interactions" index="05" title="Interactions" description="Chatbot states, micro-interactions and motion timing. Hover the cards to feel the motion system.">
      <h3 className="mb-4 text-xl font-bold">Fandom Assistant — states</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        <Specimen title="Closed" note="Launcher · bottom-right">
          <div className="relative flex h-[540px] items-end justify-end rounded-xl border border-dashed border-line p-4">
            <div className="absolute left-4 top-4 space-y-2">
              <div className="h-3 w-40 rounded-full bg-line" /><div className="h-3 w-28 rounded-full bg-line" /><div className="h-3 w-32 rounded-full bg-line" />
            </div>
            <LauncherButton open={false} onClick={() => {}} className="relative" />
          </div>
        </Specimen>
        {states.map((s) => (
          <Specimen key={s.key} title={s.title}>
            <div className="flex justify-center"><ChatbotPanel embedded initialMessages={s.messages} forceTyping={s.typing} /></div>
          </Specimen>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Specimen title="Motion system" note="150–300ms · subtle, never showy">
          <table className="w-full text-left text-[14px]">
            <thead><tr className="text-[12px] uppercase tracking-wider text-muted"><th className="pb-3 font-semibold">Interaction</th><th className="pb-3 font-semibold">Behaviour</th><th className="pb-3 font-semibold">Timing</th></tr></thead>
            <tbody className="divide-y divide-line">
              {motion.map(([a, b, c]) => <tr key={a}><td className="py-2.5 pr-3 font-medium">{a}</td><td className="py-2.5 pr-3 text-ink-2">{b}</td><td className="py-2.5 font-mono text-[12px] text-muted">{c}</td></tr>)}
            </tbody>
          </table>
        </Specimen>
        <Specimen title="Try it — hover states">
          <div className="grid grid-cols-2 gap-4">
            <CategoryCard category={categories[4]} compact />
            <ProductCard product={products[1]} />
          </div>
        </Specimen>
      </div>

      <Specimen title="Accessibility" className="mt-6">
        <ul className="grid gap-3 text-[14px] text-ink-2 sm:grid-cols-2 lg:grid-cols-3">
          {['Semantic landmarks (header, nav, main, footer) + skip link', 'Every icon button has an aria-label', 'Visible 2px violet focus rings', '44px minimum touch targets', 'Category never conveyed by colour alone (icon + label)', 'Dialogs trap focus entry and close on Esc', 'Tabs support ← → arrow keys', 'Native selects for filters', 'Respects prefers-reduced-motion'].map((a) => (
            <li key={a} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{a}</li>
          ))}
        </ul>
      </Specimen>
    </ShowcaseSection>
  );
}
