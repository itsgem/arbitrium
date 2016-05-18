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
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col footer-action">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Pay</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }
});