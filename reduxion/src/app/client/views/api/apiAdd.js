import React from 'react';
import DocTitle from 'common/components/docTitle';
import { Link } from 'react-router';
import tr from 'i18next';
import ApiAdd from 'client/components/api/apiAdd';
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.getApiPermission().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerApiSuccess && !nextProps.loading) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
        message: tr.t('NOTEFICATION_MESSAGE.API_KEY_SUCCESSFULLY_ADDED'),
        timeout: 5000
      });
      this.context.router.push('/i/api/');
    }
  },
  render () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CLIENT_API_KEY.API_KEY_ADD.DOC_TITLE')}
        />
        <div className="alert alert-warning">
          <i className="material-icons"></i>
          <div className="content">
            {tr.t('NOTEFICATION_MESSAGE.PLEASE_REQUIRED_FIELD')}
          </div>
        </div>
        <div className="mdl-grid mdl-grid--no-spacing table-list-container" >
          <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
            <div className="mdl-snackbar__text"></div>
            <button type="button" className="mdl-snackbar__action"></button>
          </div>
          <div className="client-tab">
            <Link
              className="mdl-layout__tab"
              to="/i/api/">{tr.t('CLIENT_API_KEY.API_LIST.TITLE')}</Link>
            <a className="mdl-layout__tab is-active">{tr.t('CLIENT_API_KEY.API_KEY_ADD.TITLE')}<i className="material-icons add">add</i></a>
          </div>
          <ApiAdd
            clientRegisterApi={this.props.clientRegisterApi}
            apiPermissions={this.props.apiPermissions}
          />
        </div>
      </main>
    );
  }
});
