import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';


class Client extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        errors: {},
        errorServer:null
    };
  }
  render() {
    if (this.props.client.clientInfo) {
      return (
          <div id="client" className="inner_content">
          { this.renderClient()}
          </div>
      );
    } else {
       return (
          <div id="client" className="inner_content">
          { this.renderError()}
          </div>
      );
    }
  }

  renderError() {
    let error = this.state.errorServer;
    if(!error) return;
    return (
      <div className="alert alert-danger text-center animate bounceIn" role="alert">
          <div>An error occured: {error.name}</div>
          <div>{error.message}</div>
          <div>Status Code: {error.status}</div>
      </div>
    );
  }

  renderClient() {
    let {errors} = this.props;
    let client = this.props.client;
    //let status = this.props.client.clientInfo.approval_status == 'Pending'  && ((!client.clientDisapproveSuccess  || !client.clientApproveSuccess) == true)? true : false;
    let status = (this.props.client.clientInfo.approval_status == 'Pending'  && !client.clientDisapproveSuccess  && !client.clientApproveSuccess) ? true : false;
    console.log('0-----', status);
    console.log('1-----', client.clientDisapproveSuccess);
    console.log('2-----', client.clientApproveSuccess);
    return (
      <div>
          <span>Approval Status: </span><span>{client.clientInfo.approval_status}</span>
          { status &&
          <button
              id='btn-login'
              type='button'
              onClick={(e) => this.changeApprovalStatus(e)}>Approve</button>
          }
          { status &&
          <button
              id='btn-login'
              type='button'
              onClick={(e) => this.clientDisapproveStatus(e)}>Disapprove</button>
          }
      </div>
      );
  }
  changeApprovalStatus (e) {
    e.preventDefault();
    this.props.client.clientApprove(this.props.client.clientInfo.id);
  }
  clientDisapproveStatus (e) {
    e.preventDefault();
    this.props.client.clientDisapprove(this.props.client.clientInfo.id);
    
  }
}

export default Client;
