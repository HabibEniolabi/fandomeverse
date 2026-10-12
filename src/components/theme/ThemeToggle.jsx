import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

/** Sun/Moon toggle. Keyboard accessible, announces state, animates the icon swap. */
export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'switch') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={label}
        onClick={toggleTheme}
        className={`relative inline-flex h-11 w-[88px] items-center rounded-full border border-line bg-surface-2 p-1 transition ${className}`}
      >
        <span className={`absolute top-1 h-9 w-9 rounded-full bg-surface shadow-soft transition-transform duration-300 ease-out ${isDark ? 'translate-x-[42px]' : 'translate-x-0'}`} />
        <Sun className={`relative z-10 ml-2 h-5 w-5 transition-colors ${isDark ? 'text-muted' : 'text-[#E5A900]'}`} aria-hidden="true" />
        <Moon className={`relative z-10 ml-auto mr-2 h-5 w-5 transition-colors ${isDark ? 'text-brand' : 'text-muted'}`} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-ink transition hover:bg-surface-2 active:scale-95 ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-out ${isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-out ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
        aria-hidden="true"
      />
    </button>
  );
}
