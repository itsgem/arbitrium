import React from 'react';
import DocTitle from 'components/docTitle';
import LocalSignupForm from '../components/localSignupForm';

export default React.createClass( {
    propTypes:{
        registerCompleted: React.PropTypes.bool.isRequired,
        signup: React.PropTypes.func.isRequired
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
        return (
            <div className="signup-view">
                <div className="callout">
                    <h2>Register An Account</h2>

                    <p>Create a free account</p>
                </div>
        
                <LocalSignupForm signup={this.props.signup}/>

                <div className="strike"><span className="or"></span></div>
            </div>
        );
    }
} );
