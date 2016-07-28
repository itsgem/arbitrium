import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientAccessLogList from 'admin/components/logs/clientAccessLogList';
import {openLoading, closeLoading} from 'common/components/modal';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  componentWillMount(){
    this.props.clientAccessLogList({per_page: 10});
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.clientAccessLogs) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.clientAccessLogs).length) {
      closeLoading();
      return this.renderClientAccessLogList();
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
  renderClientAccessLogList() {
    return (
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_API_LOGS.CLIENT_ACCESS_LOGS.DOC_TITLE')}
        />
        <div className="client-tab">
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_API_LOGS.CLIENT_ACCESS_LOGS.TITLE')}</a>
        </div>
        <ClientAccessLogList
          params={this.props.params}
          clientAccessLogs={this.props.clientAccessLogs}
          clientAccessLogList={this.props.clientAccessLogList}
          />
      </div>
    );
  }
} );