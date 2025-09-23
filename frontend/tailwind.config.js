
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1A1A2E',
        'card-bg': '#252540',
        'card-border': '#373752',
        'accent': '#00F5D4',
        'primary-text': '#FFFFFF',
        'secondary-text': '#9CA3AF',
        'success': '#34D399',
        'warning': '#FBBF24',
        'error': '#F87171',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
