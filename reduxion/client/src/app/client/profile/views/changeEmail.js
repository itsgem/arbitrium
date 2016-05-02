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
        <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
          <div className="page-content">
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
                  loading={this.props.loading}
                  />
              </div>
          </div>
        </main>
      );
    }
});
