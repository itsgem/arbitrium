import React from 'react';
import { Link } from 'react-router';
import ClientHeader from '../../common/components/header';
import ClientSidebar from '../../common/components/sidebar';
import ClientChangeEmail from '../components/changeEmail';

export default React.createClass({
    componentDidMount () {
      this.props.clientProfileEmail();

      if ( typeof(window.componentHandler) != 'undefined' )
      {
        setTimeout(() => {window.componentHandler.upgradeDom()},10);
      }
    },

    render () {
      let user = this.props.user.get('data');
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
                    <h5 className="mdl-typography--headline">{(user) ? user.rep_first_name : null} {(user) ? user.rep_last_name : null}</h5>
                    <p>Edit your profile</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mdl-tabs mdl-js-tabs">
              <div className="mdl-tabs__tab-bar">
                <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile">Profile</Link>
                <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile/change_password">Password</Link>
                <Link className="mdl-navigation__link mdl-layout__tab is-active" to="/i/client/profile/change_email">Email Address</Link>
              </div>
              <div className="mdl-tabs__panel" id="profile">
              </div>
              <div className="mdl-tabs__panel" id="change_password">
              </div>
              <div className="mdl-tabs__panel is-active" id="change_email">
                <ClientChangeEmail
                  user={user}
                  updateClientEmail={this.props.updateClientEmail}
                  cancelEmailChange={this.props.cancelEmailChange}
                  responseSuccess={this.props.success}
                  />
              </div>
            </div>
          </div>
        </main>
      );
    }
});
