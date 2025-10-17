/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom theme extensions here
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, theme('colors.gray.200 / 0.75') 1px, transparent 1px), linear-gradient(to bottom, theme('colors.gray.200 / 0.75') 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-size': '4rem 4rem', // You can change the grid size here
      },
    },
  },
  plugins: [
    // Add your plugins here
  ],
}