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
        'background-logo': '#011c39',
        'background': '#1a202c',
        'light-text': '00314D',
        'light-light-blue': '#4ac9ff',
        'light-dark-blue': '#06b5ec',
        'dark-light-blue': '#064776',
        'dark-dark-blue': '#011C39',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
};
