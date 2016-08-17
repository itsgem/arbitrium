import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { openLoading, closeLoading } from 'common/components/modal'
import ApiLogsList from 'client/components/apiLogs/apilogsList';
import { createError } from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.clientApiLogsList()
      .then(() => this.props.clientApiLogsListDownload({per_page: this.props.successApiLogsList.total}))
      .catch(createError);
  },
  componentWillReceiveProps () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },
  loadingRender () {
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (this.props.loading && Object.keys(this.props.successApiLogsList).length) {
      openLoading();
    } else {
      closeLoading();
    }

    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CLIENT_API_LOGS.API_LOGS_LIST.DOC_TITLE')}
        />
        { this.loadingRender() }
        <div className="page-content">
          <ApiLogsList
            clientApiLogsList={this.props.clientApiLogsList}
            clientApiLogsListDownload={this.props.clientApiLogsListDownload}
            successApiLogsList={this.props.successApiLogsList}
            successApiLogsListDownload={this.props.successApiLogsListDownload}
          />
        </div>
      </main>
    );
  }
});