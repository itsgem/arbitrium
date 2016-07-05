import React from 'react';
import InvoiceList from 'client/components/invoice/invoiceList';
import { openLoading } from 'common/components/modal';
import { createError } from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.clientInvoiceList().catch(createError);
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <InvoiceList
            listInvoice={this.props.listInvoice}
            clientInvoiceList={this.props.clientInvoiceList}
          />
        </div>
      </main>
    );
  }
});