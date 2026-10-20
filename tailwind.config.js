/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)',
          soft: 'var(--accent-soft)',
        },
      },
      borderRadius: {
        'glass-xl': '30px',
        'glass-lg': '24px',
        'glass-md': '18px',
        'glass-sm': '12px',
      },
      backdropBlur: {
        'glass': 'var(--blur)',
        'glass-thick': 'var(--blur-thick)',
      },
      boxShadow: {
        'glass': 'var(--shadow)',
        'glass-lift': 'var(--shadow-lift)',
        'lens': 'var(--lens-glow)',
      }
    },
  },
  plugins: [],
}
