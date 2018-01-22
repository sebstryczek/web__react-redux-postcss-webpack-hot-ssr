import * as actions from '../constants/actionTypes';
import firebase from '../../firebase/wrapper';

const fetchDataRequest = () => {
  return {
    type: actions.FETCH_DATA_REQUEST
  }
}

const fetchDataSuccess = (data) => {
  return {
    type: actions.FETCH_DATA_SUCCESS,
    payload: data
  }
}

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    return firebase.get('pages')
      .then( data => dispatch(fetchDataSuccess(data)) )
  }
}
