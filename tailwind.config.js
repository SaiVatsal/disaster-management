/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alert: {
          bg: '#09090b',
          surface: '#18181b',
          red: '#dc2626',
          crimson: '#ef4444',
          orange: '#ea580c',
          amber: '#d97706',
          border: '#27272a'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
