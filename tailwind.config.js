/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        colorPpal: '#d9754a',
        hoverPpal: '#B05F3C',
        colorSec: '#2f302b',
        backColor: '#e4e3d3'
      },
      backgroundImage: theme => ({
        'fondo': "url('/fondo.jpg')", // Agrega tu imagen de fondo aquí
      })
    },
  },
  plugins: [require('daisyui')],
};