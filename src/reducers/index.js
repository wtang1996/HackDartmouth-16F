import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';
import ResultReducer from './result-reducer';

const rootReducer = combineReducers({
  lists: PostsReducer,
  auth: AuthReducer,
  result: ResultReducer,
  error: ErrorReducer,
});

export default rootReducer;
