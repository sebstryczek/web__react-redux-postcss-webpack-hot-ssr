const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config.dev');
const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { assets: false, colors: true, version: false, hash: false, timings: false, chunks: false, chunkModules: false, 'errors-only': true }
}));

app.use(webpackHotMiddleware(webpackCompiler));

webpackCompiler.plugin('done', (stats) => {
  process.nextTick(() => {
    stats = stats.toJson();
    if (stats.errors && stats.errors.length > 0) {
      return;
    }

    console.log('\x1b[36m%s\x1b[0m \x1b[46m%s\x1b[0m', 'Listening at:', 'http://localhost:3000');
  });
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info('Please wait for webpack...');	
});