import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
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
        message: tr.t('NOTEFICATION_MESSAGE.API_KEY_SUCCESSFULLY_UPDATED'),
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
      <div className="noContent">
        <DocTitle
          title={tr.t('CLIENT_API_KEY.API_KEY_UPDATE.DOC_TITLE')}
        />
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.apiKeyInfo) {
      closeLoading();
      return this.noContent();
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
        <DocTitle
          title={tr.t('CLIENT_API_KEY.API_KEY_UPDATE.DOC_TITLE')}
        />
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
