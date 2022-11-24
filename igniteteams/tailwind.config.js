/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto_400Regular", "Roboto_700Bold"],
    },
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
    },
    colors: {
      white: "#FFFFFF",
      red: "#F75A68",
      "green-700": "#00875F",
      "green-500": "#00B37E",
      "red-dark": "#AA2834",
      "gray-700": "#121214",
      "gray-600": "#202024",
      "gray-500": "#29292E",
      "gray-400": "#323238",
      "gray-300": "#7C7C8A",
      "gray-200": "#C4C4CC",
      "gray-100": "#E1E1E6",
    },
    extend: {},
  },
  plugins: [],
};
