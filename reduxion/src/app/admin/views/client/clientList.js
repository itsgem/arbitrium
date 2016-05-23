import React from 'react';
import DocTitle from 'common/components/docTitle';
import ClientList from 'admin/components/client/clientList';
import {createError} from 'utils/error';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
   this.props.adminClientList({per_page: 10}).catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.clientDeleteSuccess) {
      nextProps.adminClientList({per_page: 10}).catch(createError);
    }
  },
  render() {
    return (
      <div id="client_add">
        <DocTitle
          title="Client List"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Client List</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/client/new">Add New Client<i className="material-icons add">add</i></Link>
        </div>
        <ClientList
          clientList={this.props.clientList}
          adminClientList={this.props.adminClientList}
          adminclientDelete={this.props.adminClientDelete}
        />
      </div>
    );
  }
} );