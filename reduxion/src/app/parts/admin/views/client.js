import React from 'react';
import Client from '../components/client';

export default React.createClass( {
  componentDidMount(){
    let id = this.props.params.id;
    this.props.clientProfile(id);
  },
  render() {
    let client = {
      clientfunc: this.props.clientProfile,
      clientInfo: this.props.clientProfileSuccess.get('data'),
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
    };
    return (
        <div className="content box_admin">
            <Client client = { client } />
        </div>
    );
  }
} );
