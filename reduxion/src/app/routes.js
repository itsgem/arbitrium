import React from 'react';
import {Route, IndexRoute} from 'react-router';
import config from 'config';
import CryptoJS from 'crypto-js';

import moment from 'moment';
import NoMatch from 'common/components/noMatch';

// ----- Admin
import AdminApplication from 'admin/components/application';
import AdminDashboard from 'admin/components/dashboard';
import AdminLogin from 'admin/containers/auth/login';
import AdminLogout from 'admin/containers/auth/adminLogout';
import AdminForgot from 'admin/containers/auth/forgot';
import AdminConfirmResetPassword from 'admin/containers/auth/confirmResetPassword';

import AdminClientList from 'admin/containers/client/clientList';
import AdminClientProfile from 'admin/containers/client/clientProfile';
import AdminClientAdd from 'admin/containers/client/clientAdd';

import AdminApiList from 'admin/containers/api/apiList';
import AdminApiAdd from 'admin/containers/api/apiAdd';
import AdminApiUpdate from 'admin/containers/api/apiUpdate';

import AdminUserManagementList from 'admin/containers/userManagement/userManagementList';
import AdminUserManagementAdd from 'admin/containers/userManagement/userManagementAdd';
import AdminUserManagementUpdate from 'admin/containers/userManagement/userManagementUpdate';

// ----- Client
import ClientDashboard from 'client/components/dashboard';
import ClientTopPage from 'client/components/main';
import ClientLogin from 'client/containers/auth/login';

import ClientLogout from 'client/containers/auth/clientLogout';
import ConfirmResetPassword from 'client/containers/auth/confirmResetPassword';
import Signup from 'client/containers/auth/signup';
import ClientForgot from 'client/containers/auth/forgot';
import RegistrationComplete from 'client/containers/auth/registrationComplete';

import ClientProfile from 'client/containers/profile/profile';
import ClientChangePassword from 'client/containers/profile/changePassword';
import ClientChangeEmail from 'client/containers/profile/changeEmail';

import ClientApiList from 'client/containers/api/apiList';
import ClientApiAdd from 'client/containers/api/apiAdd';
import ClientApiUpdate from 'client/containers/api/apiUpdate';
import ClientSubscriptionDetail from 'client/containers/subscription/subscriptionDetail';

function requireAuth(nextState, replace, cb) {
  let link = window.location.href.split("/");
  let bytes ='';
  let tokenName = '';

  switch (link[3]) {
      case 'coffee' :
        if(!localStorage.getItem('coffee')) {
          replace({
            pathname: '/coffee/login',
            state: { nextPathname: nextState.location.pathname }
          })
        }
        tokenName = 'coffee';
      break;

      default :
        if(!localStorage.getItem('token')) {
          replace({
            pathname: '/i/login',
            state: { nextPathname: nextState.location.pathname }
          })
        }
        tokenName = 'token';
  }

  if (localStorage.getItem(tokenName) ){
    bytes  = CryptoJS.AES.decrypt(localStorage.getItem(tokenName), config.key);
    let decryptedData ="";
    if (bytes.sigBytes < 0 ) {
      localStorage.removeItem(tokenName);
      window.location = window.location.origin + "/" + (tokenName == 'token' ? "i" : tokenName) + "/login";
    }

    if (JSON.parse(bytes.toString(CryptoJS.enc.Utf8))) {
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else {
      localStorage.removeItem(tokenName);
      replace({
        pathname: "/" + (tokenName == 'token' ? "i" : tokenName) + "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }

    if(decryptedData.token && decryptedData.expired <= moment().valueOf()) {
      localStorage.removeItem(tokenName);
      replace({
        pathname: "/" +  (tokenName == 'token' ? "i" : tokenName) + "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }

    if(decryptedData.token && decryptedData.expired > moment().valueOf()) {
      let lifetime = decryptedData.lifetime;
      let expired = moment().add(lifetime,'minutes').valueOf();
      let encryptToken = {
        token: decryptedData.token,
        expired: expired,
        lifetime: lifetime
      };
      localStorage.setItem(tokenName, CryptoJS.AES.encrypt(JSON.stringify(encryptToken), config.key));
    }
  }

  return cb();
}

export default () => (
  <Route component={AdminApplication} name="home" path="/" >
    <Route component={AdminApplication} name="home" path="coffee" >
      <IndexRoute component={AdminDashboard} onEnter={requireAuth} />
      <Route component={AdminLogin} path="login"/>
      <Route component={AdminLogout} path="logout" onEnter={requireAuth}/>
      <Route component={AdminForgot} path="forgot"/>
      <Route component={AdminConfirmResetPassword} name="ResetPassword" path="resetPassword"/>

      <Route component={AdminDashboard} name="home">
        <Route path="client" onEnter={requireAuth}>
          <IndexRoute component={AdminClientList}  onEnter={requireAuth}/>
          <Route component={AdminClientAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminClientProfile} path=":id" onEnter={requireAuth}/>
        </Route>

        <Route path="api" onEnter={requireAuth}>
          <IndexRoute component={AdminApiList} onEnter={requireAuth}/>
          <Route component={AdminApiAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminApiUpdate} path=":id" onEnter={requireAuth}/>
        </Route>

        <Route path="account" onEnter={requireAuth}>
          <IndexRoute component={AdminUserManagementList} onEnter={requireAuth}/>
          <Route component={AdminUserManagementAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminUserManagementUpdate} path=":id" onEnter={requireAuth}/>
        </Route>
      </Route>
    </Route>

    <Route name="home" path="i" >
      <IndexRoute component={ClientTopPage} onEnter={requireAuth} />
      <Route component={ClientLogin} name="login" path="login"/>
      <Route component={Signup} path="signup"/>
      <Route component={ClientLogout} path="logout" onEnter={requireAuth}/>
      <Route component={ClientForgot} path="forgot"/>
      <Route component={ConfirmResetPassword} name="ResetPassword" path="resetPassword"/>
      <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail"/>

      <Route path="client" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientProfile} onEnter={requireAuth}/>
        <Route component={ClientProfile} path="profile" onEnter={requireAuth} />
        <Route component={ClientChangePassword} path="profile/change_password" onEnter={requireAuth} />
        <Route component={ClientChangeEmail} path="profile/change_email" onEnter={requireAuth} />
      </Route>
      <Route path="api" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientApiList} onEnter={requireAuth}/>
        <Route component={ClientApiAdd} path="new" onEnter={requireAuth}/>
        <Route component={ClientApiUpdate} path=":id" onEnter={requireAuth}/>
      </Route>
      <Route path="subscription" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientSubscriptionDetail} onEnter={requireAuth}/>
      </Route>
    </Route>
    <Route path="*" components={NoMatch} />
  </Route>
);
