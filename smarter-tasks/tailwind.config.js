/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(var(--bg) / <alpha-value>)',
        surface: 'oklch(var(--surface) / <alpha-value>)',
        fg: 'oklch(var(--fg) / <alpha-value>)',
        muted: 'oklch(var(--muted) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        accent: 'oklch(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
