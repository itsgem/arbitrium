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
import AdminSubscriptionDetail from 'admin/containers/subscription/subscriptionDetail';

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

import ClientInvoice from 'client/views/invoice/invoiceList';
import ClientInvoiceListDetails from 'client/views/invoice/invoiceListDetails';
import ClientApiLogs from 'client/views/apilogs/apilogs';
import ClientSystemSettings from 'client/views/settings/systemsettings';

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

function validateToken(tokenName, nextState, replace) {
  let bytes ='';
  if (localStorage.getItem(tokenName) ){
    bytes  = CryptoJS.AES.decrypt(localStorage.getItem(tokenName), config.key);
    let decryptedData ="";
    if (bytes.sigBytes < 0 ) {
      localStorage.removeItem(tokenName);
      replace({
        pathname: "/" + (tokenName == 'token' ? "i" : tokenName) + "/login",
        state: { nextPathname: nextState.location.pathname }
      });
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
      startTimer(timeLimit, tokenName);
      localStorage.setItem(tokenName, CryptoJS.AES.encrypt(JSON.stringify(encryptToken), config.key));
      return true;
    }
  }
  return false;
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
  validateToken(tokenName, nextState, replace);
  return cb();
}

function islogin(nextState, replace, cb) {
  let link = window.location.href.split("/");
  let tokenName = '';

  switch (link[3]) {
      case 'coffee' :
        tokenName = 'coffee';
      break;

      default :
        tokenName = 'token';
  }
  validateToken(tokenName);
  let isValidate = validateToken(tokenName, nextState, replace);
  console.log("isLogin", isValidate);
  if (isValidate) {
    replace({
      pathname: '/' + (tokenName == 'token' ? "i" : tokenName),
      state: { nextPathname: nextState.location.pathname }
    })
  }
  return cb();
}

export default () => (
  <Route component={AdminApplication} name="home" path="/">
    <Route component={AdminApplication} name="home" path="coffee" >
      <IndexRoute component={AdminDashboard} onEnter={requireAuth} />
      <Route component={AdminLogin} path="login" onEnter={islogin}/>
      <Route component={AdminLogout} path="logout"/>
      <Route component={AdminForgot} path="forgot" onEnter={islogin}/>
      <Route component={AdminConfirmResetPassword} name="ResetPassword" path="resetPassword" onEnter={islogin}/>

      <Route component={AdminDashboard} name="home" onEnter={requireAuth}>
        <Route path="client">
          <IndexRoute component={AdminClientList} />
          <Route component={AdminClientAdd} path="new"/>
          <Route component={AdminClientProfile} path=":id"/>
        </Route>

        <Route path="api">
          <IndexRoute component={AdminApiList}/>
          <Route component={AdminApiAdd} path="new"/>
          <Route component={AdminApiUpdate} path=":id"/>
        </Route>

        <Route path="subscription" onEnter={requireAuth}>
          <IndexRoute component={AdminSubscriptionList} onEnter={requireAuth}/>
          <Route component={AdminSubscriptionEdit} path="client/:client_id" onEnter={requireAuth}/>
          <Route component={AdminSubscriptionDetail} path="client/:client_id/detail/:subscription_id" onEnter={requireAuth}/>
        </Route>

        <Route path="account">
          <IndexRoute component={AdminUserManagementList}/>
          <Route component={AdminUserManagementAdd} path="new"/>
          <Route component={AdminUserManagementUpdate} path=":id"/>
        </Route>
        <Route path="profile">
          <IndexRoute component={AdminProfile}/>
        </Route>
      </Route>
    </Route>

    <Route name="home" path="i" >
      <IndexRoute component={ClientTopPage} onEnter={requireAuth}/>
      <Route component={ClientLogin} name="login" path="login" onEnter={islogin}/>
      <Route component={Signup} path="signup" onEnter={islogin}/>
      <Route component={ClientLogout} path="logout"/>
      <Route component={ClientForgot} path="forgot" onEnter={islogin}/>
      <Route component={ConfirmResetPassword} name="ResetPassword" path="resetPassword" onEnter={islogin}/>
      <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail" onEnter={islogin}/>

      <Route path="client" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientProfile}/>
        <Route component={ClientProfile} path="profile" />
        <Route component={ClientChangePassword} path="profile/change_password" />
        <Route component={ClientChangeEmail} path="profile/change_email" />
      </Route>
      <Route path="api" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientApiList}/>
        <Route component={ClientApiAdd} path="new"/>
        <Route component={ClientApiUpdate} path=":id"/>
      </Route>
      <Route path="subscription" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientSubscriptionDetail}/>
        <Route component={ClientSubscriptionPayment} path=":id" />
      </Route>
      <Route path="invoice" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientInvoice}/>
        <Route component={ClientInvoiceListDetails} path=":id" />
      </Route>
      <Route path="apilogs" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientApiLogs}/>
      </Route>
      <Route path="systemsettings" component={ClientDashboard} onEnter={requireAuth}>
        <IndexRoute component={ClientSystemSettings}/>
      </Route>
    </Route>
    <Route path="*" components={NoMatch} />
  </Route>
);
