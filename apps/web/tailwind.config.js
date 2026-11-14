/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Royal foundation
        obsidian: '#06152D',
        'midnight-blue': '#091D3A',
        royal: '#104BB5',
        sapphire: '#174A8B',
        'electric-blue': '#176BFF',
        'deep-indigo': '#17245E',
        // Deep metallic gold
        'imperial-gold': '#C58B22',
        'antique-gold': '#A97916',
        'dark-metallic-gold': '#8C5B0A',
        'golden-bronze': '#A66E16',
        // Emerald and turquoise
        emerald: '#087C61',
        'vibrant-emerald': '#00A878',
        'deep-forest': '#064D3B',
        'deep-teal': '#006C78',
        turquoise: '#00B9A8',
        // Purple and violet
        'royal-amethyst': '#641B9B',
        'deep-purple': '#37136F',
        'vibrant-violet': '#8B35D6',
        'electric-violet': '#7138F5',
        // Ruby and red
        ruby: '#B52E55',
        'deep-burgundy': '#651B39',
        crimson: '#C62845',
        // Cyan and copper
        'electric-cyan': '#00D5FF',
        'burnished-copper': '#A64F27',
        'burnt-orange': '#D05A16',
        'deep-amber': '#C17D16',
        // Semantic (direct hex, not CSS variables)
        bg: '#06152D',
        surface: '#091D3A',
        text: '#F7F8FC',
        muted: '#9AA7BD',
        border: '#1E3A5C',
        shadow: '#06152D',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 20px 40px -10px rgba(6, 21, 45, 0.4)',
        card: '0 24px 48px -16px rgba(6, 21, 45, 0.5)',
        lift: '0 32px 64px -24px rgba(6, 21, 45, 0.6)',
        'glow-gold': '0 0 50px -15px rgba(197, 139, 34, 0.5)',
        'glow-cyan': '0 0 50px -15px rgba(0, 213, 255, 0.5)',
        'glow-emerald': '0 0 50px -15px rgba(8, 124, 104, 0.5)',
        'glow-purple': '0 0 50px -15px rgba(100, 27, 155, 0.5)',
        'glow-ruby': '0 0 50px -15px rgba(181, 46, 85, 0.5)',
      },
      backgroundImage: {
        'gradient-royal': 'linear-gradient(135deg, #06152D 0%, #091D3A 30%, #104BB5 60%, #174A8B 100%)',
        'gradient-sapphire': 'linear-gradient(135deg, #091D3A 0%, #174A8B 50%, #176BFF 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C58B22 0%, #A97916 50%, #8C5B0A 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #006C78 0%, #00B9A8 50%, #00D5FF 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #064D3B 0%, #087C61 50%, #00A878 100%)',
        'gradient-purple': 'linear-gradient(135deg, #37136F 0%, #641B9B 50%, #8B35D6 100%)',
        'gradient-ruby': 'linear-gradient(135deg, #651B39 0%, #B52E55 50%, #C62845 100%)',
        'gradient-copper': 'linear-gradient(135deg, #8C5B0A 0%, #A64F27 50%, #D05A16 100%)',
        'gradient-teal': 'linear-gradient(135deg, #006C78 0%, #00B9A8 50%, #176BFF 100%)',
        'gradient-midnight': 'linear-gradient(180deg, #06152D 0%, #091D3A 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.375rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.6' }],
        'tiny': ['0.75rem', { lineHeight: '1.5' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px -10px currentColor' },
          '50%': { boxShadow: '0 0 60px -20px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
