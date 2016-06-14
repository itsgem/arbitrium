import { connect } from 'react-redux';
import { adminClientInvoiceList } from 'admin/reducers/invoice';
import ViewClientInvoiceList from 'admin/views/invoice/clientInvoiceList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientInvoiceList: strMapToObj(state.get('adminInvoice').get('clientInvoiceList')),
    loading: state.get('adminInvoice').get('loading'),
    role: state.get('adminInvoice').get('role')
  };
}

export default connect(mapStateToProps, {
  adminClientInvoiceList
})(ViewClientInvoiceList)