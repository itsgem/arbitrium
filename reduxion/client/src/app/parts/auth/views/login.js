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
        let path = nextProps.location.query.nextPath || '/i';
        debug("componentWillReceiveProps next path: ", path);
        if (nextProps.authenticated) {
          let token = nextProps.user.get('data').get('token');
          let lifetime = nextProps.user.get('data').get('lifetime');
          let user =  nextProps.user.get('data').get('username');
          let date = new Date();
          let expired = date.setMinutes(date.getMinutes()+parseInt(lifetime));
          localStorage.setItem('token', token);
          localStorage.setItem('expired', expired);
          localStorage.setItem('user', user);
          this.context.router.push(path);
        }
    }

    render() {
        return (
            <div id='login' className="auth-view">
                <DocTitle
                    title="Login"
                />
                <div className="login-view">
                    <LocalLoginForm login={this.props.login}/>

                    <div className="mdl-grid mdl-grid--no-spacing" id="other-links">
                        <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
                            <Link
                                to="/i/forgot"
                            >{tr.t('forgotPassword')}</Link>
                        </div>

                        <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet text-right">
                            <Link
                                to="/i/signup"
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
    login: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
}

export default Login;
