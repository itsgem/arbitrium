import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { onSignupInputChange } from '../actions'
import SignUpForm from '../components/SignUpForm'
import css from './app.scss';

class SignUpPage extends Component {
  
  render() {
    const { dispatch, isAuthenticated, errorMessage, isValid } = this.props
    let view = this.props.location.pathname.substr(1).split('/').join(' comp-');
    let css = 'mdl-grid mdl-grid--no-spacing';
    if ( view )
    {
      css = `${css} vw-${view}`;
    }
    return (
      <div id="App" className={css}>
        <div className="mdl-cell mdl-cell--4-col-desktop
         mdl-cell--6-col-tablet mdl-cell--4-offset-desktop mdl-cell--1-offset-tablet mdl-cell--middle">
          <SignUpForm
            onSignupInputChange={ (creds) => dispatch(onSignupInputChange(creds)) }
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            isValid={isValid}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  const { auth, authFormValidity } = state.default
  const { isAuthenticated, errorMessage } = auth
  const { isValid } = authFormValidity
  
  return {
    isAuthenticated,
    errorMessage,
    isValid
  }
}

export default connect(mapStateToProps)(SignUpPage)

