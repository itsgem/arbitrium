import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import { onLoginInputChange, loginUser } from '../actions'

export default class AuthForm extends Component {
  componentDidMount() {
    if (typeof(window.componentHandler) != 'undefined')
    {
      window.componentHandler.upgradeDom();
    }
  }
  
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    
    return (
      <div className="irx-panel">
        {!isAuthenticated &&
          <Login
           errorMessage={errorMessage}
           onLoginInputChange={ (creds) => dispatch(onLoginInputChange(creds)) }
           onLoginClick={ creds => dispatch(loginUser(creds)) }
           isAuthenticated={isAuthenticated}
          />
        }
        <div className="signup-links">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--6-col">
              <Link to="/client/signup">Sign up</Link>
            </div>
            <div className="mdl-cell mdl-cell--6-col text-right">
              <Link to="/client/forgot-password">Forgot my password</Link>
            </div>
          </div>
        </div>
     </div>
    )
  }

}

AuthForm.propTypes = {
  onLoginInputChange: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}