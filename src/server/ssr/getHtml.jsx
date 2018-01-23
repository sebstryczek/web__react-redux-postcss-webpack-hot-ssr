import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../../client/routes';
import App from '../../client/containers/App';
import reducers from '../../client/reducers/fetchDataReducer';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default async (req, index) => {
  const initialState = {};
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  const sheet = new ServerStyleSheet();
  const context = {};
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map( ({route}) => {
    const fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });

  await Promise.all(promises);

  const appMarkup = ReactDOMServer.renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StyleSheetManager>
  );
  const styleTags = sheet.getStyleTags();
  const storeState = JSON.stringify(store.getState());

  const html = index
    .replace('</head>', `${styleTags}</head>`)
    .replace('<div id="app"></div>', `
      <div id="app">${appMarkup}</div>
      <script>window.APP_STATE=${storeState}</script>
    `);
    
  return html;
};
