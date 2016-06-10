import React from 'react';
import { Link } from 'react-router';
import SystemSettings from 'admin/components/systemSettings/settings';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.adminSystemSettings().catch(createError);
  },
  componentWillMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.purchaseSuccess) {
      $('.msg').html('Successfully saved system settings.').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(5000);
      });
      this.context.router.push('/coffee/systemSettings');
    }
  },
  render() {
    if (Object.keys(this.props.systemSettings).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderSystemSettings();
    } else {
      return this.loadingRender();
    }
  },
  renderSystemSettings () {
    return (
      <div id="client_add" className="auth-view">
        <div className="client-tab">
          <a className="mdl-layout__tab is-active" >API Settings<i className="material-icons add">edit</i></a>
        </div>
        <SystemSettings
          params = {this.props.params}
          adminSystemSettings = {this.props.systemSettings}
        />
      </div>
    );
  }
});