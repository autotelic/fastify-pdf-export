import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./example/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
