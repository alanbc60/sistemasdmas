/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./Frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-uam-img': "url('./Frontend/src/assets/backgrounds/bgbanner.jpg')",
        'body-footer-img': "url('./Frontend/src/assets/backgrounds/bgbanner2.jpg')",
        'acercade': "url('./Frontend/src/assets/backgrounds/bgacercade.jpg')",
        'quienesomos': "url('./Frontend/src/assets/backgrounds/bgquienesomos.jpg')",
        'jefesdeldmas': "url('./Frontend/src/assets/backgrounds/bgjefes.png')",
        'fondologin': "url('./Frontend/src/assets/backgrounds/endless-constellation.svg')",
        'sugerencias': "url('./Frontend/src/assets/backgrounds/bgsugerencias.jpg')",

        'seminarios': "url('./Frontend/src/assets/backgrounds/bgseminario.jpg')",
        'eventos': "url('./Frontend/src/assets/backgrounds/bgeventos.jpg')",
        'lineamientosproc': "url('./Frontend/src/assets/backgrounds/bglineamientoproc.jpg')",
        'proyectosinvestigacion': "url('./Frontend/src/assets/backgrounds/bgproyectoinvestigacion.jpg')",
        'proyectosterminales': "url('./Frontend/src/assets/backgrounds/bgproyectoterminal.jpg')",
        'publicaciones': "url('./Frontend/src/assets/backgrounds/bgpublicaciones.jpg')",
      },
      colors: {
        'orange-uam': '#F08200',
        'jefesheader':'#ffe284',
        'button-submit': '#00C3DB',
        // submitBtn: 'var(--submit-btn)',
      },
      screens: {
        'large': '992px',
        'jefes-space': '850px',
      },

    },
  },
  plugins: [],

}

