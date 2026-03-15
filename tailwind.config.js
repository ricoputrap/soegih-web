/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D7A7F',
        'primary-dark': '#256568',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'system-ui', 'sans-serif'],
      },
    },
  },
}
