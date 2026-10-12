import { BookOpen, Film, Gamepad2, Mic2, Sparkles, Tv, Zap } from 'lucide-react';

export const categoryIcons = {
  anime: Sparkles,
  gaming: Gamepad2,
  movies: Film,
  tv: Tv,
  kpop: Mic2,
  comics: Zap,
  manga: BookOpen,
};

export default function CategoryIcon({ slug, className = 'h-5 w-5', ...rest }) {
  const Icon = categoryIcons[slug] || Sparkles;
  return <Icon className={className} aria-hidden="true" {...rest} />;
}
