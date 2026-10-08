/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xes: {
          primary: '#FF6B35',
          secondary: '#FF8C42',
          accent: '#FFE4D6',
          light: '#FFF8F0',
          dark: '#333333',
          gray: '#666666',
          success: '#52C41A',
          warning: '#FAAD14',
          error: '#F5222D',
          chinese: '#FF6B6B',
          math: '#4ECDC4',
          english: '#45B7D1',
        },
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
