// The middleware to call the API for quotes
import { CALL_API } from './middleware/api'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const AUTH_CREDS_INVALID = 'AUTH_CREDS_INVALID'
export const AUTH_CREDS_VALID = 'AUTH_CREDS_VALID'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function authCredentialsValid(creds) {
  return {
    type: AUTH_CREDS_VALID,
    isValid: true,
    creds
  }
}

function authCredentialsInvalid(errors) {
  return {
    type: AUTH_CREDS_INVALID,
    isValid: false,
    errors
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://m3.dev.api.idearobin.com/1.0/login', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.error))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', user.token)
          localStorage.setItem('persistence', user.persistence)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// User triggered form update
export function onLoginInputChange(creds) {
  return dispatch => {
    let formValidationErrors = [];
    if ( creds.email.length < 5 )
    {
      // E-mail address is not at least 5 characters length
      formValidationErrors.push("A valid e-mail is required.");
    }
    if ( creds.password.length === 0 )
    {
      // Password is empty
      formValidationErrors.push("Password is required.");
    }

    if (formValidationErrors.length > 0)
    {
      return dispatch(authCredentialsInvalid(formValidationErrors));
    }
    else
    {
      return dispatch(authCredentialsValid(creds));
    }
  }
}

// User triggered form update
export function onSignupInputChange(creds) {
  return dispatch => {
    let formValidationErrors = [];
    if ( creds.email.length < 5 )
    {
      // E-mail address is not at least 5 characters length
      formValidationErrors.push("A valid e-mail is required.");
    }
    if ( creds.password.length === 0 )
    {
      // Password is empty
      formValidationErrors.push("Password is required.");
    }

    if (formValidationErrors.length > 0)
    {
      return dispatch(authCredentialsInvalid(formValidationErrors));
    }
    else
    {
      return dispatch(authCredentialsValid(creds));
    }
  }
}

// Logs the user out
export function logoutUser() {
  console.log('logoug')
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export function fetchQuote() {
  return {
    [CALL_API]: {
      endpoint: 'random-quote',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

// Same API middlware is used to get a 
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecretQuote() {
  return {
    [CALL_API]: {
      endpoint: 'protected/random-quote',
      authenticated: true,
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}