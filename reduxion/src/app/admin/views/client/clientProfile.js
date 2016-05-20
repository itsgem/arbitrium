import React from 'react';
import ClientProfile from 'admin/components/client/clientProfile';
import DocTitle from 'common/components/docTitle';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

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
    this.props.clientProfile(id).catch(createError);
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
      nextProps.clientProfile(nextProps.params.id).catch(createError);
    }
    if (!nextProps.loading && (nextProps.clientActivateSuccess || nextProps.clientDeactivateSuccess)) {
      nextProps.clientProfile(nextProps.params.id).catch(createError);
    }

    // Unlock Client
    if (!nextProps.loading && nextProps.clientUnlockSuccess ) {
      nextProps.clientProfile(nextProps.params.id).catch(createError);
      $('.msg').html('Client Successfully Unlocked').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      })
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
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (this.state.clientInfo) {
      closeLoading();
      return this.renderAdminInfo();
    } else {
       return this.loadingRender();
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
      validateUsername: this.props.validateUsername,
      clientUnlock: this.props.clientUnlock
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
