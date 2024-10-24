/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js}",
    "./node_modules/flowbite/**/*.js" 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" },
        header: '#FAFAFA',
        cardBorder: '#BFBFBF',
        bgBtn: '#AEAFB2',
        btnColor: '#0A135D',
        disponible: '#ABFF95',
        textDisponible: '#15690B',
        ocupado: '#FFC8C9',
        textOcupado: '#9E1618',
        reparacion: '#F9FA8E',
        textReparacion: '#815B12',
        deshabilitado: '#85868B',
        textDeshabilitado: '#444546',
        bgColorBlue: '#0A135D',
        bgAzulClaron:'#E8EFFF'
      }
    },
  },
  plugins: ['flowbite/plugin'],
}

