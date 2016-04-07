import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { onLoginInputChange } from '../actions'
import AuthForm from '../components/AuthForm'
import css from './app.scss';

class App extends Component {
  
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
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
          {!isAuthenticated && <AuthForm
            onLoginInputChange={ (creds) => dispatch(onLoginInputChange(creds)) }
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  const { auth } = state.default
  const { isAuthenticated, errorMessage } = auth
  
  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)

