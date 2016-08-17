import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import AdminApiCallsReport from 'admin/components/reports/adminApiCallsReport';
import {openLoading, closeLoading} from 'common/components/modal';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminApiCallsReport({per_page: 10})
      .then(() => this.props.adminApiCallsReportDownload({per_page: this.props.adminApiCallsList.total}));
  },
  render() {
    if (Object.keys(this.props.adminApiCallsList).length) {
      closeLoading();
      return this.renderAdminApiCallsList();
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
  renderAdminApiCallsList() {
    return (
      <div id="log_add_or_change">
        <DocTitle
          title={tr.t('ADMIN_REPORTS.ADMIN_API_CALLS_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('ADMIN_REPORTS.ADMIN_API_CALLS_LIST.TITLE')}</label>
        </div>
        <AdminApiCallsReport
          adminApiCallsList={this.props.adminApiCallsList}
          adminApiCallsDownload={this.props.adminApiCallsDownload}
          adminApiCallsReport={this.props.adminApiCallsReport}
          adminApiCallsReportDownload={this.props.adminApiCallsReportDownload}
          />
      </div>
    );
  }
} );