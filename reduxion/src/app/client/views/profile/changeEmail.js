import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientChangeEmail from 'client/components/profile/changeEmail';
import {createError} from 'utils/error';
import { Link } from 'react-router';

export default React.createClass({
  componentDidMount () {
    this.props.clientProfileEmail().catch(createError);

    if ( typeof(window.componentHandler) != 'undefined' )
    {
    setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },

  render () {
    let user = this.props.user.get('data');
    let errors = this.props.errors.get('data');
    return (
      <div id="client_add" className="auth-view mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CHANGE_EMAIL_ADDRESS.DOC_TITLE')}
        />
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div className="client-tab">
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile">{tr.t('CLIENT_PROFILE.TITLE')}</Link>
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile/change_password">{tr.t('CLIENT_CHANGE_PASSWORD.TITLE')}</Link>
            <a className="mdl-layout__tab is-active" >{tr.t('CHANGE_EMAIL_ADDRESS.TITLE')}<i className="material-icons add">edit</i></a>
          </div>
          <ClientChangeEmail
            user={user}
            updateClientEmail={this.props.updateClientEmail}
            cancelEmailChange={this.props.cancelEmailChange}
            loading={this.props.loading}
            responseSuccess={this.props.success}
            success ={this.props.isProfileSuccess}
            responseError={errors}
            />
        </div>
      </div>
    );
  }
});
