import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let listSubscription = this.props.listSubscription.data;
    let currentSubscription = this.props.currentSubscription.data;
    let clientInfo = this.props.clientInfo.data;
    return (
        <div className="mdl-cell mdl-cell--12-col subscription-detail">
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
                  return <table key={item.id} style={{width: '20%', float: 'left'}} className="mdl-data-table mdl-js-data-table table-list">
                    <thead>
                      <tr>
                        <th>{item.type == 'Trial' ? "Free Trial" : item.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.fee_monthly == 0.00 ? '--' : "$" + item.fee_monthly}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly == 0.00 ? '--' : "$" + item.fee_yearly}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly_license == 0.00 ? '--' : "$" + item.fee_yearly_license}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_initial_setup == 0.00 ? '--' : "$" + item.fee_initial_setup }</td>
                      </tr>
                      <tr>
                        <td>{item.fee_monthly_maintenance == 0.00 ? '--' : "$" + item.fee_monthly_maintenance}</td>
                      </tr>
                      <tr>
                        <td>{item.fee_yearly_maintenance == 0.00 ? '--' : "$" + item.fee_yearly_maintenance}</td>
                      </tr>
                      <tr>
                        <td>{item.max_api_calls == 0.00 ? '--' : "$" + item.max_api_calls}</td>
                      </tr>
                      <tr>
                        <td>{item.max_decisions == 0.00 ? '--' : "$" + item.max_decisions}</td>
                      </tr>
                      <tr>
                        <td>{item.discounts == 0.00 ? '--' : "$" + item.discounts }</td>
                      </tr>
                      <tr>
                        <td style={(clientInfo.can_avail_trial == false && currentSubscription.name != 'Free Trial') ? {height : '60px'} : {height : '48px'}}>
                          {
                            item.type == 'Trial' ? (clientInfo.can_avail_trial == false ?
                              (currentSubscription.name != 'Free Trial' ? '' :
                                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">Subscribed</button>)
                              : <Link className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent" to={ "/i/subscription/" + item.id}>Subscribe</Link> )
                            : currentSubscription.subscription_id == item.id ?
                                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">Subscribed</button>
                              : <Link className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent" to={ "/i/subscription/" + item.id}>{currentSubscription.subscription_id ? 'Upgrade' : 'Subscribe'}</Link>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                } )
              }
            </div>
          </div>
      </div>
    );
  }
};

SubscriptionDetail.mixins = [LinkedStateMixin];
SubscriptionDetail.defaultProps = {
    errors: []
};
export default SubscriptionDetail;