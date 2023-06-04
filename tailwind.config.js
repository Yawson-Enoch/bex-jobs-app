const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1024px',
      },
    },
    extend: {
      colors: {
        border: 'rgba(var(--border), <alpha-value>)',
        input: 'rgba(var(--input), <alpha-value>)',
        ring: 'rgba(var(--ring), <alpha-value>)',
        background: 'rgba(var(--background), <alpha-value>)',
        foreground: 'rgba(var(--foreground), <alpha-value>)',
        primary: {
          DEFAULT: 'rgba(var(--primary), <alpha-value>)',
          foreground: 'rgba(var(--primary-foreground), <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary), <alpha-value>)',
          foreground: 'rgba(var(--secondary-foreground), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive), <alpha-value>)',
          foreground: 'rgba(var(--destructive-foreground), <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgba(var(--info), <alpha-value>)',
          border: 'rgba(var(--info-border), <alpha-value>)',
          foreground: 'rgba(var(--info-foreground), <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgba(var(--warning), <alpha-value>)',
          border: 'rgba(var(--warning-border), <alpha-value>)',
          foreground: 'rgba(var(--warning-foreground), <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgba(var(--success), <alpha-value>)',
          border: 'rgba(var(--success-border), <alpha-value>)',
          foreground: 'rgba(var(--success-foreground), <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgba(var(--error), <alpha-value>)',
          border: 'rgba(var(--error-border), <alpha-value>)',
          foreground: 'rgba(var(--error-foreground), <alpha-value>)',
          'form-foreground':
            'rgba(var(--error-form-foreground), <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgba(var(--muted), <alpha-value>)',
          foreground: 'rgba(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgba(var(--accent), <alpha-value>)',
          foreground: 'rgba(var(--accent-foreground), <alpha-value>)',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-bg-patterns')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
