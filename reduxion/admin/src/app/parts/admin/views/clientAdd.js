import React from 'react';
import DocTitle from 'components/docTitle';
import ClientAdd from '../components/clientAdd';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.country();
  },
  render() {
    if (this.props.registerCompleted) {
      this.context.router.push('/admin/clientlist');
    }
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Client Add"
        />
      <div className="client-tab">
        <Link
          className="mdl-layout__tab"
          to="/coffee/client/">Client List</Link>
        <a className="mdl-layout__tab is-active">Add New Client<i className="material-icons add">add</i></a>
      </div>
        <ClientAdd
          clientRegister={this.props.clientRegister}
          validateUsername={this.props.validateUsername}
          country={this.props.country}
          countryList={this.props.countryList}/>
      </div>
    );
  }
} );