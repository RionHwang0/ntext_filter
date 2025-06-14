/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'toss-blue': '#3182f6',
        'toss-blue-dark': '#1b64da',
        'toss-blue-light': '#e7f0fe',
        'toss-black': '#191f28',
        'toss-gray': '#8b95a1',
        'toss-gray-light': '#f2f4f6',
        'toss-gray-dark': '#4e5968',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'toss': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'toss-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 