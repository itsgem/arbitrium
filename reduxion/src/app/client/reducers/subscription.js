/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const subscriptionList = createActionAsync('CLIENT_SUBSCRIPTION_LIST', auth.subscriptionList);
export const clientSubscription = createActionAsync('CLIENT_SUBSCRIPTION', auth.clientSubscription);

const initialState = Immutable.fromJS({
  listSubscription: {},
  currentSubscription: {},
  loading: false
});

export default createReducer({
  [subscriptionList.ok]: (state, payload) => state.merge({
    listSubscription: payload,
    loading: false
  }),
  [subscriptionList.request]: (state) => state.merge({
    loading: true
  }),
  [clientSubscription.ok]: (state, payload) => state.merge({
    currentSubscription: payload,
    loading: false
  }),
  [clientSubscription.request]: (state) => state.merge({
    loading: true
  }),
}, initialState);
