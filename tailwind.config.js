module.exports = {
  purge: ['./pages/**/*.jsx','./pages/**/*.js','./components/**/*.js', './pages/**/*.html'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};