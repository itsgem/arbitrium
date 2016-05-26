import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class SubscriptionPayment extends React.Component {
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
    this.dateValid();
  }
  render () {
    let subscriptionItem = this.props.subscriptionItem.data;
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <form>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                <input className="mdl-textfield__input font-input" type="text" id="subscription" value={subscriptionItem.name} readOnly/>
                <label className="mdl-textfield__label" htmlFor="subscription">Subscription Name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                <input className="mdl-textfield__input font-input" type="text" id="currency" value="USD" readOnly/>
                <label className="mdl-textfield__label" htmlFor="currency">Currency</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div id="term-opt" className={this.formClassNames('term', errors)}>
                <div className="mdl-selectfield">
                  <select onChange={(e) => this.dateValid()} id="term" ref="term" className="mdl-textfield__input">
                    <option></option>
                    <option>Annually</option>
                    <option>Monthly</option>
                  </select>
                  <label className="mdl-textfield__label" htmlFor="alt_gender">Terms of Subscription</label>
                  {errors && errors.term && <small className="mdl-textfield__error shown">{errors.term[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                <input className="mdl-textfield__input font-input" id="validFrom" type="text" ref="validFrom" readOnly/>
                <label className="mdl-textfield__label" htmlFor="validFrom">Valid From</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                <input className="mdl-textfield__input font-input" id="validTo" type="text" ref="validTo" readOnly/>
                <label className="mdl-textfield__label" htmlFor="validTo">To</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect padding-bot" htmlFor="checkbox-2">
                <input type="checkbox" id="checkbox-2" ref="isTerm" className="mdl-checkbox__input"/>
                <span className="mdl-checkbox__label">Auto-Renew</span>
              </label>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <h6>PAYMENT SUMMARY</h6>
            </div>
            <div className="mdl-cell mdl-cell--4-col box-container">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>PRICE COMPUTATION</h6>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>ANNUAL SUBSCRIPTION</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$140</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>ANNUAL LICENSE FEE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$60</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>INITIAL SETUP FEE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$60</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>ANNUAL MAINTENANCE FEE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$50</p>
                </div>
                <div className="mdl-grid total">
                  <div className="mdl-cell mdl-cell--9-col">
                    <p>SUB TOTAL</p>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                    <p className="right">$50</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col box-container">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>TAX COMPUTATION</h6>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>SUB TOTAL PRICE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$140</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>TAX PERCENTAGE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">7%</p>
                </div>
                <div className="mdl-grid total">
                  <div className="mdl-cell mdl-cell--9-col">
                    <p>COMPUTED TAX</p>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                    <p className="right">$50</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col box-container">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>OVERALL COMPUTATION</h6>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>SUBTOTAL PRICE</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$140</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>CREDITS</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$8</p>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                  <p>TAX</p>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <p className="right">$60</p>
                </div>
                <div className="mdl-grid total">
                  <div className="mdl-cell mdl-cell--9-col">
                    <p>TOTAL PRICE</p>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                    <p className="right">$50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--4-col"></div>
            <div className="mdl-cell mdl-cell--8-col footer-action">
              {/*<span>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect margin-right-10" htmlhtmlFor="termsAgree">
                  <input type="checkbox" id="checkbox-2" ref="is_api_call_restricted" className="mdl-checkbox__input" onClick={(e) => this.termConditions(e)}/>
                  <span className="mdl-checkbox__label">I agree to the Terms and Conditions</span>
                </label>
              </span>*/}
              <span>
                <button className="btn-paypal margin-left-0 mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"  onClick={(e) => this.subscribe(e)}>Pay via Paypal</button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  dateValid() {
    let term = this.refs.term.value;
    let dateToday = new Date();
    let isFrom = ' ';
    let newDate = ' ';
    let isTo = ' ';
    switch (term) {
      case 'Annually':
        isFrom = (dateToday.getMonth() + 1) + '/' + dateToday.getDate() + '/' +  dateToday.getFullYear();
        newDate = new Date(dateToday.getFullYear() + 1, dateToday.getMonth(), dateToday.getDate() + 29);
        isTo = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  (newDate.getFullYear());
        break;
      case 'Monthly':
        isFrom = (dateToday.getMonth() + 1) + '/' + dateToday.getDate() + '/' +  dateToday.getFullYear();
        newDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, dateToday.getDate());
        isTo = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  (newDate.getFullYear());
        break;
    }
    console.log('term', term);

    let target = this.refs.term.id + "-opt";
    if (this.refs.term.value) {
      if (document.getElementById(target)) {
        document.getElementById(target).classList.add('is-dirty');
      } else {
        document.getElementById(target).classList.remove('is-dirty');
      }
    }

    this.refs.validFrom.value = isFrom;
    this.refs.validTo.value = isTo;
  }
  termConditions(e) {
    if (e.target.checked) {
      document.querySelector('.btn-paypal').classList.add('mdl-button--blue');
      document.querySelector('.btn-paypal').classList.remove('mdl-button--disabled');
    } else {
      document.querySelector('.btn-paypal').classList.remove('mdl-button--blue');
      document.querySelector('.btn-paypal').classList.add('mdl-button--disabled');
    }
  }
  subscribe (e) {
    e.preventDefault();
    //if (this.refs.is_api_call_restricted.checked) {
    let payload = {
      subscription_id: this.props.params.id,
      term: (this.refs.isTerm.checked ? this.refs.term.value : 'Monthly')
    };

    if (this.refs.isTerm.checked ) {
      return this.validateTerm.call(this, payload)
        .with(this)
        .then(this.validSubscribe)
        .catch(this.setErrors);
    } else {
      this.validSubscribe(payload);
    }

    //}
  }
  validateTerm(payload) {
    let rules = new Checkit({
      subscription_id: [],
      term: [{ rule: 'required', label: 'term of subscription' }]
    });

    return rules.run(payload);
  }

  validSubscribe(payload) {
    this.props.clientPurchaseSubscription(payload);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
};

SubscriptionPayment.mixins = [LinkedStateMixin];
SubscriptionPayment.defaultProps = {
    errors: []
};
export default SubscriptionPayment;