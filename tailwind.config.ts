import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F0E8',
          text: '#1A1A1A',
          textLight: '#666666',
          border: '#D0C8B8',
          cyan: '#00B8CC',
          navy: '#003F6B',
          purple: '#8B5CF6',
          green: '#22C55E',
          red: '#EF4444',
          yellow: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'Noto Sans JP', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        arial: ['var(--font-arial)', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
