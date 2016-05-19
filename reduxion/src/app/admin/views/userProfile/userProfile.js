import React from 'react';
import DocTitle from 'common/components/docTitle';
import UserProfile from 'admin/components/userProfile/userProfile';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin();
    this.props.adminProfile();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.adminUpdate && !nextProps.loading) {
      this.props.adminProfile();
      $('.msg').html('Admin User Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/profile');
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (Object.keys(this.props.adminProfileInfo).length && Object.keys(this.props.role).length) {
      closeLoading();
      return this.renderProfile();
    } else {
      return this.loadingRender();
    }
  },
  renderProfile() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="My Profile"
        />
        <div className="client-tab">
          <a className="mdl-layout__tab is-active">Admin Profile</a>
        </div>
        <UserProfile
          adminProfileInfo={this.props.adminProfileInfo}
          validateUsername={this.props.validateUsername}
          role={this.props.role}
          validateCompleted={this.props.validateCompleted}
          adminProfileUpdate={this.props.adminProfileUpdate}
        />
      </div>
    );
  }
} );