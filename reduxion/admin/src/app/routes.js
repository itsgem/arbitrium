import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Application from 'parts/core/containers/application';
import Dashboard from 'parts/core/views/dashboard';
import Login from 'parts/auth/containers/login';
import Logout from 'parts/auth/containers/adminLogout';
import Signup from 'parts/auth/containers/signup';
import Forgot from 'parts/auth/containers/forgot';
import RegistrationComplete from 'parts/auth/containers/registrationComplete';
import ResetPassword from 'parts/auth/views/resetPassword';

import UsersView from 'parts/admin/usersView';
import AdminClientView from 'parts/admin/containers/client';
import AdminClientAdd from 'parts/admin/containers/clientAdd';

function requireAuth(nextState, replace, cb) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/coffee/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  return cb();
}

export default () => (
  <Route component={Application} name="home" path="/">
    <Route component={Application} name="home" path="coffee">
      <IndexRoute component={Dashboard}/>
      <Route component={Login} path="login"/>
      <Route component={Signup} path="signup"/>
      <Route component={Logout} path="logout" onEnter={requireAuth}/>
      <Route component={Forgot} path="forgot"/>

      <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail/"/>
      <Route component={ResetPassword} name="ResetPasswordToken" path="resetPassword/:token"/>

      <Route path="admin" component={Authenticated}>
        <IndexRoute component={UsersView} onEnter={requireAuth}/>
        <Route component={UsersView} path="users" onEnter={requireAuth}/>
        <Route component={AdminClientAdd} path="client/new" onEnter={requireAuth}/>
        <Route component={AdminClientView} path="client/:id" onEnter={requireAuth}/>
      </Route>
    </Route>
  </Route>
);
