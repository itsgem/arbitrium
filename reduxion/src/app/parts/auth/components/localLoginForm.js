import React from 'react';
import LocalAuthenticationForm from '../components/localAuthenticationForm';
import ValidateLoginFields from 'services/validateLoginFields';
import {createError} from 'utils/error';
import Alert from 'components/alert';
import tr from 'i18next';
import Debug from 'debug';

let debug = new Debug("components:login");

class LocalLoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        }
    }

    componentDidMount() {
        if ( typeof(window.componentHandler) != 'undefined' )
        {
            setTimeout(() => {window.componentHandler.upgradeDom()},10);
        }
    }

    render() {
        debug('render state:', this.state);
        return (
            <div className="local-login-form">
                <Alert error={this.state.errorServer}/>
                <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button type="button" className="mdl-snackbar__action"></button>
                </div>
                <LocalAuthenticationForm
                    buttonCaption={tr.t('login') }
                    errors={ this.state.errors }
                    onButtonClick={this.login}
                    login={ this.props.login }
                    />
            </div>
        );
    }

    login( payload ) {
        this.setState( {
            badPassword: false,
            errors: {}
        } );

        return validateLogin.call( this, payload )
            .with( this )
            .then( loginLocal )
            .then( this.props.onLoggedIn )
            .catch( this.setErrors );
    }

    setErrors( e ) {
        debug("setErrors:", e);
        if ( e.status === 401 ) {
            let notification = document.querySelector('.mdl-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: '<strong>Username</strong> and <strong>Password</strong> do not match'
                }
            );
            this.setState( {
                badPassword: true
            } );
        } else {
            this.setState(createError(e));
        }
    }

};


//////////////////////

LocalLoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
};

LocalLoginForm.defaultProps = {
    onLoggedIn: () => {}
};
//////////////////////

function validateLogin( payload ) {
    return new ValidateLoginFields( {
        email: payload.email,
        password: payload.password
    } )
    .execute();
}

function loginLocal( payload ) {
    return this.props.login( payload );
}


export default LocalLoginForm;