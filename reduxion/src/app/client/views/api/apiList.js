import React from 'react';
import ApiList from 'client/components/api/apiList';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({
  componentWillMount () {
    this.props.clientApiKeys().catch(createError);
  },
  loadingRender () {
    if (this.props.loading) {
      openLoading();
    } else {
      closeLoading();
    }
    return (
      <div className="loading"></div>
    );
  },
  render () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        {this.loadingRender()}
        <div className="page-content">
          <ApiList
            activeApiKey={this.props.activeApiKey}
            isActiveApiKey={this.props.isActiveApiKey}
            clientApiKeys={this.props.clientApiKeys}
            listApiKeys={this.props.listApiKeys}
            deleteApiKeySuccess={this.props.deleteApiKeySuccess}
            clientDeleteApiKey={this.props.clientDeleteApiKey}/>
        </div>
      </main>
    );
  }
});
