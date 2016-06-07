import React from 'react';
import { Link } from 'react-router';
import InvoiceDetail from 'admin/components/invoice/invoiceDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    let id = this.props.params.subscription_id;
    this.props.adminInvoiceDetail(this.props.params.client_id).catch(createError);
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
      this.context.router.push('/coffee/invoice');
    }
  },
  render() {
    if (!this.props.loading) {
      closeLoading();
    } else {
      openLoading();
    }
    return this.renderInvoiceDetail();
  },
  renderInvoiceDetail () {
    return (
      <div id="client_add" className="auth-view">
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/invoice/">Client Invoice List</Link>
          <Link
            className='mdl-layout__tab'
            to={"/coffee/invoice/client/" + this.props.params.client_id}>Invoice List</Link>
          <a className="mdl-layout__tab is-active" >INVOICE DETAIL<i className="material-icons add">edit</i></a>
        </div>
        <InvoiceDetail
          params = {this.props.params}
          adminInvoiceDetail = {this.props.invoiceDetail}
        />
      </div>
    );
  }
});