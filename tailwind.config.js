module.exports = {
  theme: {
    screens: {
      // Constants taken from UI constants.
      // Think of them as 'beyond this breakpoint' when using
      // mobile:my-class, for example.
      // -> @media (min-width: {}px) { ... }
      mobile: '500px',
      tablet: '850px',
      desktop: '1100px',
    },
    fontFamily: {
      mono: ['SourceCodePro'],
      somatic: ['SomaticRounded'],
      roboto: ['Roboto'],
      robotoslab: ['RobotoSlab'],
    },
    fontSize: {
      '2xs': ['.66rem'],
      xs: ['.75rem'],
      sm: ['.875rem'],
      tiny: ['.875rem'],
      base: ['1rem'],
      lg: ['1.125rem'],
      xl: ['1.25rem'],
      '2xl': ['1.5rem'],
      '3xl': ['1.875rem'],
      '4xl': ['2.25rem'],
      '5xl': ['3rem'],
      '6xl': ['4rem'],
      '7xl': ['5rem'],
      '8xl': ['6rem'],
      '9xl': ['7rem'],
    },
    filter: {
      grayscale: 'grayscale(1)',
    },
    extend: {
      colors: {
        primary: '#fe4c00',
        'primary-1': '#f1732b',
        'primary-2': '#ff7d37',
        secondary: '#ffd505',
        'secondary-1': '#ffd400',
        'secondary-2': '#ffe499',
        subtle: '#ff9100',
        'subtle-1': '#ffb255',
        'subtle-2': '#ffdb94',
        alt: '#0c1d24',
        'alt-1': '#1f3440',
        'alt-2': '#57758f',
        soft: '#ffeec4',
        'soft-1': '#fff1d3',
        'aux-orange': '#ffb200',
        'aux-brown': '#dd8e00',
        'aux-gray': '#8ee2d9',
        'aux-blue': '#005d80',
        'aux-green': '#97ca67',
      },
      display: ['huge', 'desktop', 'tablet', 'mobile'],
      backgroundOpacity: {
        '10': '0.1',
      },
    },
  },
  variants: {
    borderWidth: ['children', 'children-last'],
    padding: [
      'children',
      'children-first',
      'children-odd',
      'children-even',
      'children-not-first',
    ],
    margin: ['children-last'],
    fontWeight: ['children-last'],
    textAlign: ['children-first'],
  },
  plugins: [
    require('tailwindcss-children'),
    require('tailwindcss-filters'),
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
};
