# web__react-redux-postcss-webpack-hot--no-ssr

## What?
This is simple react-starer. Yeah, another one! I will tell you why, in the moment.
Tech stack:
1. React
2. Redux
3. PostCSS
4. Webpack
5. Firebase

## Why?
I created it just to learn how these technologies work together.

## How?
### Instalation
```
yarn install
```

### Development server
```
yarn start
```

### Production build
```
yarn run build
```

## Step by step
This is list of steps, to create starter like this. I wrote it to consolidate knowledge about babel and webpack configuration.

1. Install React:
```
yarn add react react-dom react-prop-types react-router-dom
// react - main react package
// react-dom - DOM methods
// react-prop-types - typechecking
// react-router-dom - DOM bindings for react routing
```

2. Add Redux
```
yarn add redux react-redux redux-thunk
// redux - redux main package
// react-redux - react bindings for redux
// redux-thunk - allows to write action creators that return a function instead of an action (timeouts, api calls, etc.)
```

3. Add Firebase js tools
```
yarn add firebase
// firebase - tools and infrastructure to work with Firebase
```

4. Install Babel
```
yarn add babel-core babel-preset-env babel-preset-react babel-preset-stage-1  -D
yarn add babel-polyfill
// babel-core - main babel package
// babel-preset-env - ES2015+ -> ES5, auto plugins and polyfills for targeted browser or runtime environments.
// babel-preset-react - react, jsx
// babel-preset-stage-1
/* Stages represent the status of experimental features. Pre stage-3 should be used with caution.
   Beyond ES7, proposed JavaScript features can exist in various stages:
   stage-0 - Strawman: just an idea, possible Babel plugin.
   stage-1 - Proposal: this is worth working on.
   stage-2 - Draft: initial spec.
   stage-3 - Candidate: complete spec and initial browser implementations.
   stage-4 - Finished: will be added to the next yearly release.
*/
// babel-polyfill - emulate a full ES2015+ environment
```

5. Install Webpack and Webpack loaderes/plugins
```
yarn add webpack -D
yarn add express webpack-dev-middleware webpack-hot-middleware -D
yarn add postcss-loader css-loader style-loader babel-loader html-webpack-plugin favicons-webpack-plugin copy-webpack-plugin clean-webpack-plugin extract-text-webpack-plugin uglifyjs-webpack-plugin -D
yarn add react-hot-loader css-hot-loader -D
// webpack - main webpack package
// express - it isnt directly related with webpack, it is necessary to create server for application (instead of webpack-dev-server)
// webpack-dev-middleware - necessary for dev-server (no files on disc, watch files)
// webpack-hot-middleware - reload browser on changes
// postcss-loader - transpile postcss to css
// css-loader - makes CSS modules work
// style-loader - CSS to the DOM by injecting a <style> tag
// babel-loader - apply bebel transpiling
// html-webpack-plugin - use html file as app template
// favicons-webpack-plugin - favicons for html
// copy-webpack-plugin - copy files, e.g. production server file
// clean-webpack-plugin - remove files, e.g. build folder
// extract-text-webpack-plugin - extract styles to css file
// uglifyjs-webpack-plugin - minify js
// react-hot-loader - hot reload just this components where you did changes
// css-hot-loader - reload css (when extracted to file by ExtractTextPlugin) on change
```

6. Install PostCSS plugins
```
yarn add postcss-import postcss-css-variables postcss-apply postcss-nesting postcss-cssnext postcss-clean -D
// postcss-import - resolve css imports
// postcss-css-variables - resolve native variables
// postcss-apply - resolve native mixins
// postcss-nesting - resolve nesting
// postcss-cssnext - transforms css to more compatible
// postcss-clean - minify css
```

7. Config Babel - .babelrc
```
/*
{
  "presets": [["env", { "modules": false }], "react", "stage-1"],
  "plugins": ["react-hot-loader/babel"],
  "env": {
    "test": {
      "presets": [["env"], "react", "stage-1"]
    }
  }
}
// Use downloaded babel presets (ES2015+ -> ES5, react/jsx, experimental features)
// Use downloaded babel plugins (reload only changed components)
// Settings for tests (need to enable modules)
*/
```

8. Config Webpack - webpack.config.js
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map', // - https://webpack.js.org/configuration/devtool/
  resolve: { extensions: ['.js', '.jsx'] }, // - load jsx modules without writing extension in path
  entry: {
    //vendor: [],
    client: [
      'webpack-hot-middleware/client', // - browser hot reload (dev server)
      'react-hot-loader/patch', // - activate HMR for React
      'babel-polyfill',
      './src/client/index.jsx'
    ]
  },
  output: {
    publicPath: '/', //  needed for nested routes e.g. '/page1/page2/'
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true, // - import Styles from './styles.css' syntax (or { style1, style2 } from './styles.css'),
                                 //   <div className={Style.style1}>Hello World</div>
                                 //   <div className={style1}>Hello World</div>
                  camelCase: true, // - .home-button {...} -> import { homeButton } from './styles.css'
                  sourceMap: true
                }
              },
              { loader: 'postcss-loader' }
            ]
          })
        )
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // enable HMR globally
    new webpack.HotModuleReplacementPlugin(), // prints more readable module names in the browser terminal on HMR updates
    new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors
    new HtmlWebpackPlugin({
      template: './src/client/template/index.html',
      favicon: './src/client/template/favicon.png'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
  ]
};
```

9. Others
```
yarn add shx cross-env dotenv -D
yarn add enzyme enzyme-adapter-react-16 jest react-test-renderer redux-mock-store -D
// shx - cross-platform commands in npm package scripts
// cross-env - cross-platform environment variables
// dotenv - loads environment variables from a .env file into process.env
// enzyme - testing utility for React that makes it easier to assert, manipulate, and traverse 
// enzyme-adapter-react-16 - Adapter corresponding to the version of react
// jest - testing platform
// react-test-renderer - experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment
// redux-mock-store - mock store for testing your redux async action creators and middleware
"scripts": {
  "test": "jest",
  "dev-server": "node ./src/server/dev-server.js",
  "build": "webpack -p --config webpack.config.prod.js",
  "postinstall": "yarn run build",
  "start": "node ./build/index.js"
},
"jest": {
  "moduleNameMapper": {
    "(.*\\.css$)": "<rootDir>/src/client/__mocks__/stylesMock.js"
  }
}
// test - run tests
// dev-server - run development server
// build - build app for production
// postinstall - build app before start (e.g. on heroku)
// start - run built app
// moduleNameMapper - map css imports to mock function
```
