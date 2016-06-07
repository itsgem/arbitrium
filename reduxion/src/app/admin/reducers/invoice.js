/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminClientInvoiceList = createActionAsync('ADMIN_CLIENT_INVOICE_LIST', auth.getAdminSubscriptionList);
export const adminInvoiceList = createActionAsync('ADMIN_INVOICE_LIST', auth.getAdminSubscriptionList);
export const adminInvoiceDetail = createActionAsync('ADMIN_INVOICE_DETAIL', auth.getAdminSubscriptionList);

const initialState = Immutable.fromJS({
  clientInvoiceList: {},
  invoiceList: {},
  invoiceDetail: {},
  loading: false
});

export default createReducer({
  [adminClientInvoiceList.ok]: (state, payload) => state.merge({
    clientInvoiceList: state.concat(payload),
    loading: false
  }),
  [adminClientInvoiceList.request]: (state) => state.merge({
    loading: true
  }),
  [adminInvoiceList.ok]: (state, payload) => state.merge({
    invoiceList: state.concat(payload),
    loading: false
  }),
  [adminInvoiceList.request]: (state) => state.merge({
    loading: true
  }),
  [adminInvoiceDetail.ok]: (state, payload) => state.merge({
    invoiceDetail: state.concat(payload),
    loading: false
  }),
  [adminInvoiceDetail.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
