/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/theme/styles/theme");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto_400Regular"],
      "roboto-bold": ["Roboto_700Bold"],
    },
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
    },
    colors: { ...colors },
    extend: {},
  },
  plugins: [],
};
