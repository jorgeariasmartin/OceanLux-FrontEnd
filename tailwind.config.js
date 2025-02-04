/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#102F41',
        'primary-light': '#17688D',
        'primary-lighter': '#1C87B5',
        'secondary': '#F2F9FD',
        'gray': '#F1EFEF',
        'alert': '#DC3545'
      }
    },
  },
  plugins: [],
};
