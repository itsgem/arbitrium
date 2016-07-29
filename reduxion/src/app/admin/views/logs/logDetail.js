import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import LogDetail from 'admin/components/logs/logDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';
import NotFound from 'common/components/noMatch';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.adminLogDetail(this.props.params.id).catch(createError);
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
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.logDetail) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.logDetail).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderLogDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderLogDetail () {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_API_LOGS.API_LOG_DETAIL.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/settings/logs">{tr.t('ADMIN_API_LOGS.CLIENT_API_LOGS_LIST.TITLE')}</Link>
          <Link
            className='mdl-layout__tab'
            to={"/coffee/settings/logs/client/" + this.props.params.client_id}>{tr.t('ADMIN_API_LOGS.API_LOGS_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_API_LOGS.API_LOG_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <LogDetail
          params = {this.props.params}
          adminLogDetail = {this.props.logDetail}
        />
      </div>
    );
  }
});