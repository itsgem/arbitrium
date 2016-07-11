import React from 'react';
import ClientChangePassword from 'client/components/profile/changePassword';
import {createError} from 'utils/error';

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
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <div className="mdl-tabs__panel is-active" id="change_password">
            <ClientChangePassword
              user={user}
              updateClientPassword={this.props.updateClientPassword}
              responseSuccess={this.props.success}
              />
          </div>
        </div>
      </main>
    );
  }
});
