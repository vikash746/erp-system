/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f3a24', // Dark green sidebar
          light: '#f4f6f8', // Light gray background
          accent: '#1e8449', // Green accent
        }
      }
    },
  },
  plugins: [],
}
