import React from 'react';
import { Link } from 'react-router';
import InvoiceDetails from 'client/components/invoice/invoiceDetails';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    let id = this.props.params.id;
    this.props.clientInvoiceDetails(id).catch(createError);
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
          />
        </div>
      </main>
    );
  }
});