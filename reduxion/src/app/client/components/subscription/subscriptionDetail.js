import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class SubscriptionDetail extends React.Component {
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
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    let listSubscription = this.props.listSubscription.data;
    let currentSubscription = this.props.currentSubscription.data;
    console.log('test', currentSubscription);
    return (
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
              </ul>
            </div>
           
            <div className="mdl-cell mdl-cell--9-col">
              {
                listSubscription.map(item => {
                  return <table key={item.id} style={{'width': 'auto', 'float': 'left'}} className="mdl-data-table mdl-js-data-table table-list">
                    <thead>
                      <tr>
                        <th>{item.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.fee_monthly == 0.00 ? '--' : item.fee_monthly}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly == 0.00 ? '--' : item.fee_yearly}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly_license == 0.00 ? '--' : item.fee_yearly_license}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_initial_setup == 0.00 ? '--' : item.fee_initial_setup }</td>
                      </tr>
                      <tr>
                        <td>{item.fee_monthly_maintenance == 0.00 ? '--' : item.fee_monthly_maintenance}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly_maintenance == 0.00 ? '--' : item.fee_yearly_maintenance}</td>
                      </tr>
                      <tr>
                        <td>{item.max_api_calls == 0.00 ? '--' : item.max_api_calls}</td>
                      </tr>
                      <tr>
                        <td>{item.max_decisions == 0.00 ? '--' : item.max_decisions}</td>
                      </tr>
                      <tr>
                        <td>{item.discounts == 0.00 ? '--' : item.discounts } </td>
                      </tr>
                      <tr>
                        <td>
                          { 
                            currentSubscription.subscription_id == item.id ?
                            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">Subscribed</button>
                            : <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent" onClick={(e) => this.subscribed(e)}>Upgrade</button>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                } )
              }
                {/*<table className="mdl-data-table mdl-js-data-table table-list">
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
                </table>*/}
              </div>
          </div>
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col footer-action">
            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Pay</button>
          </div>
        </div>
      </div>
    );
  }
  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
  subscribed (e) {
    alert();
  }
};

SubscriptionDetail.mixins = [LinkedStateMixin];
SubscriptionDetail.defaultProps = {
    errors: []
};
export default SubscriptionDetail;