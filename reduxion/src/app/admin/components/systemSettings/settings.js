import React from 'react';
import tr from 'i18next';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

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
              <legend>{tr.t('ADMIN_SYSTEM_SETTINGS.FORM.GENERAL_INFORMATION')}</legend>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_company_name', errors)}>
                <input className="mdl-textfield__input" type="text" id="company_name" ref="company_name" defaultValue={adminSystemSettings.kcg_company_name.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.COMPANY_NAME_REQ')}</label>
                {errors.kcg_company_name && <small className="mdl-textfield__error shown">{errors.kcg_company_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_street_address', errors)}>
                <input className="mdl-textfield__input" type="text" id="street_address" ref="street_address" defaultValue={adminSystemSettings.kcg_street_address.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.BILLING_INFORMATION_REQ')}</label>
                {errors.kcg_street_address && <small className="mdl-textfield__error shown">{errors.kcg_street_address[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_city', errors)}>
                <input className="mdl-textfield__input" type="text" id="city" ref="city" defaultValue={adminSystemSettings.kcg_city.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.CITY_REQ')}</label>
                {errors.kcg_city && <small className="mdl-textfield__error shown">{errors.kcg_city[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_state', errors)}>
                <input className="mdl-textfield__input" type="text" id="state" ref="state" defaultValue={adminSystemSettings.kcg_state.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.STATE_REQ')}</label>
                {errors.kcg_state && <small className="mdl-textfield__error shown">{errors.kcg_state[0]}</small>}
              </div>
            </div>

            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_country', errors)}>
                <input className="mdl-textfield__input" type="text" id="country" ref="country" defaultValue={adminSystemSettings.kcg_country.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.COUNTRY_REQ')}</label>
                {errors.kcg_country && <small className="mdl-textfield__error shown">{errors.kcg_country[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('kcg_postal_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="postal_code" ref="postal_code" defaultValue={adminSystemSettings.kcg_postal_code.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.POSTAL_CODE_REQ')}</label>
                {errors.kcg_postal_code && <small className="mdl-textfield__error shown">{errors.kcg_postal_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('kcg_admin_email', errors)}>
                <input className="mdl-textfield__input" type="text" id="admin_email" ref="admin_email" defaultValue={adminSystemSettings.kcg_admin_email.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.ADMIN_EMAIL_REQ')}</label>
                {errors.kcg_admin_email && <small className="mdl-textfield__error shown">{errors.kcg_admin_email[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('reset_token_expiry', errors)}>
                <input className="mdl-textfield__input" type="text" id="token_expiry" ref="token_expiry" defaultValue={adminSystemSettings.reset_token_expiry.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.TOKEN_EXPIRY_REQ')}</label>
                {errors.reset_token_expiry && <small className="mdl-textfield__error shown">{errors.reset_token_expiry[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('items_per_page', errors)}>
                <input className="mdl-textfield__input" type="text" id="items_per_page" ref="items_per_page" defaultValue={adminSystemSettings.items_per_page.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.ITEMS_PER_PAGE_REQ')}</label>
                {errors.items_per_page && <small className="mdl-textfield__error shown">{errors.items_per_page[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                <p>{tr.t('LABEL.OTHER_SETTINGS01_REQ')}</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('kcg_swift_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="swift_code" ref="swift_code" defaultValue={adminSystemSettings.kcg_swift_code.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.OTHER_SETTINGS01')}</label>
                {errors.kcg_swift_code && <small className="mdl-textfield__error shown">{errors.kcg_swift_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                <p>{tr.t('LABEL.OTHER_SETTINGS02_REQ')}</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('kcg_branch_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="branch_code" ref="branch_code" defaultValue={adminSystemSettings.kcg_branch_code.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.OTHER_SETTINGS02')}</label>
                {errors.kcg_branch_code && <small className="mdl-textfield__error shown">{errors.kcg_branch_code[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <legend>{tr.t('LABEL.BILLING_INFORMATION')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_account_name', errors)}>
                <input className="mdl-textfield__input" type="text" id="account_name" ref="account_name" defaultValue={adminSystemSettings.kcg_account_name.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.ACCOUNT_NAME_REQ')}</label>
                {errors.kcg_account_name && <small className="mdl-textfield__error shown">{errors.kcg_account_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_credit_to', errors)}>
                <input className="mdl-textfield__input" type="text" id="credit_to" ref="credit_to" defaultValue={adminSystemSettings.kcg_credit_to.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.CREDIT_TO_REQ')}</label>
                {errors.kcg_credit_to && <small className="mdl-textfield__error shown">{errors.kcg_credit_to[0]}</small>}
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_bank_account', errors)}>
                <input className="mdl-textfield__input" type="text" id="bank_account" ref="bank_account" defaultValue={adminSystemSettings.kcg_bank_account.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.BANK_ACCOUNT_REQ')}</label>
                {errors.kcg_bank_account && <small className="mdl-textfield__error shown">{errors.kcg_bank_account[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('kcg_bank_code', errors)}>
                <input className="mdl-textfield__input" type="text" id="bank_code" ref="bank_code" defaultValue={adminSystemSettings.kcg_bank_code.value}/>
                <label className="mdl-textfield__label">{tr.t('LABEL.BANK_ACCOUNT_CODE_REQ')}</label>
                {errors.kcg_bank_code && <small className="mdl-textfield__error shown">{errors.kcg_bank_code[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <button className="mdl-button mdl-button--accent" id="btn_save" type="button" onClick={(e) => this.save(e)}>{tr.t('BUTTON.SAVE')}</button>
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

    let payload = [
      {
        name: "kcg_company_name",
        value: company_name.value
      },{
        name: "kcg_street_address",
        value: street_address.value
      },{
        name: "kcg_city",
        value: city.value
      },{
        name: "kcg_state",
        value: state.value
      },{
        name: "kcg_country",
        value: country.value
      },{
        name: "kcg_postal_code",
        value: postal_code.value
      },{
        name: "kcg_admin_email",
        value: admin_email.value
      },{
        name: "reset_token_expiry",
        value: token_expiry.value
      },{
        name: "items_per_page",
        value: items_per_page.value
      },{
        name: "kcg_swift_code",
        value: swift_code.value
      },{
        name: "kcg_branch_code",
        value: branch_code.value
      },{
        name: "kcg_account_name",
        value: account_name.value
      },{
        name: "kcg_credit_to",
        value: credit_to.value
      },{
        name: "kcg_bank_account",
        value: bank_account.value
      },{
        name: "kcg_bank_code",
        value: bank_code.value
      }];
    this.saveSettings(payload).catch( (e) => this.setErrors(e) );
  }
  saveSettings (payload) {
    return this.props.saveSystemSettings(payload);
  }
  setErrors( e ) {
    this.setState(createError(e));
  }
};

SystemSettings.mixins = [LinkedStateMixin];
SystemSettings.defaultProps = {
    errors: []
};
export default SystemSettings;