import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          raised: 'rgb(var(--ink-raised) / <alpha-value>)',
          panel: 'rgb(var(--ink-panel) / <alpha-value>)',
          line: 'rgb(var(--chalk) / 0.1)',
        },
        electric: 'rgb(var(--electric) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        chalk: 'rgb(var(--chalk) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'var(--font-devanagari)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-devanagari)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.4rem, 10.5vw, 9.5rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.6rem, 6.2vw, 5.4rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4vw, 3.4rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        shell: '82rem',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 3.5rem)',
      },
      transitionTimingFunction: {
        signal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-8px,0)' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 6s ease-in-out infinite',
        'pulse-line': 'pulse-line 3s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
