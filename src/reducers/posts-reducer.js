import { ActionTypes } from '../actions';

const initialState = { all: [], post: null };

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, {
        all: action.posts,
      });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, {
        post: action.post,
      });
    case ActionTypes.UPDATE_POST:
      return Object.assign({}, state, {
        post: action.fields,
      });
    case ActionTypes.CREATE_POST:
      return state;
    case ActionTypes.DELETE_POST:
      return state;
    default:
      return state;
  }
};

export default PostsReducer;
