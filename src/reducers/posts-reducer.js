import { ActionTypes } from '../actions';

const initialState = { all: [], post: null };

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LISTS:
      return Object.assign({}, state, {
        all: action.lists,
      });
    case ActionTypes.FETCH_LIST:
      return Object.assign({}, state, {
        post: action.list,
      });
    case ActionTypes.UPDATE_LIST:
      return Object.assign({}, state, {
        post: action.fields,
      });
    case ActionTypes.CREATE_LIST:
      return state;
    case ActionTypes.DELETE_LIST:
      return state;
    default:
      return state;
  }
};

export default PostsReducer;
