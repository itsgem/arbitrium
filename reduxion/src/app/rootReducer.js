import { combineReducers } from 'redux-immutable';

// import auth from 'services/auth'

import router from 'admin/reducers/routerRedux'
import AdminAuth from 'admin/reducers/auth'
import adminUserManagement from 'admin/reducers/userManagement'
import clientadmin from 'admin/reducers/clientProfile'
import AdminApi from 'admin/reducers/api'
import adminSubscription from 'admin/reducers/subscription'
import adminLogs from 'admin/reducers/logs'
import adminSystemSettings from 'admin/reducers/settings'
import adminInvoice from 'admin/reducers/invoice'

import ClientAuth from 'client/reducers/auth'
import ClientSignup from 'client/reducers/signup'
import ClientCountry from 'client/reducers/country'
import clientProfile from 'client/reducers/profile/profile'
import clientApiLogs from 'client/reducers/apilogs'

import clientChangePassword from 'client/reducers/profile/changePassword'
import clientChangeEmail from 'client/reducers/profile/changeEmail'

import ClientApi from 'client/reducers/api'
import CLientInvoice from 'client/reducers/invoice'
import AdminSubscription from 'client/reducers/subscription'

export default combineReducers({
  router,
  AdminAuth,
  clientadmin,
  adminUserManagement,
  AdminApi,
  adminSubscription,
  adminLogs,
  adminSystemSettings,
  adminInvoice,
  ClientAuth,
  ClientSignup,
  ClientCountry,
  clientProfile,
  clientChangePassword,
  clientApiLogs,
  clientChangeEmail,
  ClientApi,
  CLientInvoice,
  AdminSubscription,
})
