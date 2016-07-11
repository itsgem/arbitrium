import React from 'react';
import { openLoading } from 'common/components/modal'
import ApiLogsList from 'client/components/apiLogs/apilogsList';
import { createError } from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.clientApiLogsList().catch(createError);
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
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiLogsList
            clientApiLogsList={this.props.clientApiLogsList}
            successApiLogsList={this.props.successApiLogsList}
          />
        </div>
      </main>
    );
  }
});