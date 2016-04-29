import React from 'react';
import { Link } from 'react-router';
import ClientHeader from '../../common/components/header';
import ClientSidebar from '../../common/components/sidebar';
import ClientProfile from '../components/profile';

export default React.createClass({
  componentDidMount() {
    this.props.clientProfile();
    this.props.country();
      if ( typeof(window.componentHandler) != 'undefined' )
      {
        setTimeout(() => {window.componentHandler.upgradeDom()},10);
      }
  },
  render () {
    let user = this.props.user.get('data');
    let countryList = this.props.countryList;

    let success = this.props.success;
    let errors = this.props.errors.get('data');

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
          <header className="mdl-layout__header mdl-layout--fixed-tabs">
            <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
              <Link className="mdl-navigation__link mdl-layout__tab is-active" to="/i/client/profile">Profile</Link>
              <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile/change_password">Password</Link>
              <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile/change_email">Email Address</Link>
              <Link className="mdl-navigation__link mdl-layout__tab" to="/i/client/profile"></Link>
            </div>
          </header>
          <ClientProfile
            user={user}
            country={countryList}
            updateClientProfile={this.props.updateClientProfile}
            getAvailableUsername={this.props.getAvailableUsername}
            isUsernameAvailable={this.props.isUsernameAvailable}
            retrieveEmailChangeToken={this.props.retrieveEmailChangeToken}
            locationQuery={this.props.location.query}
            isRetrieveEmailChangeTokenSuccess={this.props.isRetrieveEmailChangeTokenSuccess}
            emailChangeToken={this.props.emailChangeToken}
            verifyEmailChange={this.props.verifyEmailChange}
            isVerifyEmailChangeSuccess={this.props.isVerifyEmailChangeSuccess}
            loading={this.props.loading}
            responseSuccess={success}
            responseError={errors}
            />
        </div>
      </main>
    );
  }
});
