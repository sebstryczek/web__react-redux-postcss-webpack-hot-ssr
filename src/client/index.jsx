import { AppContainer } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './containers/App';
import firebase from '../firebase/wrapper';

const store = configureStore();
const renderApp = () => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>
, document.getElementById('app'));

firebase.init();
renderApp();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
