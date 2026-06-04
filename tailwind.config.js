/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:   '#FAFAF9',
        surface:  '#F5F4F2',
        stroke:   '#E8E6E3',   // renamed from 'border' to avoid Tailwind conflict
        muted:    '#9B9693',
        ink:      '#4A4744',   // renamed from 'body' to avoid potential conflict
        heading:  '#1C1B1A',
        accent: {
          DEFAULT: '#4F6AF5',
          light:   '#EEF1FE',
          dark:    '#3B52D6',
        },
        emerald: {
          soft: '#F0FBF4',
          mid:  '#34C26A',
        },
        amber: {
          soft: '#FFFBEB',
          mid:  '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
