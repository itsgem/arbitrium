import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import AdminApiCallDetail from 'admin/components/reports/adminApiCallDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';
import NotFound from 'common/components/noMatch';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.adminApiCallDetail(this.props.params.id).catch(createError);
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
    if (!this.props.apiCallDetail) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.apiCallDetail).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderApiCallDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderApiCallDetail () {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_REPORTS.API_CALL_DETAIL.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/reports">{tr.t('ADMIN_REPORTS.ADMIN_API_CALLS_LIST.TITLE')}</Link>
          <Link
            className='mdl-layout__tab'
            to={"/coffee/reports/" + this.props.params.created}>{tr.t('ADMIN_REPORTS.CLIENT_API_CALLS_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_REPORTS.API_CALL_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <AdminApiCallDetail
          params = {this.props.params}
          adminApiCallDetail = {this.props.apiCallDetail}
        />
      </div>
    );
  }
});