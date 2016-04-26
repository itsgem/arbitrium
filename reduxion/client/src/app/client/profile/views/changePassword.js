import React from 'react';
import { Link } from 'react-router';
import ClientHeader from '../../common/components/header';
import ClientSidebar from '../../common/components/sidebar';
import ClientChangePassword from '../components/changePassword';

export default React.createClass({
    componentDidMount () {

    },

    render () {
        let success = this.props.success;

        return (
                <main className="mdl-layout__content mdl-layout__content_my_profile">
                    <div className="page-content">
                        <div id="profile-bgcover" className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
                            <div className="profile__content">
                                <div className="mdl-grid box">
                                    <div className="mdl-cell--1-col box-photo">
                                        <img src="http://placehold.it/100x100/"/>
                                    </div>
                                    <div className="mdl-cell--4-col box-details">
                                        <h5 className="mdl-typography--headline"></h5>
                                        <p>Edit your profile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <header className="mdl-layout__header mdl-layout--fixed-tabs">
                            <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                                <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile">Profile</Link>
                                <Link className="mdl-navigation__link mdl-layout__tab is-active" to="/i/client/profile/change_password">Password</Link>
                                <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile/change_email">Email Address</Link>
                                <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile"></Link>
                            </div>
                        </header>
                        <ClientChangePassword
                            updateClientPassword={this.props.updateClientPassword}
                            responseSuccess={success}
                            />
                    </div>
                </main>
        );
    }
});
