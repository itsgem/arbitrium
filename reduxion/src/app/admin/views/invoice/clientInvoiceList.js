import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import ClientInvoiceList from 'admin/components/invoice/clientInvoiceList';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminClientInvoiceList({per_page: 10});
  },
  render() {
    return (
      <div id="log_add_or_change">
        <DocTitle
          title={tr.t('ADMIN_INVOICE.CLIENT_INVOICE_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('ADMIN_INVOICE.CLIENT_INVOICE_LIST.FORM.TITLE')}</label>
        </div>
        <ClientInvoiceList
          clientInvoiceList={this.props.clientInvoiceList}
          adminClientInvoiceList={this.props.adminClientInvoiceList}
          />
      </div>
    );
  }
} );