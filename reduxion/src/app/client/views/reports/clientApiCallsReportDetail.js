import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientApiCallsReportDetail from 'client/components/reports/clientApiCallsReportDetail';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  componentWillMount(){
    this.props.clientApiCallsReportDetail({per_page: 10, date: this.props.params.created})
      .then(() => this.props.clientApiCallsReportDetailDownload({per_page: this.props.clientApiCallsListDetail.total, date: this.props.params.created}));
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.clientApiCallsListDetail) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.clientApiCallsListDetail).length) {
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
          title={tr.t('CLIENT_REPORTS.API_CALLS_LIST_DETAIL.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/i/reports">{tr.t('CLIENT_REPORTS.API_CALLS_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('CLIENT_REPORTS.API_CALLS_LIST_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <ClientApiCallsReportDetail
          params={this.props.params}
          clientApiCallsListDetail={this.props.clientApiCallsListDetail}
          clientApiCallsListDetailDownload={this.props.clientApiCallsListDetailDownload}
          clientApiCallsReportDetail={this.props.clientApiCallsReportDetail}
          clientApiCallsReportDetailDownload={this.props.clientApiCallsReportDetailDownload}
          />
      </div>
    );
  }
} );