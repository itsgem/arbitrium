import React from 'react';
import { Link } from 'react-router';
import LogDetail from 'admin/components/logs/logDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.adminLogDetail(this.props.params.client_id).catch(createError);
  },
  componentWillMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.purchaseSuccess) {
      $('.msg').html('Successfully sent approval URL to client to complete the subscription change.').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(5000);
      });
      this.context.router.push('/coffee/logs');
    }
  },
  render() {
    if (!this.props.loading) {
      closeLoading();
    } else {
      openLoading();
    }
    return this.renderLogDetail();
  },
  renderLogDetail () {
    return (
      <div id="client_add" className="auth-view">
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/logs/">Logs List</Link>
          <a className="mdl-layout__tab is-active" >LOG DETAIL<i className="material-icons add">edit</i></a>
        </div>
        <LogDetail
          params = {this.props.params}
          adminLogDetail = {this.props.logDetail}
        />
      </div>
    );
  }
});