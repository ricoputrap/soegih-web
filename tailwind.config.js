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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2D7A7F",
          "primary-focus": "#256568",
          "primary-content": "#ffffff",
          "secondary": "#f3f4f6",
          "accent": "#2D7A7F",
          "neutral": "#111827",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#dc2626",
        },
      },
    ],
    darkMode: ["class", "light"],
    defaultTheme: "light",
  },
}
