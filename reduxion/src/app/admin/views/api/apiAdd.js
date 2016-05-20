import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiAdd from 'admin/components/api/apiAdd';
import {createError} from 'utils/error';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.getApiPermission().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerApiSuccess && !nextProps.loading) {
      $('.msg').html('API Key Successfully Added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/api/');
    }
  },
  render() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Add New API KEY"
        />
      <div className="client-tab">
        <Link
          className="mdl-layout__tab"
          to="/coffee/api/">List of API keys</Link>
        <a className="mdl-layout__tab is-active">Add New API key<i className="material-icons add">add</i></a>
      </div>
        <ApiAdd
          registerApi={this.props.registerApi}
          clientList={this.props.clientList}
          apiPermissions={this.props.apiPermissions}
          adminClientList={this.props.adminClientList}/>
      </div>
    );
  }
} );