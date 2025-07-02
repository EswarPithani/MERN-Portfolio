module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        scanlines: 'scanlines 1s linear infinite',
      },
      keyframes: {
        scanlines: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(1px)' },
        },
      },
    }, // This closes the extend object
  }, // This closes the theme object
  plugins: [], // Don't forget this if you need plugins
}