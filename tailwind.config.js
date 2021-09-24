module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  extend: {
    textOpacity: ['dark']
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class'
}
