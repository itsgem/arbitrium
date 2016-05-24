import React from 'react';
import { Link } from 'react-router';
import ClientProfile from 'client/components/profile/profile';
import {createError} from 'utils/error';

export default React.createClass({

  componentDidMount() {
    this.props.clientProfile().catch(createError);
    this.props.countryProfile().catch(createError);
    this.props.clientSubscription().catch(createError);

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
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
            <div className="mdl-snackbar__text"></div>
            <button type="button" className="mdl-snackbar__action"></button>
          </div>
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>My Profile</p>
          </div>
          <div className="page-content">
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
                  responseSuccess={this.props.success}
                  success ={this.props.isProfileSuccess}
                  responseError={errors}
                  clientProfile ={this.props.clientProfile}
                  currentSubscription ={this.props.currentSubscription}
                  clientSubscriptionCancel ={this.props.clientSubscriptionCancel}
                  />
              <div className="mdl-tabs__panel" id="change_password">
              </div>
              <div className="mdl-tabs__panel" id="change_email">
              </div>
          </div>
        </div>
      </main>
    );
  }
});
