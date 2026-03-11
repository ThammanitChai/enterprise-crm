/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#eef7ff',
            100: '#d9edff',
            500: '#2563eb',
            600: '#1d4ed8',
            700: '#1e40af'
          }
        },
        boxShadow: {
          soft: '0 10px 30px rgba(2, 6, 23, 0.08)'
        }
      }
    },
    plugins: []
  };