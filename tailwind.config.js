/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    fontFamily: {
      bold: 'Nunito_700Bold',
      semibold: 'Nunito_600SemiBold',
      sans: ['Nunito_400Regular'],
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito_400Regular'],
        'nunito-semibold': ['Nunito_600SemiBold'],
        'nunito-bold': ['Nunito_700Bold'],
      },
      colors: {
        'brick-red': {
          950: '#411017',
          900: '#762532',
          800: '#892834',
          700: '#a32d38',
          600: '#bf3b44',
          500: '#d75c5e',
          400: '#e58887',
          300: '#efb3b2',
          200: '#f6d6d5',
          100: '#fbe9e8',
          50: '#fdf4f3',
        },
        green: {
          950: '#17250e',
          900: '#304522',
          800: '#375024',
          700: '#426328',
          600: '#54812f',
          500: '#639339',
          400: '#8cbe5d',
          300: '#aad284',
          200: '#cce4b2',
          100: '#e4f1d6',
          50: '#f3f9ec',
        },
        base: {
          700: '#FFFFFF',
          600: '#FAFAFA',
          500: '#DDDEDF',
          400: '#DDDEDF',
          300: '#B9BBBC',
          200: '#5C6265',
          100: '#333638',
          50: '#1B1D1E',
        },
      },
      fontSize: {
        xsm: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        md: '1rem', // 16px
        mdi: '1.125rem', // 18px
        lg: '1.5rem', // 24px
        xlg: '2rem', // 32px
      },
      lineHeight: {
        130: '1.3',
      },
    },
  },
  plugins: [],
};
