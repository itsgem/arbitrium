import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientApiCallsReport from 'admin/components/reports/clientApiCallsReport';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  componentWillMount(){
    this.props.clientApiCallsReport({per_page: 10, date: this.props.params.created});
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.clientApiCallsList) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.clientApiCallsList).length) {
      closeLoading();
      return this.renderClientApiCallsList();
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
  renderClientApiCallsList() {
    return (
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_REPORTS.CLIENT_API_CALLS_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/reports">{tr.t('ADMIN_REPORTS.ADMIN_API_CALLS_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_REPORTS.CLIENT_API_CALLS_LIST.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <ClientApiCallsReport
          params={this.props.params}
          clientApiCallsList={this.props.clientApiCallsList}
          clientApiCallsReport={this.props.clientApiCallsReport}
          />
      </div>
    );
  }
} );