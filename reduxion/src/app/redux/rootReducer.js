import { combineReducers } from 'redux-immutable';

import auth from '../parts/auth/reducers/auth'
import signup from '../parts/auth/reducers/signup'
import profile from '../parts/profile/reducers/profile'
import clientProfile from '../client/profile/reducers/profile'
import clientChangePassword from '../client/profile/reducers/changePassword'
import router from '../parts/core/reducers/routerRedux'
import country from '../parts/auth/reducers/country'

import clientadmin from '../parts/admin/reducers/client'

export default combineReducers({
  auth,
  signup,
  profile,
  clientProfile,
  clientChangePassword,
  router,
  clientadmin,
  country
})
