import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiList from 'admin/components/api/apiList';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.apiList({per_page: 10}).catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteApiKeySuccess && !nextProps.loading) {
      this.props.apiList({per_page: 10}).catch(createError);
    }
    if (nextProps.activeApiKey) {
      let apiList = nextProps.ListApiSuccess;
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
      nextProps.apiList(payload).catch(createError);
    }
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
          title="API List"
        />
        {this.loadingRender()}
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">List of API keys</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/api/new">Add New API key<i className="material-icons add">add</i></Link>
        </div>
        <ApiList
          ListApiSuccess={this.props.ListApiSuccess}
          apiList={this.props.apiList}
          isActiveApiKey={this.props.isActiveApiKey}
          adminDeleteApiKey={this.props.adminDeleteApiKey}
          />
      </div>
    );
  }
} );