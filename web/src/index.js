import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import SignUpPage from './containers/SignUpPage'
import DashboardPage from './containers/DashboardPage'
import * as reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

let store = createStoreWithMiddleware(reducer)

const history = syncHistoryWithStore(browserHistory, store)

let rootElement = document.getElementById('root')

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/client/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAnonymous(nextState, replace) {
  if (localStorage.getItem('token')) {
    replace({
      pathname: '/client/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/client">
        <IndexRoute component={DashboardPage} onEnter={requireAuth} />

        <Route path="login" name="login" component={App} onEnter={requireAnonymous} />
        <Route path="forgot-password" name="forgot_password" onEnter={requireAnonymous} />
        <Route path="signup" name="signup" component={SignUpPage} onEnter={requireAnonymous} />
      </Route>
    </Router>
  </Provider>,
  rootElement
)

