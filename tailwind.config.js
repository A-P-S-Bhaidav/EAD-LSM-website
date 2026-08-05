/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Montserrat", "sans-serif"],
        serif: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        lightbg: "#F4F7F9",
        tealbg: "#7DA6A9",
        cardbg: "#FFFFFF",
        primaryText: "#0F172A",
        secondaryText: "#334155",
        accentPrimary: "#0F172A",
        accentTeal: "#7DA6A9",
      },
    },
  },
  plugins: [],
}
