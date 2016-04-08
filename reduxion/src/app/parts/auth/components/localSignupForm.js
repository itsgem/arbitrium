import React from 'react';
import Checkit from 'checkit';

import LocalAuthenticationForm from '../components/localAuthenticationForm';
import {createError} from 'utils/error';

import Debug from 'debug';

let debug = new Debug("components:signup");

class LocalSignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            errorServer:null
        };
    }

    componentDidMount() {
        if ( typeof(window.componentHandler) != 'undefined' )
        {
            setTimeout(() => {window.componentHandler.upgradeDom()},10);
        }
    }

    renderError() {
        let error = this.state.errorServer;
        if(!error) return;

        return (
            <div className="alert alert-danger text-center animate bounceIn" role="alert">
                <div>An error occured: {error.name}</div>
                <div>{error.message}</div>
                <div>Status Code: {error.status}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="local-signup-form">
                { this.renderError()}
                <LocalAuthenticationForm
                    showLogin={true}
                    buttonCaption={this.props.buttonCaption || 'Create an account' }
                    errors={ this.state.errors }
                    onButtonClick={(payload) => {this.signup(payload)}}
                    />

            </div>
        );
    }

    signup( payload ) {
        this.setState( {
            errors: {},
            errorServer: null
        } );
        window.componentHandler.upgradeDom();
        return validateSignup.call( this, payload )
            .with( this )
            .then( signupLocal )
            .catch( setErrors );
    }

}

//////////////////////

LocalSignupForm.propTypes = {
    signup: React.PropTypes.func.isRequired
};

LocalSignupForm.defaultProps = {
    onLoggedIn: () => {}
};

//////////////////////

function validateSignup( payload ) {
    let rules = new Checkit( {
        password: [ 'required', 'alphaDash', 'minLength:6', 'maxLength:64' ],
        email: [ 'required', 'email', 'minLength:6', 'maxLength:64' ]
    } );

    return rules.run( payload );
}

function signupLocal( payload ) {
    debug('signupLocal: ', payload)
    return this.props.signup(payload);
}

function setErrors( e ) {
    debug("setErrors", e);
    this.setState(createError(e));
}

export default LocalSignupForm;
