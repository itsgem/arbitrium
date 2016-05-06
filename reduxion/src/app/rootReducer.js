import { combineReducers } from 'redux-immutable';

// import auth from 'services/auth'

import router from 'admin/reducers/routerRedux'
import AdminAuth from 'admin/reducers/auth'
import adminUserManagement from 'admin/reducers/userManagement'
import clientadmin from 'admin/reducers/clientProfile'

import ClientAuth from 'client/reducers/auth'
import ClientSignup from 'client/reducers/signup'
import ClientCountry from 'client/reducers/country'
import clientProfile from 'client/reducers/profile/profile'

import clientChangePassword from 'client/reducers/profile/changePassword'
import clientChangeEmail from 'client/reducers/profile/changeEmail'

export default combineReducers({
  router,
  AdminAuth,
  clientadmin,
  adminUserManagement,
  ClientAuth,
  ClientSignup,
  ClientCountry,
  clientProfile,
  clientChangePassword,
  clientChangeEmail
})
