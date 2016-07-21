import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import InvoiceList from 'client/components/invoice/invoiceList';
import { openLoading, closeLoading } from 'common/components/modal';
import { createError } from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.clientInvoiceList().catch(createError);
  },
  loadingRender () {
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (this.props.loading) {
      openLoading();
    } else {
      closeLoading();
    }

    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <DocTitle
          title={tr.t('CLIENT_INVOICE.INVOICE_LIST.DOC_TITLE')}
        />
        { this.loadingRender() }
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