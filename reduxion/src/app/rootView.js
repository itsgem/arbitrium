import React from 'react';
import Immutable from 'immutable'
import createHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import makeRoutes from './routes'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from './configureStore'

import Debug from 'debug';
let debug = new Debug("rootView");

export default function(){
  const initialState = Immutable.fromJS({})
  const store = configureStore(initialState)

  const browserHistory = useRouterHistory(createHistory)({
    basename: ''
  });

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.get('router').toJS()
  });

  const routes = makeRoutes(store)
  debug('init');
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} >
      </Router>
    </Provider>
  )
}
