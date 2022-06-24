const spacings = {};
for (let i = -100; i < 500; i += 0.5) {
  spacings[i] = `${i / 4}rem`;
}

const colors = {
  dark: '#03080f',
  light: '#c1d1e8',
  blue: '#5692e8',
  navy: {
    dark: '#081221',
    DEFAULT: '#0e1a2b',
    light: '#182c47',
  },
  danger: '#fd2c36',
  purple: '#6987d5'
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '550px',
        md: '769px',
        'max-xs': { max: '549px' },
        'max-sm': { max: '639px' },
        'max-md': { max: '768px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1279px' },
      },
      colors,
      borderColors: colors,
      fontFamily: {
        primary: ['Mulish', 'sans-serif'],
        title: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        md: '1rem',
        '3xs': '0.5rem',
        '9p': '0.5625rem',
        '2xs': '0.625rem',
        '11p': '0.6875rem',
        '13p': '0.8125rem',
        '15p': '0.9375rem',
        '28p': '1.75rem',
        '40p': '2.5rem',
        '72p': '4.5rem',
      },
      spacing: spacings,
      minWidth: spacings,
      minHeight: spacings,
      maxWidth: spacings,
      maxHeight: spacings,
    },
  },
  plugins: [],
};
