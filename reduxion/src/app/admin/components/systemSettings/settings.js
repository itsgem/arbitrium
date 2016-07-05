import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import {openLoading} from 'common/components/modal'

class SystemSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
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
    let adminSystemSettings = {};
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    this.scrolltop(errors);

    if (Object.keys(this.props.adminSystemSettings).length) {
      adminSystemSettings = this.props.adminSystemSettings.data;
    }

    return (
      <div className="page-content">
        { this.loadingRender() }
        <form method="post">
          <div className="required">Required fields</div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <legend>General Information</legend>
              <p>The contents appear below this section are placeholder content to show the actual layout of the section. The contents will be replaced later on.</p>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_company_name', errors)}>
                <input className="mdl-textfield__input" type="text" id="company_name" ref="company_name" defaultValue={adminSystemSettings.kcg_company_name.value}/>
                <label className="mdl-textfield__label">Company Name *</label>
                {errors.kcg_company_name && <small className="mdl-textfield__error shown">{errors.kcg_company_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_street_address', errors)}>
                <input className="mdl-textfield__input" type="text" id="street_address" ref="street_address" defaultValue={adminSystemSettings.kcg_street_address.value}/>
                <label className="mdl-textfield__label">Billing Info *</label>
                {errors.kcg_street_address && <small className="mdl-textfield__error shown">{errors.kcg_street_address[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_city', errors)}>
                <input className="mdl-textfield__input" type="text" id="city" ref="city" defaultValue={adminSystemSettings.kcg_city.value}/>
                <label className="mdl-textfield__label">City *</label>
                {errors.kcg_city && <small className="mdl-textfield__error shown">{errors.kcg_city[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_state', errors)}>
                <input className="mdl-textfield__input" type="text" id="state" ref="state" defaultValue={adminSystemSettings.kcg_state.value}/>
                <label className="mdl-textfield__label">State *</label>
                {errors.kcg_state && <small className="mdl-textfield__error shown">{errors.kcg_state[0]}</small>}
              </div>
            </div>

            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_country', errors)}>
                <input className="mdl-textfield__input" type="text" id="country" ref="country" defaultValue={adminSystemSettings.kcg_country.value}/>
                <label className="mdl-textfield__label">Country *</label>
                {errors.kcg_country && <small className="mdl-textfield__error shown">{errors.kcg_country[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_postal_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="postal_code" ref="postal_code" defaultValue={adminSystemSettings.kcg_postal_code.value}/>
                <label className="mdl-textfield__label">Postal Code *</label>
                {errors.kcg_postal_code && <small className="mdl-textfield__error shown">{errors.kcg_postal_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_admin_email', errors)}>
                <input className="mdl-textfield__input" type="text" id="admin_email" ref="admin_email" defaultValue={adminSystemSettings.kcg_admin_email.value}/>
                <label className="mdl-textfield__label">Admin Email *</label>
                {errors.kcg_admin_email && <small className="mdl-textfield__error shown">{errors.kcg_admin_email[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('reset_token_expiry', errors)}>
                <input className="mdl-textfield__input" type="text" id="token_expiry" ref="token_expiry" defaultValue={adminSystemSettings.reset_token_expiry.value}/>
                <label className="mdl-textfield__label">Token Expiry *</label>
                {errors.reset_token_expiry && <small className="mdl-textfield__error shown">{errors.reset_token_expiry[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('items_per_page', errors)}>
                <input className="mdl-textfield__input" type="text" id="items_per_page" ref="items_per_page" defaultValue={adminSystemSettings.items_per_page.value}/>
                <label className="mdl-textfield__label">Items Per Page *</label>
                {errors.items_per_page && <small className="mdl-textfield__error shown">{errors.items_per_page[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                <p>Other settings textfield 1</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('kcg_swift_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="swift_code" ref="swift_code" defaultValue={adminSystemSettings.kcg_swift_code.value}/>
                <label className="mdl-textfield__label">Other settings 1 *</label>
                {errors.kcg_swift_code && <small className="mdl-textfield__error shown">{errors.kcg_swift_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                <p>Other settings textfield 2</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('kcg_branch_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="branch_code" ref="branch_code" defaultValue={adminSystemSettings.kcg_branch_code.value}/>
                <label className="mdl-textfield__label">Other settings 2 *</label>
                {errors.kcg_branch_code && <small className="mdl-textfield__error shown">{errors.kcg_branch_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <legend>Billing Information</legend>
              <p>The contents appear below this section are placeholder content to show the actual layout of the section. The contents will be replaced later on.</p>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_account_name', errors)}>
                <input className="mdl-textfield__input" type="text" id="account_name" ref="account_name" defaultValue={adminSystemSettings.kcg_account_name.value}/>
                <label className="mdl-textfield__label">Account Name *</label>
                {errors.kcg_account_name && <small className="mdl-textfield__error shown">{errors.kcg_account_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_credit_to', errors)}>
                <input className="mdl-textfield__input" type="text" id="credit_to" ref="credit_to" defaultValue={adminSystemSettings.kcg_credit_to.value}/>
                <label className="mdl-textfield__label">Credit To *</label>
                {errors.kcg_credit_to && <small className="mdl-textfield__error shown">{errors.kcg_credit_to[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_bank_account', errors)}>
                <input className="mdl-textfield__input" type="text" id="bank_account" ref="bank_account" defaultValue={adminSystemSettings.kcg_bank_account.value}/>
                <label className="mdl-textfield__label">Bank Account *</label>
                {errors.kcg_bank_account && <small className="mdl-textfield__error shown">{errors.kcg_bank_account[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_bank_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="bank_code" ref="bank_code" defaultValue={adminSystemSettings.kcg_bank_code.value}/>
                <label className="mdl-textfield__label">Bank Account Code *</label>
                {errors.kcg_bank_code && <small className="mdl-textfield__error shown">{errors.kcg_bank_code[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <button className="mdl-button mdl-button--accent" id="btn_save" type="button" onClick={(e) => this.save(e)}>Save</button>
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
  save ( e ) {
    e.preventDefault();
    this.setState( {
      errors: {},
      errorServer: null
    } );
    let {company_name, street_address, city, state, country, postal_code, admin_email, token_expiry,
      items_per_page, swift_code, branch_code, account_name, credit_to, bank_account, bank_code} = this.refs;

    let payload = {
          kcg_company_name: company_name.value,
          kcg_street_address: street_address.value,
          kcg_city: city.value,
          kcg_state: state.value,
          kcg_country: country.value,
          kcg_postal_code: postal_code.value,
          kcg_admin_email: admin_email.value,
          reset_token_expiry: token_expiry.value,
          items_per_page: items_per_page.value,
          kcg_swift_code: swift_code.value,
          kcg_branch_code: branch_code.value,
          kcg_account_name: account_name.value,
          kcg_credit_to: credit_to.value,
          kcg_bank_account: bank_account.value,
          kcg_bank_code: bank_code.value
    }
    window.componentHandler.upgradeDom();
    return this.validateSave.call( this, payload )
      .with( this )
      .then( this.saveSettings )
      .catch( this.setErrors );
  }
  validateSave ( payload) {
    let rules = new Checkit( {
      kcg_company_name: { rule: 'required', label: 'company name'},
      kcg_street_address: { rule: 'required', label: 'billing info'},
      kcg_city: { rule: 'required', label: 'city'},
      kcg_state: { rule: 'required', label: 'state'},
      kcg_country: { rule: 'required', label: 'country'},
      kcg_postal_code: { rule: 'required', label: 'postal code'},
      kcg_admin_email: { rule: 'required', label: 'E-mail'},
      reset_token_expiry: { rule: 'required', label: 'token expiry'},
      items_per_page: { rule: 'required', label: 'item per page'},
      kcg_swift_code: { rule: 'required', label: 'Other settings'},
      kcg_branch_code: { rule: 'required', label: 'Other settings'},
      kcg_account_name: { rule: 'required', label: 'account name'},
      kcg_credit_to: { rule: 'required', label: 'credit to'},
      kcg_bank_account: { rule: 'required', label: 'bank account'},
      kcg_bank_code: { rule: 'required', label: 'bank account code'}
    } );
    return rules.run( payload );
  }
  saveSettings (payload) {
    openLoading();
    let errors = {};
    this.setState({
      errors: {},
      errorServer:null
    });
    this.scrolltop(errors);

    return this.props.saveSystemSettings(payload);
  }
  setErrors(e) {
    this.setState(createError(e));
  }
};

SystemSettings.mixins = [LinkedStateMixin];
SystemSettings.defaultProps = {
    errors: []
};
export default SystemSettings;