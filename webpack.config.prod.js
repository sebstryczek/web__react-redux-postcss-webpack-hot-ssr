const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  // REACT CLIENT
  {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    resolve: { extensions: ['.js', '.jsx'] },
    entry: {
      client: [
        'babel-polyfill',
        path.resolve(__dirname, 'src/client/index.jsx')
      ]
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: 'public/js/[name].[hash].js'
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
          use: [
            { loader: MiniCssExtractPlugin.loader, options: {} },
            { loader: 'css-loader', options: { modules: true, camelCase: true, sourceMap: true } },
            { loader: 'postcss-loader' }
          ]
        }
      ]
    },
    plugins: [
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
      new UglifyJsPlugin({
        sourceMap: true, uglifyOptions: {output: { comments: false }}
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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
    node: { fs: 'empty', net: 'empty', tls: 'empty' }
  },

  // NODE SERVER
  {
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    resolve: { extensions: ['.js', '.jsx'] },
    entry: {
      server: [
        'babel-polyfill',
        path.resolve(__dirname, 'src/server/server.js')
      ]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              forceEnv: 'node'
            }
          }
        }
      ]
    },
    node: { console: false, global: false, process: false, Buffer: false, __filename: false, __dirname: false }
  }
];
