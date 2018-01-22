import * as actions from '../constants/actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {

    case actions.FETCH_DATA_REQUEST:
      return state;

    case actions.FETCH_DATA_SUCCESS:
      return {...state, data: action.payload};

    default:
      return state;
      
  }
}

export default reducer;
