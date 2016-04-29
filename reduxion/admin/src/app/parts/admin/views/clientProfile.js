import React from 'react';
import ClientProfile from '../components/clientProfile';
import DocTitle from 'components/docTitle';
import { Link } from 'react-router';

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
    if (!nextProps.loading && (nextProps.clientActivateSuccess || nextProps.clientDeactivateSuccess)) {
      nextProps.clientProfile(nextProps.params.id);
    }
  },
  render() {
    let client = {
      clientInfo: this.props.clientProfileSuccess.get('data'),
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientActivate: this.props.clientActivate,
      clientDeactivate: this.props.clientDeactivate,
      clientUpdateProfile: this.props.clientUpdateProfile,
      updateCompleted: this.props.updateCompleted,
      validateUsername: this.props.validateUsername
    };
    let countryList = this.props.countryList;
    return (
      <div id="client_add">
        <DocTitle
          title="Client Profile"
        />
        <div className="client-tab">
          <Link
            className="mdl-layout__tab"
            to="/coffee/client/">Client List</Link>
          <Link
            className='mdl-layout__tab'
            to="/coffee/client/new">Add New Client<i className="material-icons add">add</i></Link>
          <a className="mdl-layout__tab is-active" >VIEW CLIENT<i className="material-icons add">edit</i></a>
        </div>
        <ClientProfile
          client={client}
          countryList={countryList}
          />
      </div>
    );
  }
} );