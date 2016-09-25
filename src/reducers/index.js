import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import ErrorReducer from './error-reducer';
import MessagesReducer from './messages-reducer';

const rootReducer = combineReducers({
  lists: PostsReducer,
  auth: AuthReducer,
  profile: UserReducer,
  messages: MessagesReducer,
  error: ErrorReducer,
});

export default rootReducer;
