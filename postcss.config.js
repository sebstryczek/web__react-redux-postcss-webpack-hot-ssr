module.exports = {
  plugins: [
    require('postcss-import')({}),
    require('postcss-css-variables')({}),
    require('postcss-apply')({}),
    require('postcss-nesting')({}),
    require('postcss-cssnext')({}),
    require('postcss-clean')({}),
  ]
}