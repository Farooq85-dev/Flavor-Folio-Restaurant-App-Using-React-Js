/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#d8ac1d",
        tertiary: "#e9eefc",
        pertiary: "#bccbf6",
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};
