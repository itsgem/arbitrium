import React from 'react';
import DocTitle from 'common/components/docTitle';
import ClientInvoiceList from 'admin/components/invoice/clientInvoiceList';
import { Link } from 'react-router';

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
          title="Client Invoice List"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Client Invoice List</label>
        </div>
        <ClientInvoiceList
          clientInvoiceList={this.props.clientInvoiceList}
          adminClientInvoiceList={this.props.adminClientInvoiceList}
          />
      </div>
    );
  }
} );