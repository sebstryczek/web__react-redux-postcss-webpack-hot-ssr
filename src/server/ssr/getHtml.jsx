import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../../client/routes';
import Html from './Html';
import App from '../../client/containers/App';
import reducers from '../../client/reducers/fetchDataReducer';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default async (req, manifest) => {
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

  const assetPath = x=> manifest[x] || x;
  const absUrl = x => `//${req.headers.host}/${x}`;
  const styleFiles = ['client.css'].map(assetPath).map(absUrl);
  const styleElement = sheet.getStyleElement();
  const scriptFiles = ['vendor.js', 'client.js'].map(assetPath).map(absUrl);
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html appMarkup={appMarkup} initialState={store.getState()} styleFiles={styleFiles} styleElement={styleElement} scriptFiles={scriptFiles} />
  );

  return html;
};
