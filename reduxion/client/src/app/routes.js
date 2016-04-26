import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from 'parts/core/containers/application';
import Dashboard from 'parts/core/views/dashboard';

import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Login from 'parts/auth/containers/login';

import ClientLogout from 'parts/auth/containers/clientLogout';
import Signup from 'parts/auth/containers/signup';
import Forgot from 'parts/auth/containers/forgot';

import ClientProfile from 'client/profile/containers/profile';
import ClientChangePassword from 'client/profile/containers/changePassword';
import ClientChangeEmail from 'client/profile/containers/changeEmail';

import UsersView from 'parts/admin/usersView';
import AdminClientView from 'parts/admin/containers/client';
import AdminClientAdd from 'parts/admin/containers/clientAdd';

import NoMatch from './components/noMatch';

function requireAuth(nextState, replace, cb) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/i/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  return cb();
}

export default () => (
  <Route component={Application} name="home" path="/">
    <Route component={Application} name="home" path="i">
      <IndexRoute component={Dashboard}/>
      <Route component={Login} path="login"/>
      <Route component={Signup} path="signup"/>
      <Route component={ClientLogout} path="logout"/>
      <Route component={Forgot} path="forgot"/>

      <Route path="client" component={Authenticated} onEnter={requireAuth}>
        <IndexRoute component={ClientProfile} onEnter={requireAuth} />
        <Route component={ClientProfile} path="profile" onEnter={requireAuth} />
        <Route component={ClientChangePassword} path="profile/change_password" onEnter={requireAuth} />
        <Route component={ClientChangeEmail} path="profile/change_email" onEnter={requireAuth} />
      </Route>
      <Route path="*" components={NoMatch} />
    </Route>
  </Route>
);
