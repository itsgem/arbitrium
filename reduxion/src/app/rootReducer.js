import { combineReducers } from 'redux-immutable';

// import auth from 'services/auth'

import router from 'admin/reducers/routerRedux'
import AdminAuth from 'admin/reducers/auth'
import adminUserManagement from 'admin/reducers/userManagement'
import clientadmin from 'admin/reducers/clientProfile'
import AdminApi from 'admin/reducers/api'

import ClientAuth from 'client/reducers/auth'
import ClientSignup from 'client/reducers/signup'
import ClientCountry from 'client/reducers/country'
import clientProfile from 'client/reducers/profile/profile'

import clientChangePassword from 'client/reducers/profile/changePassword'
import clientChangeEmail from 'client/reducers/profile/changeEmail'

import ClientApi from 'client/reducers/api'
import AdminSubscription from 'client/reducers/subscription'

export default combineReducers({
  router,
  AdminAuth,
  clientadmin,
  adminUserManagement,
  AdminApi,
  ClientAuth,
  ClientSignup,
  ClientCountry,
  clientProfile,
  clientChangePassword,
  clientChangeEmail,
  ClientApi,
  AdminSubscription
})
