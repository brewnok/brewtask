/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#e6f4e1',  // Very light green
          100: '#cce9c3', // Light green
          200: '#b3dea5', // Slightly lighter
          300: '#99d387', // Light-mid tone
          400: '#80c869', // Approaching base
          500: '#2ba114', // Your base color (#2ba114)
          600: '#268d11', // Slightly darker
          700: '#20790e', // Darker green
          800: '#1b650b', // Quite dark
          900: '#165108', // Very dark
          950: '#113d06', // Nearly black green
        },
      },
    },
  },
  plugins: [],
};