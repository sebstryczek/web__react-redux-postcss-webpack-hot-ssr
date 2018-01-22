const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: { extensions: ['.js', '.jsx'] },
  entry: {
    client: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/client/index.jsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'public/js/[name].[hash].js',
    publicPath: './'
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
          },
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader', options: { modules: true, camelCase: true, sourceMap: true } },
            { loader: 'postcss-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/client/template/index.html',
      filename: 'public/index.html'
    }),
    new FaviconsWebpackPlugin({
      filename: 'public/favicon.png',
      logo: './src/client/template/favicon.png',
      prefix: 'public/images/icons-[hash]/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new ExtractTextPlugin({ filename: 'public/css/styles.[contenthash].css', disable: false, allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      //minChunks: Infinity,
      minChunks: module => /node_modules/.test(module.resource)
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
  ]
};
