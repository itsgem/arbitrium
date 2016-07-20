import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiList from 'admin/components/api/apiList';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import tr from 'i18next';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.apiList({per_page: 10}).catch(createError);
  },
  loadingRender () {
    if(this.props.loading){
      openLoading();
    } else {
      closeLoading();
    }
    return (
      <div className="loading"></div>
    );
  },
  render() {
    return (
      <div id="client_add">
        <DocTitle
          title={tr.t('API.DOC_TITLE_LIST')}
        />
        {this.loadingRender()}
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('API.PAGE_TITLE.LIST')}</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/api/new">{tr.t('API.PAGE_TITLE.ADD')}<i className="material-icons add">add</i></Link>
        </div>
        <ApiList
          ListApiSuccess={this.props.ListApiSuccess}
          apiList={this.props.apiList}
          activeApiKey={this.props.activeApiKey}
          isActiveApiKey={this.props.isActiveApiKey}
          deleteApiKeySuccess={this.props.deleteApiKeySuccess}
          adminDeleteApiKey={this.props.adminDeleteApiKey}
          />
      </div>
    );
  }
} );