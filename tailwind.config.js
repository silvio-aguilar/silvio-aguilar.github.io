/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Asegúrate de que esto esté configurado correctamente
  content: ["./src/**/*.{html,js}"], // Asegúrate de que esto apunte a tus archivos correctamente
  theme: {
    extend: {
      boxShadow: {
        'green-400': '0 4px 6px -1px rgba(34, 197, 94, 0.5), 0 2px 4px -2px rgba(34, 197, 94, 0.3)',
      },
    },
  },
  plugins: [],
}
