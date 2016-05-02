import React from 'react';
import DocTitle from 'components/docTitle';
import LocalSignupForm from '../components/localSignupForm';

export default React.createClass( {
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
        return(
            <div className="alert alert-info text-center animate bounceIn" role="alert">
                A confirmation email has been sent. Click on the link to verify your email address and activate your account.
            </div>
        );
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
