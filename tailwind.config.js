/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./Frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        //Background Section
        'body-uam-img': "url('./Frontend/src/assets/backgrounds/bgbanner.jpg')",
        'body-footer-img': "url('./Frontend/src/assets/backgrounds/bgbanner2.jpg')",
        'acercade': "url('./Frontend/src/assets/backgrounds/bgacercade.jpg')",
        'quienesomos': "url('./Frontend/src/assets/backgrounds/bgquienesomos.jpg')",
        'jefesdeldmas': "url('./Frontend/src/assets/backgrounds/bgjefes.png')",
        'fondologin': "url('./Frontend/src/assets/backgrounds/endless-constellation.svg')",
        'sugerencias': '../assets/backgrounds/bgsugerencias.jpg',
        //Background Categorias
        'seminarios':'../assets/backgrounds/bgseminario.jpg',
        'eventos':'../assets/backgrounds/bgeventos.jpg',
        'lineamientos':'../assets/backgrounds/bglineamientoproc.jpg',
        'investigacion': '../assets/backgrounds/bgproyectoinvestigacion.jpg',
        'terminales':'../assets/backgrounds/bgproyectoterminal.jpg',
        'publicaciones':'../assets/backgrounds/bgpublicaciones.jpg',
      },
      colors: {
        'orange-uam': '#F08200',
        'jefesheader': '#ffe284'
        // submitBtn: 'var(--submit-btn)',
      },
      screens: {
        'large': '992px',
        'jefes-space': '850px',
        'medio': '768px'
      },

    },
  },
  plugins: [],

}
