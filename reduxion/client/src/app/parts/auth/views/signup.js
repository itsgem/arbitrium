import React from 'react';
import DocTitle from 'components/docTitle';
import LocalSignupForm from '../components/localSignupForm';

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
    setTimeout(this.myFunction, 3000);
    return(
      <div className="alert bg-green text-center animate bounceIn" role="alert">
        A confirmation email has been sent. Click on the link to verify your email address and activate your account.
      </div>
    );
  },
  myFunction() {
    this.context.router.push('/i/login');
  },
  renderRegisterForm(){
    let countryList = this.props.countryList;
    return (
      <div className="signup-view">
        <LocalSignupForm signup={this.props.signup} signupError={this.props.signupError} country={countryList}/>
        <div className="mdl-grid mdl-grid--no-spacing" id="other-links"></div>
      </div>
    );
  }
} );
