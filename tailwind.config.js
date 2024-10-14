/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./Frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-uam-img': "url('./Frontend/src/assets/backgrounds/bgbanner.jpg')",
        'body-footer-img': "url('./Frontend/src/assets/backgrounds/bgbanner2.jpg')",
        'acercade': "url('./Frontend/src/assets/backgrounds/bgacercade.jpg')",
        'quienessomos': "url('./Frontend/src/assets/backgrounds/bgquienesomos.jpg')",
        'jefesdeldmas': "url('./Frontend/src/assets/backgrounds/bgjefes.png')"
      },
      colors: {
        'orange-uam': '#F08200',
        'jefesheader':'#ffe284'
      },
      screens: {
        'large': '992px',
        'jefes-space': '850px',
      },
    },
  },
  plugins: [],
}