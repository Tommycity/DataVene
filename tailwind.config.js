/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      colors: {
        "primary-deep": "#0E0E0E",
        "primary-light": "#535353",
        "secondary-deep": "#dc0000",
        "secondary-light": "#ff3838",
        "gray-light": "#dddddd",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
