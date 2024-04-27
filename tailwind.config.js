/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-bg": "#0f0e17",
        "white-bg": "#fffffe",
        "white-h": "#fffffe",
        "gray-p": "#a7a9be",
        "orange-btn": "#ff8906",
        "white-btn-text": "#fffffe",
        "link":"#e53170",
      },
    },
  },
  plugins: [],
}