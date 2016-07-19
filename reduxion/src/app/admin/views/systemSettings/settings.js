import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import SystemSettings from 'admin/components/systemSettings/settings';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.adminSystemSettings().catch(createError);
  },

  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    if (nextProps.saveSuccess) {
      nextProps.adminSystemSettings().catch(createError);
      $('.msg').html('Successfully saved system settings.').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(3000);
      });
      this.context.router.push('/coffee/systemsettings');
    }
  },
  render() {
    if (Object.keys(this.props.systemSettings).length) {
      closeLoading();
      return this.renderSystemSettings();
    } else {
      return this.loadingRender();
    }
  },
  renderSystemSettings () {
    return (
      <div id="client_add" className="auth-view">
      <DocTitle
          title={tr.t('ADMIN_SYSTEM_SETTINGS.DOC_TITLE')}
        />
        <div className="client-tab">
          <a className="mdl-layout__tab is-active">{tr.t('ADMIN_SYSTEM_SETTINGS.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <SystemSettings
          adminSystemSettings = {this.props.systemSettings}
          saveSystemSettings = {this.props.saveSystemSettings}
        />
      </div>
    );
  }
});