// Scripted, local-only responses for the Fandom Assistant. No AI backend.
export const botName = 'Fandom Assistant';

export const introMessage = {
  text: 'Hey! 👋\nWhat part of the FandomVerse are you exploring today?',
};

export const quickReplies = [
  { id: 'anime', label: 'Explore Anime' },
  { id: 'games', label: 'Browse Games' },
  { id: 'events', label: 'Upcoming Events' },
  { id: 'trailers', label: 'Watch Trailers' },
  { id: 'characters', label: 'Popular Characters' },
  { id: 'merch', label: 'Find Merchandise' },
];

/**
 * Each intent has keywords matched against the lowercased user message.
 * `result` tells ChatbotPanel which recommendation cards to render.
 */
export const intents = [
  {
    id: 'anime',
    keywords: ['anime', 'neon ronin', 'moonlit'],
    reply: 'Great pick. Anime is our most-followed universe this week — here’s where to start.',
    result: { kind: 'category', slug: 'anime' },
    followUps: ['Popular Characters', 'Watch Trailers'],
  },
  {
    id: 'games',
    keywords: ['game', 'gaming', 'games', 'skyfall', 'pixel vanguard', 'play'],
    reply: 'Here are the worlds players can’t put down right now.',
    result: { kind: 'category', slug: 'gaming' },
    followUps: ['Upcoming Events', 'Find Merchandise'],
  },
  {
    id: 'events',
    keywords: ['event', 'events', 'con', 'concert', 'premiere', 'meet'],
    reply: 'These are the next big fandom events on the calendar:',
    result: { kind: 'events' },
    followUps: ['Find Merchandise', 'Explore Anime'],
  },
  {
    id: 'trailers',
    keywords: ['trailer', 'trailers', 'video', 'watch', 'media'],
    reply: 'Grab some popcorn — the most-watched trailers this week:',
    result: { kind: 'media' },
    followUps: ['Upcoming Events', 'Popular Characters'],
  },
  {
    id: 'characters',
    keywords: ['character', 'characters', 'aiko', 'ren', 'nova', 'kael', 'who'],
    reply: 'These characters are trending across the FandomVerse:',
    result: { kind: 'characters' },
    followUps: ['Explore Anime', 'Browse Games'],
  },
  {
    id: 'merch',
    keywords: ['merch', 'merchandise', 'shop', 'buy', 'tee', 'figure', 'poster', 'hoodie', 'light stick'],
    reply: 'Here are a few collectibles fans are loving. (FandomVerse is a showcase — nothing is actually charged.)',
    result: { kind: 'products' },
    followUps: ['Upcoming Events', 'Watch Trailers'],
  },
  {
    id: 'kpop',
    keywords: ['kpop', 'k-pop', 'echo', 'lumina', 'music'],
    reply: 'Comeback season is here. Start with the K-Pop universe:',
    result: { kind: 'category', slug: 'kpop' },
    followUps: ['Upcoming Events', 'Find Merchandise'],
  },
  {
    id: 'movies',
    keywords: ['movie', 'movies', 'film', 'cinema', 'solar'],
    reply: 'Big-screen stories, coming right up:',
    result: { kind: 'category', slug: 'movies' },
    followUps: ['Watch Trailers', 'Upcoming Events'],
  },
  {
    id: 'releases',
    keywords: ['release', 'releases', 'coming soon', 'upcoming', 'new'],
    reply: 'Mark your calendar — here’s what’s coming soon:',
    result: { kind: 'releases' },
    followUps: ['Watch Trailers', 'Upcoming Events'],
  },
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo'],
    reply: 'Hey there! I can recommend stories, characters, trailers, events and merch. What are you in the mood for?',
    followUps: ['Explore Anime', 'Browse Games', 'Upcoming Events'],
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'cheers'],
    reply: 'Any time! Enjoy exploring the FandomVerse.',
    followUps: ['Popular Characters', 'Find Merchandise'],
  },
];

export const fallback = {
  reply: 'I’m a scripted demo assistant, so I don’t know that one yet. Try one of these:',
  followUps: ['Explore Anime', 'Browse Games', 'Upcoming Events', 'Find Merchandise'],
};

/** Map quick reply labels to intents so both buttons and typed text resolve the same way. */
const quickReplyIntent = {
  'Explore Anime': 'anime',
  'Browse Games': 'games',
  'Upcoming Events': 'events',
  'Watch Trailers': 'trailers',
  'Popular Characters': 'characters',
  'Find Merchandise': 'merch',
};

export function resolveIntent(message) {
  const direct = quickReplyIntent[message];
  if (direct) return intents.find((i) => i.id === direct);
  const text = ` ${message.toLowerCase().replace(/[^\w\s/-]/g, ' ')} `;
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keywords.reduce((s, k) => (text.includes(` ${k} `) || (k.length > 3 && text.includes(k)) ? s + k.length : s), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best;
}
