import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class Login extends Component {
  
  render() {
    const { errorMessage, isValid, isFetching } = this.props

    return (
      <form className="mdl-shadow--2dp" onSubmit={(event) => this.handleSubmit(event)}>
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

        <button disabled={!isValid || isFetching} onClick={(event) => this.handleClick(event)} id="login_button" className="auth-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
          {isFetching && <div className="bubblingG">
            <span id="bubblingG_1"></span>
            <span id="bubblingG_2"></span>
            <span id="bubblingG_3"></span>
          </div>} {!isFetching && <span>Login</span>}
        </button>
      </form>
    )
  }
  
  handleChange() {
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }

    this.props.onLoginInputChange(creds);
  }

  handleSubmit(event) {
    event.preventDefault()
    this.handleClick(event);
  }

  handleClick(event) {
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}

Login.propTypes = {
  onLoginInputChange: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool
}

function redirectToDashboard() {
  location.href = '/client';
}

function mapStateToProps(state) {
  const { auth, authFormValidity } = state.default
  const { isValid } = authFormValidity
  const { isFetching } = auth

  if (auth.isAuthenticated)
  {
    redirectToDashboard();
  }

  return {
    isValid,
    isFetching
  }
}
export default connect(mapStateToProps)(Login)