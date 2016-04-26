import React from 'react';
import ClientProfile from '../components/clientProfile';

export default React.createClass( {
  componentDidMount(){
    let id = this.props.params.id;
    this.props.clientProfile(id);
    this.props.country();
  },
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.clientDisapproveSuccess || nextProps.clientApproveSuccess)) {
      nextProps.clientProfile(nextProps.params.id);
    }
  },
  render() {
    let client = {
      clientInfo: this.props.clientProfileSuccess.get('data'),
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientUpdateProfile: this.props.clientUpdateProfile,
      validateUsername: this.props.validateUsername
    };
    let countryList = this.props.countryList;
    return (
      <div className="content box_admin">
        <ClientProfile
          client={client}
          countryList={countryList}
          />
      </div>
    );
  }
} );