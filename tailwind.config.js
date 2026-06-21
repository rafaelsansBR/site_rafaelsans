/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      colors: {
        primary: '#0a0a0a',
        secondary: '#111111',
        accent: '#3498DB',
      },
    },
  },
  plugins: [],
}
