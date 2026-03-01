/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['pretMedium'], // 기본 폰트
        bold: ['pretBold'], // font-bold
      },
      colors: {
        primary: '#F6764E',
        secondary: '#FBE5DE',
        background: '#FBFAF9',
        black: '#111111',
        white: '#FFFFFF',
        gray: {
          text: '#979797',
          ui: '#D9D9D9',
        },
      },
    },
  },
  plugins: [],
};
