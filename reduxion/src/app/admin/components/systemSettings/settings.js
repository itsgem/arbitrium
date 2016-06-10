import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'

class SystemSettings extends React.Component {
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
        <form method="post">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <legend>General Information</legend>
              <p>The contents appear below this section are placeholder content to show the actual layout of the section. The contents will be replaced later on.</p>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="company_name" defaultValue={adminSystemSettings[0].value}/>
                <label className="mdl-textfield__label">Company Name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="street_address" defaultValue={adminSystemSettings[1].value}/>
                <label className="mdl-textfield__label">Billing Info</label>
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="city" defaultValue={adminSystemSettings[2].value}/>
                <label className="mdl-textfield__label">City</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="state" defaultValue={adminSystemSettings[3].value}/>
                <label className="mdl-textfield__label">State</label>
              </div>
            </div>

            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="country" defaultValue={adminSystemSettings[4].value}/>
                <label className="mdl-textfield__label">Country</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="postal_code" defaultValue={adminSystemSettings[5].value}/>
                <label className="mdl-textfield__label">Postal Code</label>
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="admin_email" defaultValue={adminSystemSettings[14].value}/>
                <label className="mdl-textfield__label">Admin Email</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="token_expiry" defaultValue={adminSystemSettings[13].value}/>
                <label className="mdl-textfield__label">Token Expiry</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="items_per_page" defaultValue={adminSystemSettings[12].value}/>
                <label className="mdl-textfield__label">Items Per Page</label>
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <p>Other settings textfield 1</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="swift_code" defaultValue={adminSystemSettings[11].value}/>
                <label className="mdl-textfield__label">Other settings 1</label>
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <p>Other settings textfield 2</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="branch_code" defaultValue={adminSystemSettings[10].value}/>
                <label className="mdl-textfield__label">Other settings 2</label>
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
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="account_name" defaultValue={adminSystemSettings[6].value}/>
                <label className="mdl-textfield__label">Account Name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="credit_to" defaultValue={adminSystemSettings[7].value}/>
                <label className="mdl-textfield__label">Credit To</label>
              </div>
            </div>
          </div>

          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="bank_account" defaultValue={adminSystemSettings[8].value}/>
                <label className="mdl-textfield__label">Bank Account</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                <input className="mdl-textfield__input" type="text" id="bank_code" defaultValue={adminSystemSettings[9].value}/>
                <label className="mdl-textfield__label">Bank Account Code</label>
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

  // save ( e ) {
  //   e.preventDefault();
  //   this.setState( {
  //     loading: true,
  //     errors: {},
  //     errorServer: null
  //   } );
  //   let {email_address, username, company_name, street_address_1, street_address_2, city, state, postal_code,
  //       rep_first_name, rep_last_name, rep_gender, rep_email_address, rep_mobile_code,
  //       rep_mobile_number, rep_phone_code, rep_phone_number, rep_position, rep_department,
  //       alt_first_name, alt_last_name, alt_gender, alt_email_address, alt_mobile_code,
  //       alt_mobile_number, alt_phone_code, alt_phone_number, alt_position, alt_department} = this.refs;

  //   let payload = {
  //     company_name: company_name.value,
  //     street_address_1: street_address_1.value,
  //     street_address_2: street_address_2.value,
  //     city: city.value,
  //     state: state.value,
  //     postal_code: postal_code.value,
  //     country_id: country_id.value,
  //     rep_first_name: rep_first_name.value,
  //     rep_last_name: rep_last_name.value,
  //     rep_gender: rep_gender.value
  //   };

  //   let payload = {
  //     system_settings: [
  //       {

  //       }
  //     ]
  //   }

  //   window.componentHandler.upgradeDom();
  //   return validateRegister.call( this, payload )
  //     .with( this )
  //     .then( saveSettings )
  //     .catch( setErrors );
  // }

  // function saveSettings (payload) {
  //   return this.props.saveSystemSettings(payload);
  // }

  setErrors(e) {
    this.setState(createError(e));
  }
};

SystemSettings.mixins = [LinkedStateMixin];
SystemSettings.defaultProps = {
    errors: []
};
export default SystemSettings;