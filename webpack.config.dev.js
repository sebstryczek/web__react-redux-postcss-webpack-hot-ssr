const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const postcssCustomProperties = require('postcss-custom-properties');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const postcssApply = require('postcss-apply');
const postcssNesting = require('postcss-nesting');
const postcssClean = require('postcss-clean');

const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' });

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  resolve: { extensions: ['.js', '.jsx'] },
  entry: {
    client: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      'babel-polyfill',
      path.resolve(__dirname, 'src/client/index.jsx')
    ]
  },
  output: {
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'web'
          }
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ['css-hot-loader'].concat(
          { loader: MiniCssExtractPlugin.loader, options: {} },
          { loader: 'css-loader', options: { modules: true, camelCase: true, sourceMap: true } },
          { loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postcssCustomProperties({preserve: false}),
                postcssPresetEnv({ insertBefore: { 'all-property': [postcssImport, postcssApply, postcssNesting] } })
              ]
            }
          }
        )
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/template/index.html',
      filename: '_index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'public/css/styles.[contenthash].css', disable: false, allChunks: true
    }),
    new FaviconsWebpackPlugin({
      logo: './src/client/template/favicon.png',
      prefix: 'public/images/icons-[hash]/',
      icons: { android: true, appleIcon: true, appleStartup: true, coast: false, favicons: true, firefox: true, opengraph: false, twitter: false, yandex: false, windows: false }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { test: /node_modules/, chunks: "initial", name: "vendor", enforce: true }
      }
    }
  },
};
