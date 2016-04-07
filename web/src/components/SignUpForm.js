import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import { onSignupInputChange } from '../actions'

export default class SignUpForm extends Component {
  componentDidMount() {
    if (typeof(window.componentHandler) != 'undefined')
    {
      window.componentHandler.upgradeDom();
    }
  }

  handleChange() {
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }

    this.props.onSignupInputChange(creds);
  }

  render() {
    const { dispatch, errorMessage, isValid } = this.props
    
    return (
      <div className="irx-panel">
        <form className="mdl-shadow--2dp">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-block">
            <input type='text' ref='email' className="mdl-textfield__input" id="email"
             onChange={() => {this.handleChange()}}
             htmlAutocomplete="off"/>
            <label className="mdl-textfield__label" htmlFor="email">E-mail address</label>
            {errorMessage && <small class="mdl-textfield__error shown">{errorMessage}</small>}
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-block">
            <input type='password' ref='password' className="mdl-textfield__input" id="password"
             onChange={() => {this.handleChange()}} />
            <label className="mdl-textfield__label" htmlFor="password">Password</label>
          </div>

          <button disabled={!isValid} onClick={(event) => this.handleClick(event)} id="signup_button" className="auth-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            Sign up
          </button>

          <button onClick={(event) => this.handleClick(event)} id="facebook_button" className="auth-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            <i className="ion ion-social-facebook"></i> Sign up via Facebook
          </button>
        </form>
        <div className="signup-links">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--6-col">
              <Link to="/client/login">Login</Link>
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

SignUpForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSignupInputChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool
}

function mapStateToProps(state) {
  const { authFormValidity } = state.default
  const { isValid } = authFormValidity

  return {
    isValid
  }
}