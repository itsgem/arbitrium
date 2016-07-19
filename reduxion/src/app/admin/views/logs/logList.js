import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import LogList from 'admin/components/logs/logList';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  componentWillMount(){
    this.props.adminLogList({per_page: 10, client_id: this.props.params.client_id});
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.logList) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.logList).length) {
      closeLoading();
      return this.renderLogList();
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
  renderLogList() {
    return (
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_API_LOGS.API_LOGS_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/logs/">{tr.t('ADMIN_API_LOGS.CLIENT_API_LOGS_LIST.FORM.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_API_LOGS.API_LOGS_LIST.FORM.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <LogList
          params={this.props.params}
          logList={this.props.logList}
          adminLogList={this.props.adminLogList}
          />
      </div>
    );
  }
} );