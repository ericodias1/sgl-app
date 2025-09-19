/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "../global.css",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: { 
          50: '#faffe7',
          100: '#f0ffc1',
          200: '#e6ff86',
          300: '#e0ff41',
          400: '#e4ff0d',
          500: '#edfc00',
          600: '#d1cb00',
          700: '#a69502',
          800: '#89730a',
          900: '#745e0f',
          950: '#443304'
        }
      }
    },
    darkMode: "class"
  },
  plugins: [],
}