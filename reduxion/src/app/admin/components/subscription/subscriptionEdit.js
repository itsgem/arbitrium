import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

class SubscriptionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      permissions: {}
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let subscriptions = {};
    let clientSubscriptionInfo = {};
    let clientInfo = {};
    subscriptions = this.props.allSubscriptions.data;
    clientSubscriptionInfo = this.props.clientSubscriptionInfo.data;
    clientInfo = this.props.clientProfile.data;

    return (
      <div className="mdl-grid table-list-container">
        <div className="mdl-layout__panel is-active subscription-detail" id="#">
          <div className="content-container">
            <div className="mdl-cell mdl-cell--12-col">
              <div className="mdl-grid content">
                <div className="mdl-cell mdl-cell--3-col text-content">
                  <ul className="arb-demo mdl-list">
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.MONTHLY_SUBSCRIPTION')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.ANNUAL_SUBSCRIPTION')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.ANNUAL_LICENSE_FEE')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.INITIAL_SETUP_FEE')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.MONTHLY_MAINTENANCE_FEE')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.ANNUAL_MAINTENANCE_FEE')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.TRANSACTIONS')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.DECISIONS_RENDERED')}
                      </span>
                    </li>
                    <li className="mdl-list__item">
                      <span className="mdl-list__item-primary-content">
                        {tr.t('ADMIN_SUBSCRIPTION.LABEL.DISCOUNTS')}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mdl-cell mdl-cell--9-col pricing-content">
                  {
                    subscriptions.map(item => {
                      return <table key={item.id} style={{width: '20%', float: 'left'}} className="mdl-data-table mdl-js-data-table table-list">
                        <thead>
                          <tr>
                            <th>{item.name}</th>
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
                            <td>{item.max_api_calls == 0.00 ? '--' : item.max_api_calls}</td>
                          </tr>
                          <tr>
                            <td>{item.max_decisions == 0.00 ? '--' : item.max_decisions}</td>
                          </tr>
                          <tr>
                            <td>{item.discounts == 0.00 ? '--' : "$" + item.discounts } </td>
                          </tr>
                          <tr>
                            <td style={(clientInfo.can_avail_trial == false && clientSubscriptionInfo.name != 'Free Trial') ? {height : '60px'} : {height : '48px'}}>
                              {
                                item.name == 'Free Trial' ? (clientInfo.can_avail_trial == false ?
                                  (clientSubscriptionInfo.name != 'Free Trial' ? '' :
                                    <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">{tr.t('BUTTON.SUBSCRIBED')}</button>)
                                  : <Link className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent" to={ "/coffee/subscription/client/" + clientSubscriptionInfo.client_id + "/detail/" + item.id}>{tr.t('BUTTON.SUBSCRIBE')}</Link> )
                                : clientSubscriptionInfo.subscription_id == item.id ?
                                  <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--disabled">{tr.t('BUTTON.SUBSCRIBED')}</button>
                                  : <Link className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent" to={ "/coffee/subscription/client/" + clientSubscriptionInfo.client_id + "/detail/" + item.id}>{clientSubscriptionInfo.subscription_id ? (item.name == 'Free Trial' ? tr.t('BUTTON.SUBSCRIBE') : tr.t('BUTTON.UPGRADE')) : tr.t('BUTTON.SUBSCRIBED')}</Link>
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
          </div>
        </div>
      </div>
    );
  }
};

SubscriptionEdit.mixins = [LinkedStateMixin];
SubscriptionEdit.defaultProps = {
    errors: []
};
export default SubscriptionEdit;