import React from 'react';
import { Link } from 'react-router';
//import ApiList from 'client/components/api/apiList';

export default React.createClass({
  componentWillMount () {
  if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },
  render () {
    return (
      <main className="mdl-layout__content subscription-type">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Detail</p>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-grid content">
              <div className="mdl-cell mdl-cell--3-col">
                <ul className="arb-demo mdl-list">
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Monthly Subscription
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Annual Subscription
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Annual License Fee
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Initial Setup Fee
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Monthly Maintenance Fee
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Annual Maintenance Fee
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Transactions/Calls to the APIs
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      No. of Decisions Rendered
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Discounts/Free Transactions
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Testing
                    </span>
                  </li>
                  <li className="mdl-list__item">
                    <span className="mdl-list__item-primary-content">
                      Testing
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mdl-cell mdl-cell--9-col">
                <table className="mdl-data-table mdl-js-data-table table-list">
                  <thead>
                    <tr>
                      <th>Free Trial</th>
                      <th>Basic</th>
                      <th>Standard</th>
                      <th>Business</th>
                      <th>Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>30 days</td>
                      <td>$20.00</td>
                      <td>$40.00</td>
                      <td>$60.00</td>
                      <td>$80.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$80.00</td>
                      <td>$100.00</td>
                      <td>$120.00</td>
                      <td>$140.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$30.00</td>
                      <td>$40.00</td>
                      <td>$50.00</td>
                      <td>$60.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$40.00</td>
                      <td>$40.00</td>
                      <td>$40.00</td>
                      <td>$40.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$12.00</td>
                      <td>$40.00</td>
                      <td>$50.00</td>
                      <td>$80.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$30.00</td>
                      <td>$40.00</td>
                      <td>$50.00</td>
                      <td>$60.00</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>50</td>
                      <td>100</td>
                      <td>150</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>50</td>
                      <td>100</td>
                      <td>150</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td>$5.00</td>
                      <td>$6.00</td>
                      <td>$7.00</td>
                      <td>$8.00</td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                    </tr>
                    <tr>
                      <td>----</td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                      <td><i className="material-icons check">done</i></td>
                    </tr>
                    <tr>
                      <td><button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Subscribe Now</button></td>
                      <td><button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">Subscribed</button></td>
                      <td><button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Upgrade Now</button></td>
                      <td><button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Upgrade Now</button></td>
                      <td><button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Upgrade Now</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Payment Detail</p>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <form>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--6-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                    <input className="mdl-textfield__input font-input" type="text" id="subscription" value="Premium" disabled/>
                    <label className="mdl-textfield__label" htmlFor="sample1">Subscription...</label>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                    <input className="mdl-textfield__input font-input" type="text" id="currency" value="SGD" disabled/>
                    <label className="mdl-textfield__label" htmlFor="sample1">Currency...</label>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                  <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-focused is-upgraded full-width">
                    <select className="mdl-textfield__input">
                      <option value="">Annually</option>
                      <option selected>Monthly</option>
                    </select>
                    <label className="mdl-textfield__label" htmlFor="alt_gender">Terms of Subscription</label>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                    <input className="mdl-textfield__input font-input" type="text" id="valid-from" value="10/14/2015" disabled/><label className="mdl-textfield__label" htmlFor="sample1">Valid From...</label>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                    <input className="mdl-textfield__input font-input" type="text" id="valid-to" value="10/14/2016" disabled/> <label className="mdl-textfield__label" htmlFor="sample1">To...</label>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect padding-bot" htmlFor="checkbox-2">
                    <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input"/>
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
                  <span>
                    <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlhtmlFor="termsAgree">
                      <input type="checkbox" id="termsAgree" className="mdl-checkbox__input" />
                      <span className="mdl-checkbox__label">I agree to the Terms and Conditions</span>
                    </label>
                  </span>
                  <span>
                    <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Pay via Paypal</button>
                  </span>
                </div>
              </div>

            </form>
          </div>
        </div>
      </main>
    );
  }
});