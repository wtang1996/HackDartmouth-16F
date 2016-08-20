import { ActionTypes } from '../actions';

const initialState = { all: [], message: null };

const MessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES:
      return Object.assign({}, state, {
        all: action.messages,
      });
    case ActionTypes.FETCH_MESSAGE:
      return Object.assign({}, state, {
        message: action.message,
      });
    case ActionTypes.UPDATE_MESSAGE:
      return Object.assign({}, state, {
        message: action.fields,
      });
    case ActionTypes.CREATE_MESSAGE:
      return state;
    case ActionTypes.DELETE_MESSAGE:
      return state;
    default:
      return state;
  }
};

export default MessagesReducer;
