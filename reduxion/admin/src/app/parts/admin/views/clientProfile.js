import React from 'react';
import ClientProfile from '../components/clientProfile';
import DocTitle from 'components/docTitle';
import { Link } from 'react-router';

export default React.createClass( {
  getInitialState() {
    return {
      clientInfo: null,
      updateCompleted: false,
      isUsernameAvailable: null
    };
  },
  componentDidMount(){
    let id = this.props.params.id;
    this.props.clientProfile(id);
    this.props.country();
    console.log("=== componentDidMount - this.props.params.id : ", this.props.params.id);
  },
  componentWillReceiveProps(nextProps) {
    // Disapprove/Approve Client
    if (!nextProps.loading && (nextProps.clientDisapproveSuccess || nextProps.clientApproveSuccess)) {
      nextProps.clientProfile(nextProps.params.id);
    }
    if (!nextProps.loading && (nextProps.clientActivateSuccess || nextProps.clientDeactivateSuccess)) {
      nextProps.clientProfile(nextProps.params.id);
    }

    // Displaying and Updating Client
    if (!nextProps.loading && nextProps.clientProfileSuccess) {
      this.setState({clientInfo: nextProps.clientProfileSuccess.get('data')});
    }
    if (!nextProps.loading && nextProps.updateCompleted) {
      this.setState({updateCompleted: nextProps.updateCompleted});
    }

    this.setState({isUsernameAvailable: nextProps.isUsernameAvailable});
  },
  render() {
    console.log("=== render - this.props.params.id : ", this.props.params.id);

    let client = {
      clientInfo: this.state.clientInfo,
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientActivate: this.props.clientActivate,
      clientDeactivate: this.props.clientDeactivate,
      clientUpdateProfile: this.props.clientUpdateProfile,
      updateCompleted: this.state.updateCompleted,
      validateUsername: this.props.validateUsername,
      isUsernameAvailable: this.state.isUsernameAvailable
    };
    let countryList = this.props.countryList;
    let loading = this.props.loading;

    console.log("=== render - client : ", client);
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
          loading={loading}
          />
      </div>
    );
  }
} );