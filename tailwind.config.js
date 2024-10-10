/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./Frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-uam-img':"url('./Frontend/src/assets/backgrounds/bgbanner.jpg')",
        'body-footer-img':"url('./Frontend/src/assets/backgrounds/bgbanner2.jpg')",
      },
      colors: {
        'orange-uam':'#F08200',
      },
      screens: {
        'large': '992px',
      },
    },
  },
  plugins: [],
}

