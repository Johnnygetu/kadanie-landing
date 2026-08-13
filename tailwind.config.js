/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fdf3f5',
          100: '#fbe3e8',
          200: '#f6cdd6',
          300: '#eea6b7',
          400: '#e0748e',
          500: '#cd4664',
          600: '#b32a4b',
          700: '#7b011e',
          800: '#5f0117',
          900: '#4a0113',
          950: '#2c0009',
        },
        cream: {
          50: '#fdfbf6',
          100: '#f9f4e9',
          200: '#f5f1e6',
          300: '#ece3cf',
          400: '#ddcfac',
          500: '#c9b585',
          600: '#b09a64',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(123, 1, 30, 0.18)',
        card: '0 4px 24px -8px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'scale-in': 'scale-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
