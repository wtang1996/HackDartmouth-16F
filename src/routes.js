import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './containers/home';
import App from './components/app';
import SignIn from './containers/signin';
import SignUp from './containers/signup';
import RequireAuth from './containers/require-auth';
import Profile from './containers/profile';
import Error from './containers/error';
import Result from './containers/result';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="profile" component={RequireAuth(Profile)} />
    <Route path="error" component={Error} />
    <Route path="result" component={Result} />
  </Route>
);
