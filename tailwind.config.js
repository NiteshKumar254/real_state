/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Blue + Teal + Ice White Palette
        royal: {
          DEFAULT: '#123B68',
          hover: '#0B2C50',
          dark: '#0B2C50',
          deep: '#0B2540',
          light: '#1B4A7E'
        },
        teal: {
          DEFAULT: '#00A6A0',
          hover: '#008B86',
          light: '#26C2BC',
          dark: '#007A76'
        },
        ice: {
          DEFAULT: '#F3F8FC',
          light: '#F8FBFE',
          surface: '#FFFFFF',
          border: '#D6E3EC'
        },
        softblue: {
          DEFAULT: '#DDEBF3',
          border: '#C5DAE8'
        },
        darkheading: '#142D46',
        bodytext: '#526579',
        mutedtext: '#718396',
        
        // System and backward-compatible semantic mappings
        primary: {
          dark: '#142D46',
          DEFAULT: '#123B68',
          hover: '#0B2C50',
          light: '#1B4A7E',
          surface: '#0B2540'
        },
        accent: {
          DEFAULT: '#00A6A0',
          hover: '#008B86'
        },
        luxury: {
          gold: '#00A6A0',      // Replaced gold with Teal
          goldLight: '#26C2BC',
          goldDark: '#008B86'
        },
        warm: {
          offwhite: '#F3F8FC',  // Replaced with Ice White
          secondary: '#DDEBF3', // Replaced with Soft Blue
          cream: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#718396',
          light: '#94A3B8',
          dark: '#526579'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(18, 59, 104, 0.08)',
        'luxury-hover': '0 30px 60px -20px rgba(0, 166, 160, 0.18)',
        'teal-glow': '0 0 25px rgba(0, 166, 160, 0.35)',
        'royal-card': '0 10px 30px -10px rgba(18, 59, 104, 0.1)'
      }
    },
  },
  plugins: [],
}
