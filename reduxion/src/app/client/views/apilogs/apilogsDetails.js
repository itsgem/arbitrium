import React from 'react';
import { openLoading } from 'common/components/modal'
import { createError } from 'utils/error';
import ApiLogsDetail from 'client/components/apiLogs/apilogsDetails';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    let id = this.props.params.id;
    this.props.clientApiLogInfo(id).catch(createError);
  },
  componentWillReceiveProps () {
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
  render() {
    if (Object.keys(this.props.successApiLogInfo).length) {
      return this.renderApiLogDetails();
    } else {
      return this.loadingRender();
    }
  },
  renderApiLogDetails() {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiLogsDetail successApiLogInfo={this.props.successApiLogInfo} />
        </div>
      </main>
    );
  }
});