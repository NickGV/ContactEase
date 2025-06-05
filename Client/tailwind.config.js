/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Poppins", sans-serif'],
    },
    extend: {
      height: {
        87: "87%",
        95: "95%",
      },
      width: {
        30: "30%",
      },
      colors: {
        "primary": "#3b55d9",
        "primary-light": "#4a6cf7",
        "primary-dark": "#2a3fa0",
        secondary: "#1a1a1a",
        "sidebar-bg": "#1a1a1a",
        "content-bg": "#242424",
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
        accent: "#3b55d9",
        danger: "#dc2626",
        success: "#059669",
      },
      boxShadow: {
        illustration: "0 0 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#888 transparent",
          "::-webkit-scrollbar": {
            width: "4px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "2px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
