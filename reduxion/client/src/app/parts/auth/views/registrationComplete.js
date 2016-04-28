import React from 'react';
import DocTitle from 'components/docTitle';

import Debug from 'debug';
let debug = new Debug("views:registrationComplete");

export default React.createClass( {
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes:{
        emailCodeVerified: React.PropTypes.bool.isRequired,
        verifyEmailCode: React.PropTypes.func.isRequired,
        error: React.PropTypes.object
    },

    componentDidMount(){
        debug("componentDidMount", this.props.params);
        let code = window.location.search.split('?token=')[1];
        this.props.verifyEmailCode(code);
    },

    componentWillReceiveProps(nextProps) {
        debug("componentWillReceiveProps next: ", nextProps);
        debug("componentWillReceiveProps ", this.props);
        if (nextProps.emailCodeVerified) {
            debug("componentWillReceiveProps router ", this.context.router);
            let path = '/i/login';
            this.context.router.push(path);
        }
    },

    render() {
        debug("render ", this.props);
        return (
            <div id="registration-complete">
                <DocTitle
                    title="Registering"
                />
                {this.renderError()}
                {this.renderRegistering()}
            </div>
        );
    },
    renderError(){
        let {error} = this.props;
        if (!error) return;
        if ( error.data.message || error.data.errors.token) {
            return (
                <div className="alert alert-warning text-center animate bounceIn" role="alert">
                    The email verification code is no longer valid.
                </div>
            );
        } else {
            //TODO
            return (
                <div className="alert alert-danger text-center animate bounceIn" role="alert">
                    An error occured
                </div>
            );
        }
    },
    renderRegistering(){
        if(!this.props.error){
            return (
                <div className="alert alert-info text-center animate bounceIn" role="info">
                    Registering your account.
                </div>
            );
        }
    }
} );
