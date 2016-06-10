import { connect } from 'react-redux'
import { clientInvoiceDetails } from 'client/reducers/invoice'
import InvoiceDetails from 'client/views/invoice/invoiceDetails';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('CLientInvoice').get('loading'),
  listInvoice: strMapToObj(state.get('CLientInvoice').get('listInvoice')),
  invoiceInfo: strMapToObj(state.get('CLientInvoice').get('invoiceInfo'))
});

export default connect((mapStateToProps), {
  clientInvoiceDetails
})(InvoiceDetails)
