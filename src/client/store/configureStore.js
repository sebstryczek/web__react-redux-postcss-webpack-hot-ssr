import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import fetchDataReducer from '../reducers/fetchDataReducer';

/* SSR - Get state rendered on server */
const initState = { ...window.APP_STATE };
/* *** */

export default () => createStore( fetchDataReducer, initState, applyMiddleware(thunk) );
