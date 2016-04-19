import React from 'react';

class Client extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
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
    console.log('test',client);
    let status = client.clientInfo.approval_status == 'Pending' ? true : false;
    return (
      <div>
          <span>Approval Status: </span><span>{client.clientInfo.approval_status}</span>
          { status &&
          <button
              id='btnClientApproval'
              type='button'
              onClick={(e) => this.changeApprovalStatus(e)}>Approve</button>
          }
          { status &&
          <button
              id='btnClientDisapproval'
              type='button'
              onClick={(e) => this.clientDisapproveStatus(e)}>Disapprove</button>
          }
      </div>
      );
  }
  changeApprovalStatus (e) {
    e.preventDefault();
    this.props.client.clientApprove(this.props.client.clientInfo.id);
    this.props.client.clientfunc(this.props.client.clientInfo.id);
  }
  clientDisapproveStatus (e) {
    e.preventDefault();
    this.props.client.clientDisapprove(this.props.client.clientInfo.id);
    this.props.client.clientfunc(this.props.client.clientInfo.id);
  }
}

export default Client;
