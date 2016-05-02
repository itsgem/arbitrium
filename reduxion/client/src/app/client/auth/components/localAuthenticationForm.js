import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import tr from 'i18next';

class LocalAuthenticationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: null,
            email: null,
            loading:false
        }
    }

    render() {
        let {errors} = this.props;
        return (
            <div className="local-signin-form">
                <form className="mdl-shadow--2dp" action={ this.signup }>
                    { !this.props.hideEmail &&
                        <div className={this.formClassNames('email')}>
                            <input
                                className="mdl-textfield__input"
                                type="email"
                                id='email'
                                ref="email"
                                />
                            <label className="mdl-textfield__label" htmlFor="email">{tr.t('email')}</label>
                            {errors.email && <small className="mdl-textfield__error shown">{errors.email[0]}</small>}
                        </div>
                    }

                    <div className={this.formClassNames('password')}>
                        <input
                            className="mdl-textfield__input"
                            id='password'
                            ref="password"
                            type='password'
                            />
                        <label className="mdl-textfield__label" htmlFor="password">{tr.t('password')}</label>
                        {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                    </div>

                    <button
                        className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
                        id='btn-login'
                        type='button'
                        onClick={(e) => this.signup(e)}>{ this.props.buttonCaption }</button>

                    { this.props.showLogin &&
                        <Link
                        className='auth-button secondary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
                        id='btn-signup'
                        to="/login">{ tr.t('login') }</Link>
                    }
                </form>
            </div>
        );
    }

    formClassNames( field ) {
        return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
            'is-invalid is-dirty': this.props.errors[ field ],
            'has-success': this.state[ field ] && !(this.props.errors[ field ])
        } );
    }

    signup( e ) {
        e.preventDefault();

        this.setState( {
            loading: true,
        } );
        let {email, password} = this.refs;

        this.props.onButtonClick( {
            password: password.value,
            email: email.value
        } );
    }

}

LocalAuthenticationForm.mixins = [LinkedStateMixin];

LocalAuthenticationForm.defaultProps = {
    errors: []
};

export default LocalAuthenticationForm;