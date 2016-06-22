import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiUpdate from 'admin/components/api/apiUpdate';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    let id = this.props.params.id;
    this.props.getApiKey(id).catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.apiUpdateSuccess && !nextProps.loading) {
      $('.msg').html('API Key Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/api/');
    }
    if (Object.keys(nextProps.getApiInfo).length && !Object.keys(nextProps.clientProfileSuccess).length && !nextProps.loading) {
      nextProps.clientProfile(nextProps.getApiInfo.data.client.id).catch(createError);
    }
    if (!Object.keys(nextProps.apiPermissions).length && Object.keys(nextProps.clientProfileSuccess).length && !nextProps.loading) {
      this.props.getApiPermission().catch(createError);
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (Object.keys(this.props.getApiInfo).length && Object.keys(this.props.clientProfileSuccess).length && Object.keys(this.props.apiPermissions).length) {
      closeLoading();
      return this.renderApiInfo();
    } else {
      return this.loadingRender();
    }
  },
  renderApiInfo () {
    return (
        <div id="client_add" className="auth-view">
          <DocTitle
            title="View API KEY"
          />
          <div className="client-tab">
            <Link
              className="mdl-layout__tab"
              to="/coffee/api/">List of API keys</Link>
            <Link
              className='mdl-layout__tab'
              to="/coffee/api/new">Add New API key<i className="material-icons add">add</i></Link>
            <a className="mdl-layout__tab is-active" >VIEW API key<i className="material-icons add">edit</i></a>
          </div>
          <ApiUpdate
            getApiInfo={this.props.getApiInfo}
            apiPermissions={this.props.apiPermissions}
            clientProfileSuccess={this.props.clientProfileSuccess}
            updateApiKey={this.props.updateApiKey}
          />
        </div>
      );
  }
} );