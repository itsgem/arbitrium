import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import AdminAccessLogList from 'admin/components/logs/adminAccessLogList';
import {openLoading, closeLoading} from 'common/components/modal';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  componentWillMount(){
    this.props.adminAccessLogList({per_page: 10});
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.adminAccessLogs) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.adminAccessLogs).length) {
      closeLoading();
      return this.renderAdminAccessLogList();
    } else {
      return this.loadingRender();
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  renderAdminAccessLogList() {
    return (
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_API_LOGS.ADMIN_ACCESS_LOGS.DOC_TITLE')}
        />
        <div className="client-tab">
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_API_LOGS.ADMIN_ACCESS_LOGS.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <AdminAccessLogList
          params={this.props.params}
          adminAccessLogs={this.props.adminAccessLogs}
          adminAccessLogList={this.props.adminAccessLogList}
          />
      </div>
    );
  }
} );