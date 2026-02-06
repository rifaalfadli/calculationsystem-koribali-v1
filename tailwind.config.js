/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        hp: { max: "500px" },
        2040: "2040px",
      },
    },
  },
  plugins: [],
};
