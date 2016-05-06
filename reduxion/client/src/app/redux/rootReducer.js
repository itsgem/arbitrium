import { combineReducers } from 'redux-immutable';

import auth from '../client/auth/reducers/auth'
import signup from '../client/auth/reducers/signup'
import clientProfile from '../client/profile/reducers/profile'
import clientChangePassword from '../client/profile/reducers/changePassword'
import clientChangeEmail from '../client/profile/reducers/changeEmail'
import router from '../client/core/reducers/routerRedux'
import country from '../client/auth/reducers/country'

export default combineReducers({
  auth,
  signup,
  clientProfile,
  clientChangePassword,
  clientChangeEmail,
  router,
  country,
})
