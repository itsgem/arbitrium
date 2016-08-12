import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
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
        <DocTitle
          title={tr.t('CLIENT_API_KEY.API_LIST.DOC_TITLE')}
        />
        {this.loadingRender()}
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
            <div className="mdl-snackbar__text"></div>
            <button type="button" className="mdl-snackbar__action"></button>
          </div>
          <div className="client-tab">
            <a className="mdl-layout__tab is-active" >{tr.t('CLIENT_API_KEY.API_LIST.TITLE')}</a>
            <Link
              className='mdl-layout__tab'
              to="/i/api/new">{tr.t('CLIENT_API_KEY.API_KEY_ADD.TITLE')}<i className="material-icons add">add</i></Link>
          </div>
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
