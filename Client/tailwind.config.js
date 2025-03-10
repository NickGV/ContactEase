/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['"Poppins", sans-serif']
    },
    extend: {
      height: {
        87: '87%',
        95: '95%'
      },
      width: {
        30: '30%'
      },
      colors: {
        'black-bg': '#0f0e17',
        'white-bg': '#fffffe',
        'white-h': '#fffffe',
        'gray-p': '#a7a9be',
        'orange-btn': '#ff8906',
        'white-btn-text': '#fffffe',
        link: '#e53170'
      },
      boxShadow: {
        'illustration': '0 0 20px rgba(0, 0, 0, 0.5)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#888 transparent',
          '::-webkit-scrollbar': {
            width: '4px',
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '2px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      }
      addUtilities(newUtilities, ['responsive']);
    },
  ]
}
