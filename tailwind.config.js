/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background': '#1a202c', // This sets the default background color.
        'background-logo': '#011c39'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
