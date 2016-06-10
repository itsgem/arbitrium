/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientInvoiceList = createActionAsync('CLIENT_INVOICE_LIST', auth.clientInvoiceList);
export const clientInvoiceDetails = createActionAsync('CLIENT_INVOICE_INFO', auth.clientInvoiceDetails);

const initialState = Immutable.fromJS({
  loading: false,
  listInvoice: {},
  invoiceInfo: {},
});

export default createReducer({
  [clientInvoiceList.ok]: (state, payload) => state.merge({
    loading: false,
    listInvoice: payload
  }),
  [clientInvoiceList.request]: (state) => state.merge({
    loading: true,
  }),
  [clientInvoiceDetails.ok]: (state, payload) => state.merge({
    loading: false,
    invoiceInfo: payload
  }),
  [clientInvoiceDetails.request]: (state) => state.merge({
    loading: true,
  }),
}, initialState);
