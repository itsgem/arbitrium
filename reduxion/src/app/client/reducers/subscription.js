/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const subscriptionList = createActionAsync('ADMIN_SUBSCRIPTION_LIST', auth.subscriptionList);

const initialState = Immutable.fromJS({
  listSubscription: {},
  loading: false
});

export default createReducer({
  [subscriptionList.ok]: (state, payload) => state.merge({
    listSubscription: payload,
    loading: false
  }),
  [subscriptionList.request]: (state, payload) => state.merge({
    loading: true
  })
}, initialState);
