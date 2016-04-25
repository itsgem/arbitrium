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
        <ClientAdd
          clientRegister={this.props.clientRegister}
          validateUsername={this.props.validateUsername}
          country={this.props.country}
          countryList={this.props.countryList}/>
      </div>
    );
  }
} );