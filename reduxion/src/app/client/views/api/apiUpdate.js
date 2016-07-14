import React from 'react';
import ApiEdit from 'client/components/api/apiUpdate';
import NotFound from 'common/components/noMatch';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    let id = this.props.params.id;
    this.props.clientGetApiKey(id).catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.apiUpdateSuccess && !nextProps.loading) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
        message: "API Key Successfully Updated",
        timeout: 3000
      });
      this.context.router.push('/i/api/');
    }
    if (Object.keys(nextProps.apiKeyInfo).length && !Object.keys(nextProps.apiPermissions).length && !nextProps.loading) {
      this.props.getApiPermission().catch(createError);
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  noContent () {
    return (
      <div className="noContent">No content</div>
    );
  },
  render () {
    if (!this.props.apiKeyInfo) {
      closeLoading();
      return (
        <div>
          <NotFound />
        </div>
      );
    }
    if (Object.keys(this.props.apiKeyInfo).length && Object.keys(this.props.apiPermissions).length) {
      closeLoading();
      return this.renderApiInfo();
    } else {
      return this.loadingRender();
    }

  },

  renderApiInfo () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiEdit
            getApiInfo={this.props.apiKeyInfo}
            apiPermissions={this.props.apiPermissions}
            updateApi={this.props.clientUpdateApiKey}
          />
        </div>
      </main>
    );
  }
});
