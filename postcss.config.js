export default {
  plugins: {
    autoprefixer: {}, // Adds vendor prefixes for older browsers
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}), // Minify CSS in production
  },
};