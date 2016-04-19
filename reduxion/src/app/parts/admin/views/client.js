import React from 'react';
import DocTitle from 'components/docTitle';
import Client from '../components/client';

export default React.createClass( {
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    let id = this.props.params.id;
    this.props.clientProfile(id);
  },
  render() {
    let client = {
      clientfunc: this.props.clientProfile,
      clientInfo: this.props.clientProfileSuccess.get('data'),
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientDisapproveSuccess: this.props.clientDisapproveSuccess,
      clientApproveSuccess: this.props.clientApproveSuccess
    };
    return (
        <div className="content box_admin">
            <Client client = { client } />
        </div>
    );
  }
} );
