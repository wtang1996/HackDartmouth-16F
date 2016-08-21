import { ActionTypes } from '../actions';

const UserReducer = (state = { user: null, author: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return { ...state, user: action.payload.user };
    case ActionTypes.FETCH_AUTHOR:
      return { ...state, author: action.payload.author };
    default:
      return state;
  }
};

export default UserReducer;
