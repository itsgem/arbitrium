import { connect } from 'react-redux'
import { adminInvoiceDetail } from 'admin/reducers/invoice'
import InvoiceDetail from 'admin/views/invoice/invoiceDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	invoiceDetail: strMapToObj(state.get('adminInvoice').get('invoiceDetail')),
    loading: state.get('adminInvoice').get('loading')
  };
}

export default connect((mapStateToProps), {
  adminInvoiceDetail
})(InvoiceDetail)
