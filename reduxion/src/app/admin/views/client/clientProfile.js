import React from 'react';
import ClientProfile from 'admin/components/client/clientProfile';
import DocTitle from 'common/components/docTitle';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      clientInfo: null,
      clientUpdateProfile: null,
      updateCompleted: null,
    };
  },
  componentDidMount(){
    let id = this.props.params.id;
    this.props.clientProfile(id);
    this.props.country();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateCompleted && !nextProps.loading) {
      $('.msg').html('Client Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/client/');
    }
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
    if (!nextProps.loading && nextProps.clientUpdateProfile) {
      this.setState({clientUpdateProfile: nextProps.clientUpdateProfile});
    }
    if (!nextProps.loading && nextProps.updateCompleted) {
      this.setState({updateCompleted: nextProps.updateCompleted});
    }
  },
  render() {
    if (this.state.clientInfo) {
      return this.renderAdminInfo();
    } else {
       return (
        <div id="client" className="inner_content"></div>
      );
    }
  },
  renderAdminInfo() {
    let client = {
      clientInfo: this.state.clientInfo,
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientActivate: this.props.clientActivate,
      clientDeactivate: this.props.clientDeactivate,
      clientUpdateProfile: this.state.clientUpdateProfile,
      updateCompleted: this.state.updateCompleted,
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
          validateCompleted={this.props.validateCompleted}
          />
      </div>
    );
  }
} );