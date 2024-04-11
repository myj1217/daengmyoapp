/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // main: "url('./images/main.png')",
        // sub: "url('./images/sub.png')",
        // error: "url('./images/error.png')",
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          fadeOut: {
            "0%": { opacity: "1" },
            "100%": { opacity: "0" },
          },
          animation: {
            "fade-in": "fadeIn 0.5s ease-out forwards",
            "fade-out": "fadeOut 0.5s ease-out forwards",
          },
        },
      },
    },
  },
  plugins: [],
};