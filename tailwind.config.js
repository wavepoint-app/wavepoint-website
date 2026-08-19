/** @type {import('tailwindcss').Config} */
const colors = require('./constants/theme.colors.json');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      borderRadius: {
        sheet: '28px',
        card: '14px',
      },
      fontFamily: {
        sans: [
          'SF Compact',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      letterSpacing: {
        headline: '-0.72px',
      },
    },
  },
  plugins: [],
};
