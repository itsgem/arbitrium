import React from 'react';
import DocTitle from 'common/components/docTitle';
import InvoiceList from 'admin/components/invoice/invoiceList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminInvoiceList({per_page: 10});
  },
  render() {
    return (
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title="Invoice List"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/invoice/">Client Invoice List</Link>
          <a className="mdl-layout__tab is-active" >INVOICE LIST<i className="material-icons add">edit</i></a>
        </div>
        <InvoiceList
          invoiceList={this.props.invoiceList}
          adminInvoiceList={this.props.adminInvoiceList}
          />
      </div>
    );
  }
} );