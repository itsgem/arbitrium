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

import AdminSubscriptionList from 'admin/containers/subscription/subscriptionList';
import AdminSubscriptionEdit from 'admin/containers/subscription/subscriptionEdit';

import AdminUserManagementList from 'admin/containers/userManagement/userManagementList';
import AdminUserManagementAdd from 'admin/containers/userManagement/userManagementAdd';
import AdminUserManagementUpdate from 'admin/containers/userManagement/userManagementUpdate';

import AdminProfile from 'admin/containers/userProfile/userProfile';

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
import ClientSubscriptionPayment from 'client/containers/subscription/subscriptionPayment';

function startTimer(duration, tokenName) {
    let start = Date.now();
    let diff = 0;
    let minutes = 0;
    let seconds  = 0;
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (minutes == 0 && seconds == 0) {
          localStorage.removeItem(tokenName);
          window.location = window.location.origin + "/" + (tokenName == 'token' ? "i" : tokenName) + "/login";
        }
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

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
      let role = '';
      if (decryptedData.role) {
        role = decryptedData.role;
      }
      let encryptToken = {
        token: decryptedData.token,
        expired: expired,
        lifetime: lifetime,
        role: role
      };

      let timeLimit = 60 * lifetime;
      //let timeLimit = 5;
      startTimer(timeLimit, tokenName);
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

        <Route path="subscription" onEnter={requireAuth}>
          <IndexRoute component={AdminSubscriptionList} onEnter={requireAuth}/>
          <Route component={AdminSubscriptionEdit} path=":id" onEnter={requireAuth}/>
        </Route>

        <Route path="account" onEnter={requireAuth}>
          <IndexRoute component={AdminUserManagementList} onEnter={requireAuth}/>
          <Route component={AdminUserManagementAdd} path="new" onEnter={requireAuth}/>
          <Route component={AdminUserManagementUpdate} path=":id" onEnter={requireAuth}/>
        </Route>
        <Route path="profile" onEnter={requireAuth}>
          <IndexRoute component={AdminProfile} onEnter={requireAuth}/>
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
        <Route component={ClientSubscriptionPayment} path=":id" onEnter={requireAuth} />
      </Route>
    </Route>
    <Route path="*" components={NoMatch} />
  </Route>
);
