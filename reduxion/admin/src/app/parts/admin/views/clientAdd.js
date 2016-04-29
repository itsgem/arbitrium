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
  renderSuccess () {
    if (this.props.registerCompleted) {
      $('.msg').html('Client successfully added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/client/');
    }
  },
  render() {
    this.renderSuccess();
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
          validateCompleted={this.props.validateCompleted}
          country={this.props.country}
          countryList={this.props.countryList}/>
      </div>
    );
  }
} );