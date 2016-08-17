import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import ClientApiCallsReport from 'client/components/reports/clientApiCallsReport';
import {openLoading, closeLoading} from 'common/components/modal';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.clientApiCallsReport({per_page: 10})
      .then(() => this.props.clientApiCallsReportDownload({per_page: this.props.clientApiCallsList.total}));
  },
  render() {
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
      <div id="log_add_or_change">
        <DocTitle
          title={tr.t('CLIENT_REPORTS.API_CALLS_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('CLIENT_REPORTS.API_CALLS_LIST.TITLE')}</label>
        </div>
        <ClientApiCallsReport
          clientApiCallsList={this.props.clientApiCallsList}
          clientApiCallsListDownload={this.props.clientApiCallsListDownload}
          clientApiCallsReport={this.props.clientApiCallsReport}
          clientApiCallsReportDownload={this.props.clientApiCallsReportDownload}
          />
      </div>
    );
  }
} );