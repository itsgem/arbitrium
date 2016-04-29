import React from 'react';
import {Route, IndexRoute} from 'react-router';
import moment from 'moment';

import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Application from 'parts/admin/containers/application';
import Dashboard from 'parts/admin/views/dashboard';
import Login from 'parts/auth/containers/login';
import Logout from 'parts/auth/containers/adminLogout';
import Forgot from 'parts/auth/containers/forgot';

import ConfirmResetPassword from 'parts/auth/containers/confirmResetPassword';

import AdminClientList from 'parts/admin/containers/clientList';
import AdminClientProfile from 'parts/admin/containers/clientProfile';
import AdminClientAdd from 'parts/admin/containers/clientAdd';
import AdminUserManagementList from 'parts/admin/containers/userManagementList';
import AdminUserManagementAdd from 'parts/admin/containers/userManagementAdd';
import AdminUserManagementEdit from 'parts/admin/containers/userManagementEdit';

function requireAuth(nextState, replace, cb) {

  if(!localStorage.getItem('token')) {
    replace({
      pathname: '/coffee/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

  if(localStorage.getItem('token') && localStorage.getItem('expired') <= moment().valueOf()) {
    localStorage.clear();
    replace({
      pathname: '/coffee/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  return cb();
}

export default () => (
  <Route component={Application} name="home" path="/">
    <Route component={Application} name="home" path="coffee" >
      <IndexRoute component={Dashboard} onEnter={requireAuth} />
      <Route component={Login} path="login"/>
      <Route component={Logout} path="logout" onEnter={requireAuth}/>
      <Route component={Forgot} path="forgot"/>
      <Route component={ConfirmResetPassword} name="ResetPassword" path="resetPassword"/>

      <Route component={Authenticated} name="home">
        <IndexRoute component={Authenticated} onEnter={requireAuth}/>
        <Route path="client" onEnter={requireAuth}>
          <IndexRoute component={AdminClientList}  onEnter={requireAuth}/>
          <Route component={AdminClientAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminClientProfile} path=":id" onEnter={requireAuth}/>
        </Route>
        <Route path="account" onEnter={requireAuth}>
          <IndexRoute component={AdminUserManagementList} onEnter={requireAuth}/>
          <Route component={AdminUserManagementAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminUserManagementEdit} path=":id" onEnter={requireAuth}/>
        </Route>
      </Route>
      {/*<Route path="*" components={NoMatch} />*/}
    </Route>
  </Route>
);
