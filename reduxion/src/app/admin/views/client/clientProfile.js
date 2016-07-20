import React from 'react';
import ClientProfile from 'admin/components/client/clientProfile';
import DocTitle from 'common/components/docTitle';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import NotFound from 'common/components/noMatch';
import {createError} from 'utils/error';
import tr from 'i18next';

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
    this.props.adminClientSubscription(id).catch(createError);
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

    if (nextProps.cancelSubscription && !nextProps.loading) {
      $('.msg').html('Client Successfully cancel subscription').addClass('bg-green');
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
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.clientProfileSuccess) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.clientProfileSuccess).length && Object.keys(this.props.currentClientSubscription).length ) {
      closeLoading();
      return this.renderAdminInfo();
    } else {
       return this.loadingRender();
    }
  },
  renderAdminInfo() {
    let client = {
      clientInfo: this.props.clientProfileSuccess.data,
      clientApprove: this.props.clientApprove,
      clientDisapprove: this.props.clientDisapprove,
      clientActivate: this.props.clientActivate,
      clientDeactivate: this.props.clientDeactivate,
      clientUpdateProfile: this.props.clientUpdateProfile,
      updateCompleted: this.state.updateCompleted,
      validateUsername: this.props.validateUsername,
      clientUnlock: this.props.clientUnlock,
      currentClientSubscription: this.props.currentClientSubscription,
      adminClientSubscriptionCancel: this.props.adminClientSubscriptionCancel
    };
    let countryList = this.props.countryList;
    return (
      <div id="client_add">
        <DocTitle
          title={tr.t('CLIENT.DOC_TITLE_PROFILE')}
        />
        <div className="client-tab">
          <Link
            className="mdl-layout__tab"
            to="/coffee/client/">{tr.t('CLIENT.PAGE_TITLE.LIST')}</Link>
          <Link
            className='mdl-layout__tab'
            to="/coffee/client/new">{tr.t('CLIENT.PAGE_TITLE.ADD')}<i className="material-icons add">add</i></Link>
          <a className="mdl-layout__tab is-active" >{tr.t('CLIENT.PAGE_TITLE.VIEW')}<i className="material-icons add">edit</i></a>
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
