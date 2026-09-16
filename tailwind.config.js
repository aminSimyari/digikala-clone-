/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // System font stack — no web font download needed.
        // When adding a web font later, e.g.:
        //   sans: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
        // the Vite font-display-swap plugin will automatically inject
        // `font-display: swap` into its @font-face declaration.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
