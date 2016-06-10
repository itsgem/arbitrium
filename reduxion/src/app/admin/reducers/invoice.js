/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminClientInvoiceList = createActionAsync('ADMIN_CLIENT_INVOICE_LIST', auth.adminGetClientInvoices);
export const adminInvoiceList = createActionAsync('ADMIN_INVOICE_LIST', auth.adminGetInvoicesPerClient);
export const adminInvoiceDetail = createActionAsync('ADMIN_INVOICE_DETAIL', auth.adminGetSelectedInvoice);
export const adminInvoiceDetailSendEmail = createActionAsync('ADMIN_INVOICE_DETAIL_SEND_MAIL', auth.adminInvoiceSendEmail);

const initialState = Immutable.fromJS({
  clientInvoiceList: {},
  invoiceList: {},
  invoiceDetail: {},
  loading: false,
  successMailSent: false
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
    loading: false,
    successMailSent: false
  }),
  [adminInvoiceDetail.request]: (state) => state.merge({
    loading: true,
    successMailSent: false
  }),
  [adminInvoiceDetailSendEmail.ok]: (state, payload) => state.merge({
    loading: false,
    successMailSent: true
  }),
  [adminInvoiceDetailSendEmail.request]: (state) => state.merge({
    loading: true,
    successMailSent: false
  })

}, initialState);
