import { combineReducers } from 'redux-immutable';

import auth from '../parts/auth/reducers/auth'
import signup from '../parts/auth/reducers/signup'
import profile from '../parts/profile/reducers/profile'
import router from '../parts/core/reducers/routerRedux'
import country from '../parts/auth/reducers/country'

import adminUserManagement from '../parts/admin/reducers/userManagement'
import validateUsername from '../parts/admin/reducers/validateUsername'
import clientadmin from '../parts/admin/reducers/clientProfile'

export default combineReducers({
  auth,
  signup,
  profile,
  router,
  clientadmin,
  country,
  adminUserManagement,
  validateUsername
})
