
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#6C757D',
        accent: '#28A745',
        dark: '#343A40',
        navy: '#001F3F',
        teal: '#20C997',
      },
    },
  },
  plugins: [],
});