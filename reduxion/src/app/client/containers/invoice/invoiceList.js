import { connect } from 'react-redux'
import { clientInvoiceList } from 'client/reducers/invoice'
import InvoiceList from 'client/views/invoice/invoiceList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('CLientInvoice').get('loading'),
  listInvoice: strMapToObj(state.get('CLientInvoice').get('listInvoice'))
});

export default connect((mapStateToProps), {
  clientInvoiceList
})(InvoiceList)
