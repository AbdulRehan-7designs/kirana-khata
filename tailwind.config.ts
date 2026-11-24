import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        khata: {
          bg: '#FAF6EF',          // Warm Porcelain (creamy paper background)
          surface: '#F2E8D9',     // Soft Sand (warm tactile card base)
          card: '#FFFFFF',        // Crisp card surface
          primary: '#C85C32',     // Burnt Terracotta
          primaryHover: '#B54F27',
          highlight: '#E98A55',   // Apricot glowing highlight
          text: '#29211D',        // Deep Espresso
          secondary: '#766A61',   // Warm Taupe
          muted: '#A3968C',       // Subtle taupe
          positive: '#71835C',    // Muted Olive
          positiveBg: '#E7EBDD',  // Sage Mist
          divider: '#E5D9CA',     // Warm Linen
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 10px -2px rgba(41, 33, 29, 0.04), 0 1px 3px 0 rgba(41, 33, 29, 0.02)',
        'warm-md': '0 10px 25px -4px rgba(41, 33, 29, 0.06), 0 4px 10px -2px rgba(41, 33, 29, 0.03)',
        'warm-lg': '0 20px 40px -10px rgba(41, 33, 29, 0.10), 0 8px 16px -4px rgba(41, 33, 29, 0.04)',
        'warm-inner': 'inset 0 2px 4px 0 rgba(41, 33, 29, 0.05)',
        'glow-terracotta': '0 8px 25px -5px rgba(200, 92, 50, 0.35)',
        'glow-olive': '0 8px 25px -5px rgba(113, 131, 92, 0.35)',
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
};

export default config;
