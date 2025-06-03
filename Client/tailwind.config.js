/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        primary: "#4a6cf7",
        "primary-light": "#6582f9",
        "primary-dark": "#3b55d9",
        secondary: "#f5f7fb",
        "sidebar-bg": "#f5f7fb",
        "content-bg": "#f8fafc",
        "text-primary": "#111827",
        "text-secondary": "#4b5563",
        accent: "#4a6cf7",
        danger: "#ef4444",
        success: "#10b981",
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
