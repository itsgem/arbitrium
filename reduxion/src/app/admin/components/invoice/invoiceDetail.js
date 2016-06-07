import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      permissions: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  componentDidMount () {

  }
  loadingRender () {
    return (
      <div className="loading"></div>
    );
  }
  scrolltop (errors) {
    if (!document.querySelector('.alert')) {
      return false;
    }
    if (Object.keys(errors).length) {
      document.querySelector('.alert').style.display = 'block';
      let target = document.getElementById('top');
      let scrollContainer = target;
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);

      let targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);

      let scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    } else {
      document.querySelector('.alert').style.display = 'none';
    }
  }
  render () {
    let adminInvoiceDetail = this.props.adminInvoiceDetail.data;
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    this.scrolltop(errors);

    return (
      <div className="mdl-layout__content mdl-js-layout">
        <div className="mdl-grid table-list-container">
          <div className="mdl-layout__panel is-active" id="#">
            <div className="content-container">
              <div className="mdl-grid content">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6 className="right-align">BILLING INVOICE</h6>
                  <br/>
                  <p className="right-align">Arbitrium Group</p>
                  <p className="right-align">1234 Lorem Street, Ipsum City, NM 123456</p>
                  <br/>
                  <h6>Other Information:</h6>
                  <br/>
                  <p>Johnny Doe</p>
                  <p>Client Company</p>
                  <p>4321 Client Ave., Client City, NM 123456</p>
                  <br/>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Invoice No.: <span className="invoice-value">000000000001</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Invoice Date: <span className="invoice-value">07/02/2016</span></p>
                  <br/>
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>PRODUCTS AND SERVICES PURCHASED</h6>
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <table className="mdl-data-table mdl-js-data-table table-list">
                    <thead>
                      <tr>
                        <th className="left-align">Name</th>
                        <th className="left-align">Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="left-align">Subsription-Standard</td>
                        <td className="left-align">Subsription</td>
                        <td>1</td>
                        <td>$100.00</td>
                        <td>$5.00</td>
                        <td>$95.00</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h6 className="no-margin">OVERALL TOTAL</h6></td>
                        <td><h6 className="no-margin">USD $95.00</h6></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <p><i className="note">This is an Electronic invoice. No signature is required.</i></p>
                </div>
                <div className="mdl-cell mdl-cell--12-col top-margin20">
                  <h6>Banking Details:</h6>
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <p>Account Name: <span className="invoice-value">Johnny Doe</span></p>
                  <p>Bank: <span className="invoice-value">Bank of Lorem</span></p>
                  <p>Account No.: <span className="invoice-value">000123456789</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Bank Code: <span className="invoice-value">7171</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Branch Code: <span className="invoice-value">081</span></p>
                </div>
                <div className="mdl-cell mdl-cell--12-col cta-bottom">
                  <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent btn-margin-right"><i className="material-icons">description</i>GENERATE PDF</button>
                  <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"><i className="material-icons">mail</i>SEND TO EMAIL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  setErrors(e) {
    this.setState(createError(e));
  }
};

InvoiceDetail.mixins = [LinkedStateMixin];
InvoiceDetail.defaultProps = {
    errors: []
};
export default InvoiceDetail;