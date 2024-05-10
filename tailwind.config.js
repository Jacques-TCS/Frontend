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
        'background': '#1a202c',
        'light-text': '00314D',
        'light-light-blue': '#4ac9ff',
        'light-dark-blue': '#06b5ec',
        'dark-light-blue': '#0C62A0',
        'dark-dark-blue': '#064776',
        'background-logo': '#011c39'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
