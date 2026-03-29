import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/renderer/src/**/*.{ts,tsx,html}', './src/renderer/index.html'],
  theme: {
    extend: {
      colors: {
        x: {
          bg: 'var(--x-bg)',
          'bg-secondary': 'var(--x-bg-secondary)',
          'bg-hover': 'var(--x-bg-hover)',
          'bg-overlay': 'var(--x-bg-overlay)',
          text: 'var(--x-text)',
          'text-secondary': 'var(--x-text-secondary)',
          accent: 'var(--x-accent)',
          'accent-hover': 'var(--x-accent-hover)',
          border: 'var(--x-border)',
          danger: 'var(--x-danger)',
          success: 'var(--x-success)',
          repost: 'var(--x-repost)',
          like: 'var(--x-like)',
          reply: 'var(--x-reply)'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ]
      },
      fontSize: {
        'x-xs': ['11px', { lineHeight: '16px' }],
        'x-sm': ['13px', { lineHeight: '16px' }],
        'x-base': ['15px', { lineHeight: '20px' }],
        'x-lg': ['17px', { lineHeight: '24px' }],
        'x-xl': ['20px', { lineHeight: '24px' }],
        'x-2xl': ['23px', { lineHeight: '28px' }]
      },
      borderRadius: {
        'x-sm': '4px',
        'x-md': '8px',
        'x-lg': '16px',
        'x-xl': '20px',
        'x-full': '9999px'
      },
      spacing: {
        'x-1': '4px',
        'x-2': '8px',
        'x-3': '12px',
        'x-4': '16px',
        'x-5': '20px'
      },
      animation: {
        'x-spin': 'x-spin 1s linear infinite',
        'x-pulse': 'x-pulse 2s ease-in-out infinite',
        'x-fade-in': 'x-fade-in 0.2s ease-out',
        'x-slide-up': 'x-slide-up 0.3s ease-out',
        'x-scale-in': 'x-scale-in 0.15s ease-out'
      },
      keyframes: {
        'x-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        'x-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'x-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'x-slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'x-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: []
}

export default config
