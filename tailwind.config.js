/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E4002B',
        'primary-dark': '#B80022',
        'primary-container': '#FCE4E8',
        'on-primary': '#ffffff',
        secondary: '#FF671B',
        'secondary-container': '#FFE7D6',
        tertiary: '#0F7A6C',
        'tertiary-container': '#D7EFEA',
        ink: '#1A1A1A',
        muted: '#6E6E78',
        canvas: '#F2EFEA',
        card: '#ffffff',
        line: '#EAE6DF',
        success: '#1A7F37',
        warning: '#B7791F',
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.04)',
        float: '0 8px 20px rgba(0,0,0,0.08)',
        frame: '0 30px 80px rgba(23,23,23,0.28)',
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: { shimmer: 'shimmer 1.4s ease infinite' },
    },
  },
  plugins: [],
};
