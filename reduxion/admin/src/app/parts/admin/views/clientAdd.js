import React from 'react';
import DocTitle from 'components/docTitle';
import ClientAdd from '../components/clientAdd';
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
        <a href="#" className="mdl-layout__tab">Client List</a>
        <a href="#" className="mdl-layout__tab is-active">Add New Client<i className="material-icons add">add</i></a>
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