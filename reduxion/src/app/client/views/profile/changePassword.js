import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientChangePassword from 'client/components/profile/changePassword';
import {createError} from 'utils/error';
import { Link } from 'react-router';

export default React.createClass({
  componentDidMount () {
    this.props.clientProfilePassword().catch(createError);

    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },

  render () {
    let user = this.props.user.get('data');
    return (
      <div id="client_add" className="auth-view mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CLIENT_CHANGE_PASSWORD.DOC_TITLE')}
        />
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div className="client-tab">
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile">{tr.t('CLIENT_PROFILE.TITLE')}</Link>
            <a className="mdl-layout__tab is-active" >{tr.t('CLIENT_CHANGE_PASSWORD.TITLE')}<i className="material-icons add">edit</i></a>
            <Link
              className='mdl-layout__tab'
              to="/i/client/profile/change_email">{tr.t('CHANGE_EMAIL_ADDRESS.TITLE')}</Link>
          </div>
          <ClientChangePassword
            user={user}
            updateClientPassword={this.props.updateClientPassword}
            responseSuccess={this.props.success}
            />
        </div>
      </div>
    );
  }
});
