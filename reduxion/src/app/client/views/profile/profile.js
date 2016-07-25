import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import ClientProfile from 'client/components/profile/profile';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'
import { Link } from 'react-router';

export default React.createClass({

  componentDidMount() {
    this.props.clientProfile()
      .then(() => this.props.countryProfile())
      .then(() => this.props.clientSubscription())
      .catch((err) => this.setState(createError(err)));
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
    if(nextProps.updateSuccess || nextProps.cancelSubscriptionSuccess || Object.keys(nextProps.errors).length){
      let message = '';
      if (nextProps.cancelSubscriptionSuccess) {
        message = tr.t('NOTEFICATION_MESSAGE.SUCCESS_CANCEL_SUBSCRIPTION');
      } else if (nextProps.updateSuccess) {
        message = tr.t('NOTEFICATION_MESSAGE.SUCCESS_UPDATE_PROFILE');
      } else {
        message = nextProps.errors.data.errors[0];
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
      <div id="client_add" className="auth-view mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CLIENT_PROFILE.DOC_TITLE')}
        />
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
            <div className="mdl-snackbar__text"></div>
            <button type="button" className="mdl-snackbar__action"></button>
          </div>
          <div className="client-tab">
            <a className="mdl-layout__tab is-active" >{tr.t('CLIENT_PROFILE.TITLE')}<i className="material-icons add">edit</i></a>
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile/change_password">{tr.t('CLIENT_CHANGE_PASSWORD.TITLE')}</Link>
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile/change_email">{tr.t('CHANGE_EMAIL_ADDRESS.TITLE')}</Link>
          </div>
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
            errors={this.props.errors}
            />
        </div>
      </div>
    );
  }
});
