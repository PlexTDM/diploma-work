module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '640px'},
      // => @media (max-width: 640px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 768px) { ... }

      'lg': {'max': '1024px'},
      // => @media (max-width: 1024px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1280px) { ... }

      '2xl': {'max': '1536px'},
      // => @media (max-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}