/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gradientStart: '#ffafbd',
        gradientEnd: '#ffc3a0',
      },
    },
  },
  plugins: [],
}

