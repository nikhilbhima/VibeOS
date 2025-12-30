/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', './src/renderer/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors - warm neutrals
        bg: {
          base: 'hsl(30, 18%, 5%)',
          surface: 'hsl(30, 15%, 8%)',
          elevated: 'hsl(30, 12%, 12%)',
          hover: 'hsl(30, 10%, 15%)',
        },
        // Border colors
        border: {
          subtle: 'hsl(30, 10%, 15%)',
          DEFAULT: 'hsl(30, 10%, 20%)',
          strong: 'hsl(30, 10%, 30%)',
        },
        // Text colors
        text: {
          primary: 'hsl(30, 20%, 95%)',
          secondary: 'hsl(30, 10%, 65%)',
          muted: 'hsl(30, 8%, 45%)',
        },
        // Accent - warm orange (Claude-inspired)
        accent: {
          DEFAULT: 'hsl(25, 84%, 55%)',
          hover: 'hsl(25, 84%, 60%)',
          muted: 'hsl(25, 50%, 20%)',
        },
        // Semantic colors
        success: 'hsl(142, 70%, 45%)',
        warning: 'hsl(38, 90%, 50%)',
        error: 'hsl(0, 70%, 55%)',
        info: 'hsl(200, 90%, 50%)',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['13px', { lineHeight: '20px' }],
        base: ['14px', { lineHeight: '22px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
      },
      spacing: {
        // 4px grid system
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
