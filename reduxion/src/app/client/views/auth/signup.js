import React from 'react';
import DocTitle from 'common/components/docTitle';
import LocalSignupForm from 'client/components/auth/localSignupForm';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  propTypes:{
    registerCompleted: React.PropTypes.bool.isRequired,
    signup: React.PropTypes.func.isRequired,
    countryList: React.PropTypes.object,
  },
  componentDidMount(){
    this.props.country();
  },

  render() {
    return (
      <div id="signup" className="auth-view">
        <DocTitle
          title="Register"
        />
        { this.props.registerCompleted && this.renderRegisterComplete() }
        { !this.props.registerCompleted && this.renderRegisterForm() }
      </div>
    );
  },
  renderRegisterComplete(){
    return (
        <div className="container">
          <div className="local-login-form">
            <div className="bar">
              <span className="bar-title">Sign up</span>
            </div>
            <div id="success-box" className="local-signin-form login-frame">

              <p>A confirmation email has been sent.<br />Click on the link to verify your email address and activate your account.</p>
              <Link
                  className=''
                  id='btn-signup'
                  to="/i/login">Back to Login.</Link>
            </div>
          </div>
        </div>
    );
  },
  renderRegisterForm(){
    let countryList = this.props.countryList;
    return (
      <div className="signup-view">
        <LocalSignupForm signup={this.props.signup} registerCompleted={this.props.registerCompleted} signupError={this.props.signupError} country={countryList}/>
        <div className="mdl-grid mdl-grid--no-spacing" id="other-links"></div>
      </div>
    );
  }
} );
