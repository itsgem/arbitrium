import React from 'react';
import ClientProfile from 'client/components/profile/profile';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({

  componentDidMount() {
    this.props.clientProfile().catch(createError);
    this.props.countryProfile().catch(createError);
    this.props.clientSubscription().catch(createError);
  },

  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },

  render () {

    if (Object.keys(this.props.clientInfo).length && Object.keys(this.props.countryList).length && Object.keys(this.props.currentSubscription).length) {
      closeLoading();
      return this.renderClientInfo();
    } else {
      return this.loadingRender();
    }
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.updateSuccess || nextProps.cancelSubscriptionSuccess){
      let message = '';
      if (nextProps.cancelSubscriptionSuccess) {
        message = "Successfully cancel subscription.";
      } else if (nextProps.updateSuccess) {
        message = "Successfully updated profile.";
      }
      nextProps.clientProfile().catch(createError);
      nextProps.countryProfile().catch(createError);
      nextProps.clientSubscription().catch(createError);
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
          message: message,
          timeout: 3000
      });
    }
  },

  renderClientInfo () {
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
              clientSubscriptionCancel={this.props.clientSubscriptionCancel}
              clientInfo={this.props.clientInfo}
              countryList={this.props.countryList}
              locationQuery={this.props.location.query}
              currentSubscription={this.props.currentSubscription}
              updateClientProfile={this.props.updateClientProfile}
              getAvailableUsername={this.props.getAvailableUsername}
              validateCompleted={this.props.validateCompleted}
              retrieveEmailChangeToken={this.props.retrieveEmailChangeToken}
              isRetrieveEmailChangeTokenSuccess={this.props.isRetrieveEmailChangeTokenSuccess}
              emailChangeToken={this.props.emailChangeToken}
              verifyEmailChange={this.props.verifyEmailChange}
              isVerifyEmailChangeSuccess={this.props.isVerifyEmailChangeSuccess}
              loading={this.props.loading}
            />
            <div className="mdl-tabs__panel" id="change_password"></div>
            <div className="mdl-tabs__panel" id="change_email"></div>
          </div>
        </div>
      </main>
    );
  }
});
