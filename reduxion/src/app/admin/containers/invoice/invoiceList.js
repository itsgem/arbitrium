import { connect } from 'react-redux';
import { adminInvoiceList } from 'admin/reducers/invoice';
import ViewInvoiceList from 'admin/views/invoice/invoiceList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    invoiceList: strMapToObj(state.get('adminInvoice').get('invoiceList')),
    loading: state.get('adminInvoice').get('loading'),
    role: state.get('adminInvoice').get('role')
  };
}

export default connect(mapStateToProps, {
  adminInvoiceList
})(ViewInvoiceList)