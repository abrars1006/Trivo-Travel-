/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF7',
        surface: '#EAF3ED',
        borderline: '#E7EAE5',
        dark: '#202822',
        muted: '#737B75',
        primary: {
          50: '#F2F8F5',
          100: '#EAF3ED',
          200: '#D2E6DC',
          300: '#9FC8B4',
          400: '#5BA384',
          500: '#2E8062',
          600: '#1E6B50',
          700: '#17543E',
          800: '#134232',
          900: '#0E2E23',
          DEFAULT: '#1E6B50',
        },
        sand: {
          50: '#FEFCF7',
          100: '#FDF7EB',
          200: '#F9ECCC',
          300: '#F3DCA2',
          400: '#E6B96A',
          500: '#D49E43',
          600: '#B57C2A',
          DEFAULT: '#E6B96A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(32, 40, 34, 0.04)',
        'card': '0 4px 20px -2px rgba(32, 40, 34, 0.06), 0 2px 6px -1px rgba(32, 40, 34, 0.04)',
        'float': '0 20px 30px -10px rgba(30, 107, 80, 0.15), 0 8px 10px -6px rgba(32, 40, 34, 0.06)',
      }
    },
  },
  plugins: [],
}
