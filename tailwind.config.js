/** @type {import('tailwindcss').Config} */
export default {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        amarillo1: '#ffff00',
        amarillo2: '#ffca28',
        amarillo3: '#ffcb05'     
      },
      borderRadius: {
        'xl': '0.8rem',
      },
    },
  },
  plugins: [],
}

