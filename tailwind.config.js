/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#322824',
        'espresso-soft': '#3D322D',
        ivory: '#F7F3EB',
        'ivory-soft': '#FAF6EE',
        gold: '#C5A46D',
        'gold-soft': '#D8C49B',
        'gold-deep': '#A8854E',
        sage: '#89917B',
        'sage-soft': '#A7AE9B',
        charcoal: '#242522',
        sand: '#E8DFD1',
        'sand-deep': '#D9CDB8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        bodoni: ['"Bodoni Moda"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Satoshi"', '"DM Sans"', 'system-ui', 'sans-serif'],
        satoshi: ['"Satoshi"', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.22em',
        'wider-2': '0.14em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '100rem',
      },
    },
  },
  plugins: [],
};
