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
                <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
                    <div className="mdl-snackbar__text"></div>
                    <button type="button" className="mdl-snackbar__action"></button>
                </div>
                <LocalAuthenticationForm
                    buttonCaption={tr.t('login') }
                    errors={ this.state.errors }
                    onButtonClick={ (payload) => { this.login(payload) } }
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
        let message = null;
        switch(e.status) {
            case 401 :
             message = 'No matching credentials. Please check your e-mail and password.';
            break;

            case 403 :
            if (e.data.messages.length >1){
                message = e.data.messages[0] +" "+ e.data.messages[1];
            }else {
                message = e.data.message;
            }
            break;

            case 423 :
                message = e.data.message;
            break;

            default:
              message =''
        }

        let notification = document.querySelector('.mdl-snackbar');
        console.log(notification)
        notification.MaterialSnackbar.showSnackbar( {
            message: message
        });

        this.setState( {
            badPassword: true
        } );

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