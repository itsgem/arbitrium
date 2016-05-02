import React from 'react';
import {Route, IndexRoute} from 'react-router';
import moment from 'moment';

//import Application from 'parts/core/containers/application';
import Application from 'client/core/containers/application';
//import Dashboard from 'parts/core/views/dashboard';
import Dashboard from 'client/core/views/dashboard';

//import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Authenticated from 'client/auth/containers/authenticatedComponent';
//import Login from 'parts/auth/containers/login';
import Login from 'client/auth/containers/login';
//import ConfirmResetPassword from 'parts/auth/containers/confirmResetPassword';
import ConfirmResetPassword from 'client/auth/containers/confirmResetPassword';

//import ClientLogout from 'parts/auth/containers/clientLogout';
import ClientLogout from 'client/auth/containers/clientLogout';
//import Signup from 'parts/auth/containers/signup';
import Signup from 'client/auth/containers/signup';
//import Forgot from 'parts/auth/containers/forgot';
import Forgot from 'client/auth/containers/forgot';
//import RegistrationComplete from 'parts/auth/containers/registrationComplete';
import RegistrationComplete from 'client/auth/containers/registrationComplete';

import ClientProfile from 'client/profile/containers/profile';
import ClientChangePassword from 'client/profile/containers/changePassword';
import ClientChangeEmail from 'client/profile/containers/changeEmail';

import NoMatch from './components/noMatch';

function requireAuth(nextState, replace, cb) {

  if(!localStorage.getItem('token')) {
    replace({
      pathname: '/i/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

  if(localStorage.getItem('token') && localStorage.getItem('expired') <= moment().valueOf()) {
    localStorage.clear();
    replace({
      pathname: '/i/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

  if(localStorage.getItem('token') && localStorage.getItem('expired') > moment().valueOf()) {
    let lifetime = localStorage.getItem('lifetime');
    let expired = moment().add(parseInt(lifetime),'minutes').valueOf();
    localStorage.setItem('expired', expired);
  }

  return cb();
}

export default () => (
  <Route component={Application} name="home" path="/">
    <Route component={Application} name="home" path="i">
      <IndexRoute component={Dashboard} onEnter={requireAuth}/>
      <Route component={Login} path="login"/>
      <Route component={Signup} path="signup"/>
      <Route component={ClientLogout} path="logout" onEnter={requireAuth}/>
      <Route component={Forgot} path="forgot"/>
      <Route component={ConfirmResetPassword} name="ResetPassword" path="resetPassword"/>
      <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail"/>

      <Route component={Authenticated} name="home">
        <IndexRoute component={Authenticated} onEnter={requireAuth}/>
        <Route path="client" onEnter={requireAuth}>
          <IndexRoute component={ClientProfile}  onEnter={requireAuth}/>
          <Route component={ClientProfile} path="profile" onEnter={requireAuth} />
          <Route component={ClientChangePassword} path="profile/change_password" onEnter={requireAuth} />
          <Route component={ClientChangeEmail} path="profile/change_email" onEnter={requireAuth} />
        </Route>
      </Route>
      <Route path="*" components={NoMatch} />
    </Route>
  </Route>
);
