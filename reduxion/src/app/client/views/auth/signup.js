import React from 'react';
import DocTitle from 'common/components/docTitle';
import LocalSignupForm from 'client/components/auth/localSignupForm';

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
        { this.renderRegisterForm() }
      </div>
    );
  },
  renderRegisterComplete(){
    setTimeout(this.toLogin, 3000);
  },
  toLogin() {
    this.context.router.push('/i/login');
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
