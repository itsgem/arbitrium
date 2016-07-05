import React from 'react';
import ClientChangeEmail from 'client/components/profile/changeEmail';
import {createError} from 'utils/error';

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
    <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
      <div className="page-content">
        <div className="mdl-tabs__panel is-active" id="change_email">
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
    </main>
    );
  }
});
