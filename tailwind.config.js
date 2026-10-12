/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        elevated: token('elevated'),
        ink: token('ink'),
        'ink-2': token('ink-2'),
        muted: token('muted'),
        line: token('line'),
        brand: {
          DEFAULT: token('brand'),
          hover: token('brand-hover'),
        },
        navy: '#12142B',
        anime: '#F45B9C',
        gaming: '#3978F6',
        movies: '#FF8A3D',
        tv: '#7459E8',
        kpop: '#D94DCE',
        comics: '#E5A900',
        manga: '#16A6A1',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(23 23 31 / 0.04), 0 4px 16px -4px rgb(23 23 31 / 0.08)',
        lift: '0 2px 4px rgb(23 23 31 / 0.04), 0 16px 32px -12px rgb(23 23 31 / 0.18)',
        brand: '0 8px 24px -8px rgb(100 84 232 / 0.55)',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        pop: { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.25)' }, '100%': { transform: 'scale(1)' } },
        blink: { '0%, 80%, 100%': { opacity: 0.25 }, '40%': { opacity: 1 } },
        'spin-in': { from: { transform: 'rotate(-90deg) scale(0.6)', opacity: 0 }, to: { transform: 'rotate(0) scale(1)', opacity: 1 } },
      },
      animation: {
        'fade-up': 'fade-up 250ms ease-out both',
        'fade-in': 'fade-in 200ms ease-out both',
        'slide-in-right': 'slide-in-right 280ms cubic-bezier(.2,.8,.2,1) both',
        pop: 'pop 300ms ease-out',
        blink: 'blink 1.2s infinite ease-in-out',
        'spin-in': 'spin-in 250ms ease-out both',
      },
    },
  },
  plugins: [],
};
