import React from 'react';
import { Link } from 'react-router';
import ClientHeader from 'client/components/header';
import ClientSidebar from 'client/components/sidebar';
import ClientChangePassword from 'client/components/profile/changePassword';

export default React.createClass({
  componentDidMount () {
    this.props.clientProfilePassword();

    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },

  render () {
    let user = this.props.user.get('data');
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <div className="mdl-tabs__panel" id="profile">
          </div>
          <div className="mdl-tabs__panel is-active" id="change_password">
            <ClientChangePassword
              user={user}
              updateClientPassword={this.props.updateClientPassword}
              responseSuccess={this.props.success}
              />
          </div>
          <div className="mdl-tabs__panel" id="change_email"></div>
        </div>
      </main>
    );
  }
});
