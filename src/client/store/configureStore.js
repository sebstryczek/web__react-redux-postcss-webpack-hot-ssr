import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import fetchDataReducer from '../reducers/fetchDataReducer';

export default function configureStore() {  
  return createStore(
    fetchDataReducer,
    applyMiddleware(thunk)
  );
}
