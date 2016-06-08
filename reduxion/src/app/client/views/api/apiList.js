import React from 'react';
import { Link } from 'react-router';
import ApiList from 'client/components/api/apiList';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({
  componentWillMount () {
    this.props.clietApiKeys().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteApiKeySuccess && !nextProps.loading) {
      nextProps.clietApiKeys({per_page: 10}).catch(createError);
    }
    if (nextProps.activeApiKey) {
      let apiList = nextProps.listApiKeys;
      let payload = {
        page: apiList.currentPage,
        perPage: apiList.perPage
      };
      nextProps.clietApiKeys(payload).catch(createError);
    }
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
            isActiveApiKey={this.props.isActiveApiKey}
            clietApiKeys={this.props.clietApiKeys}
            listApiKeys={this.props.listApiKeys}
            clientDeleteApiKey={this.props.clientDeleteApiKey}/>
        </div>
      </main>
    );
  }
});
