import { combineReducers } from 'redux-immutable';

import auth from '../parts/auth/reducers/auth'
import signup from '../parts/auth/reducers/signup'
import profile from '../parts/profile/reducers/profile'
import clientProfile from '../parts/client/profile/reducers/clientProfile'
import router from '../parts/core/reducers/routerRedux'
import country from '../parts/auth/reducers/country'

import clientadmin from '../parts/admin/reducers/client'

export default combineReducers({
  auth,
  signup,
  profile,
  clientProfile,
  router,
  clientadmin,
  country
})
