import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import ClientApiCallDetail from 'client/components/reports/clientApiCallDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';
import NotFound from 'common/components/noMatch';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.clientApiCallDetail(this.props.params.id).catch(createError);
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
    if (!this.props.clientApiCallInfo) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.clientApiCallInfo).length) {
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
          title={tr.t('CLIENT_REPORTS.API_CALL_DETAIL.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/i/reports">{tr.t('CLIENT_REPORTS.API_CALLS_LIST.TITLE')}</Link>
          <Link
            className='mdl-layout__tab'
            to={"/i/reports/" + this.props.params.created}>{tr.t('CLIENT_REPORTS.API_CALLS_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('CLIENT_REPORTS.API_CALL_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <ClientApiCallDetail
          params = {this.props.params}
          clientApiCallDetail = {this.props.clientApiCallInfo}
        />
      </div>
    );
  }
});