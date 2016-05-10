import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiAdd from 'admin/components/api/apiAdd';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.getApiPermission();
  },
  render() {
    if (this.props.loading) {
      return (
        <div>LOADING</div>
      );    
    }
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