/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        saffron: {
          50: "#fff8f0",
          100: "#fff0dc",
          400: "#f5a623",
          500: "#e8930d",
          600: "#c97a00",
        },
        spice: {
          900: "#1a0a00",
          800: "#2d1500",
          700: "#3d1f00",
          600: "#5c3000",
        },
      },
    },
  },
  plugins: [],
};
