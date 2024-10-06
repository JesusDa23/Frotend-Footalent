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
        disponible: '#15690B',
        textDisponible: '#59F63A',
        ocupado: '#9E1618',
        textOcupado: '#FE6B6D',
        reparacion: '#C39F0B',
        textReparacion: '#815B12',
        deshabilitado: '#5B5C5F',
        textDeshabilitado: '#F5F5F6'
      }
    },
  },
  plugins: ['flowbite/plugin'],
}

