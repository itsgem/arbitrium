import React from 'react';
import { Link } from 'react-router';
import ApiList from 'client/components/api/apiList';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({
  componentWillMount () {
    this.props.clientApiKeys().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteApiKeySuccess && !nextProps.loading) {
      this.props.clientApiKeys({per_page: 10}).catch(createError);
    }
    if (nextProps.activeApiKey) {
      let apiList = nextProps.listApiKeys;
      let description = document.querySelector("#description");
      let token = document.querySelector("#api_key");
      let created = document.querySelector("#created_at");
      let payload = {
        page: apiList.currentPage,
        perPage: apiList.perPage,
        description: description.value,
        token: token.value,
        created: created.value
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
            clientApiKeys={this.props.clientApiKeys}
            listApiKeys={this.props.listApiKeys}
            clientDeleteApiKey={this.props.clientDeleteApiKey}/>
        </div>
      </main>
    );
  }
});
