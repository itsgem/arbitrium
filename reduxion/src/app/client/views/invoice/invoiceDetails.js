import React from 'react';
import InvoiceDetails from 'client/components/invoice/invoiceDetails';
import { openLoading } from 'common/components/modal'
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
  render() {
    if (Object.keys(this.props.invoiceInfo).length) {
      return this.renderInvoiceInfo();
    } else {
      return this.loadingRender();
    }
  },
  renderInvoiceInfo() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container table-invoice">
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