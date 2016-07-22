import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import InvoiceDetails from 'client/components/invoice/invoiceDetails';
import NotFound from 'common/components/noMatch';
import { openLoading, closeLoading } from 'common/components/modal'
import { createError } from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    let id = this.props.params.id;
    this.props.clientInvoiceDetails(id).catch(createError);
  },
  componentWillReceiveProps () {
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
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.invoiceInfo) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.invoiceInfo).length) {
      return this.renderInvoiceInfo();
    } else {
      return this.loadingRender();
    }
  },
  renderInvoiceInfo() {
    return (
      <main className="mdl-layout__content">
        <DocTitle
          title={tr.t('CLIENT_INVOICE.INVOICE_DETAIL.DOC_TITLE')}
        />
        <div className="mdl-grid mdl-grid--no-spacing table-list-container content-container">
          <InvoiceDetails
            invoiceInfo={this.props.invoiceInfo}
            clientInvoiceSendMail={this.props.clientInvoiceSendMail}
            successMailSent={this.props.successMailSent}
            loading={this.props.loading}
          />
        </div>
      </main>
    );
  }
});