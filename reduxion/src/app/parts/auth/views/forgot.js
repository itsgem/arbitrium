import React from 'react';
import _ from 'lodash';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import DocTitle from 'components/docTitle';
import tr from 'i18next';

import ValidateEmail from 'services/validateEmail';
import ValidateRequiredField from 'services/validateRequiredField';

export default React.createClass( {

    mixins: [
        LinkedStateMixin,
    ],
    propTypes:{
        requestPasswordReset: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            step: 'SendPasswordResetEmail',
            errors: {}
        };
    },

    formClassNames( field ) {
        return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
            'is-invalid is-dirty': this.props.errors[ field ],
            'has-success': this.state[ field ] && !(this.props.errors[ field ])
        } );
    },

    render() {
        return (
            <div id="forgot" className="auth-view">
                <DocTitle title="Forgot password" />
                    <legend>Password Reset</legend>

                    { this.renderSendPasswordResetEmail()}
                    { this.renderCheckEmail() }
            </div>
        );
    },

    renderSendPasswordResetEmail() { 

        if ( this.state.step != 'SendPasswordResetEmail' ) {
            return;
        }
        return (
            <div className="login-view">
                <div>Send Reset Email</div>
                <div className=" local-login-form">
                  <form  className="mdl-shadow--2dp">
                    <p><strong>Enter the email address used when you registered with username and password. </strong></p>

                    <p>You'll be sent a reset code to change your password.</p>

                  
                        {
                           /*<div className={ this.formClassNames( 'email' ) }>
                              <input className="mdl-textfield__input"  type="text"
                                      valueLink={ this.linkState( 'email' ) }
                              />

                               { this.renderErrorsFor( 'email' ) }
                               <label  class="mdl-textfield__label" for="emailAddress">Email Address</label>
                           </div>*/
                        }
                        

                     <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-upgraded">
                        <input
                          className="mdl-textfield__input"
                          type="email"
                          id='email'
                          ref="email"
                       />
                         <label className="mdl-textfield__label" htmlFor="email">{tr.t('email')}</label>                       
                     </div>                      
                    <div className="spacer">
                        <button type="button"
                        className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
                         onClick={ this.requestReset }>
                            Send Reset Email
                        </button>
                    </div>
                   </form>
                </div>
            </div>
    );
    },
    renderCheckEmail() {
        if ( this.state.step != 'CheckEmail' ) {
            return;
        }
        return (
            <div className="panel panel-primary animate bounceIn">
                <div className="panel-heading">Step 2 - Check Email</div>
                <div className="panel-body">
                    <p><strong>An email has been sent containing your reset link. Click on this link to proceed.</strong></p>

                    <p>Please also check your spam folder just in case the reset email ended up there.</p>

                    <p>This page can be safely closed.</p>
                </div>
            </div>
        );
    },

    renderErrorsFor( field ) {
        if ( this.state.errors[ field ] ) {
            return (
                <span className="label label-danger animate bounceIn">{ this.state.errors[ field ]}</span>
            );
        }
    },

    requestReset() {
        this.resetErrors();

        validateEmail.call( this )
            .with( this )
            .then( requestReset )
            .then( setNextStep )
            .catch( errors );

        function validateEmail() {

            return validateExists.call( this )
                .then( validateFormat.bind( this ) );


            function validateFormat() {
                return new ValidateEmail( this.email() )
                    .execute();
            }

            function validateExists() {
                return new ValidateRequiredField( 'email', this.email() )
                    .execute();

            }
        }

        function requestReset() {
            return this.props.requestPasswordReset( this.email() );
        }

        function setNextStep( ) {
            this.setState( {
                step: 'CheckEmail'
            } );
        }

        function errors( e ) {
            if ( e.name === 'CheckitError' ) {
                this.setState( {
                    errors: e.toJSON()
                } );
            } else {
                let error = e.responseJSON;
                let message;

                message = error.message;

                this.setState( {
                    errors: {
                        email: message
                    }
                } );
            }
        }

    },


    email() {
        return _.trim( this.state.email );
    },

    code() {
        return _.trim( this.state.code );
    },

    password() {
        return _.trim( this.state.password );
    },

    resetErrors() {
        this.setState( {
            errors: {}
        } );
    },

    formClassNames( field ) {
        return cx( 'form-group', {
            'has-error': this.state.errors[ field ]
        } );
    }
} );
