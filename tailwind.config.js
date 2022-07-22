/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'blue': {
        ...colors.blue,
        700: "#0058a7"
      },
      'pink': {
        ...colors.pink,
        500: "#e00173"
      },
      'white': colors.white,
      'gray': colors.gray,
    }
  },
  plugins: [],
}
