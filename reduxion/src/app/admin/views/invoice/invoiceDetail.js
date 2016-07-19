import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import InvoiceDetail from 'admin/components/invoice/invoiceDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';
import NotFound from 'common/components/noMatch';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    let id = this.props.params.id;
    this.props.adminInvoiceDetail(id).catch(createError);
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    if (nextProps.successMailSent) {
      $('.msg').html('Successfully sent invoice to your email.').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(5000);
      });
      this.context.router.push('/coffee/invoice');
    }
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.invoiceDetail) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.invoiceDetail).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderInvoiceDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderInvoiceDetail () {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_INVOICE.INVOICE_DETAIL.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/invoice/">{tr.t('ADMIN_INVOICE.CLIENT_INVOICE_LIST.TITLE')}</Link>
          <Link
            className='mdl-layout__tab'
            to={"/coffee/invoice/client/" + this.props.params.client_id}>{tr.t('ADMIN_INVOICE.INVOICE_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_INVOICE.INVOICE_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <InvoiceDetail
          params = {this.props.params}
          adminInvoiceDetail = {this.props.invoiceDetail}
          adminInvoiceDetailSendEmail = {this.props.adminInvoiceDetailSendEmail}
          successMailSent={this.props.successMailSent}
          loading={this.props.loading}
        />
      </div>
    );
  }
});