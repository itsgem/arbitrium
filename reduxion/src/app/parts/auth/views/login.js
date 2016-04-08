import React from 'react';
import { Link } from 'react-router';
import tr from 'i18next';
import LocalLoginForm from '../components/localLoginForm';
import DocTitle from 'components/docTitle';

import Debug from 'debug';
let debug = new Debug("views:login");

class Login extends React.Component {
    componentWillReceiveProps(nextProps){
        debug("componentWillReceiveProps", nextProps);
        let path = nextProps.location.query.nextPath || '/app';
        debug("componentWillReceiveProps next path: ", path);
        if (nextProps.authenticated) {
            this.context.router.push(path);
        }
    }

    render() {
        return (
            <div id='login'>
                <DocTitle
                    title="Login"
                />
                <div className="login-view">
                    <LocalLoginForm login={this.props.login}/>

                    <div className="mdl-grid mdl-grid--no-spacing" id="other-links">
                        <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
                            <Link
                                to="/forgot"
                            >{tr.t('forgotPassword')}</Link>
                        </div>

                        <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet text-right">
                            <Link
                                to="/signup"
                            >{tr.t('sign_up')}</Link>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
};



Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}


Login.propTypes = {
    authenticated: React.PropTypes.bool.isRequired,
    login: React.PropTypes.func.isRequired
}

export default Login;
