import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import Country from 'client/components/country';
import tr from 'i18next';

class LocalAuthenticationFormSignup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      loading:false
    }
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    if (document.querySelector("select")) {
      let allSelectOpt = document.querySelectorAll("select");
      for (let i = 0; i < allSelectOpt.length; ++i) {
          allSelectOpt[i].addEventListener("change", function(e) {
          e.preventDefault();
          let target = e.target.id + "-opt";
          if (e.target.value) {
            document.getElementById(target).classList.add('is-dirty');
          } else {
            document.getElementById(target).classList.remove('is-dirty');
          }
        }, false);
      }
    }
  }

  scrolltop (errors, errorServer) {
    if (!document.querySelector('.alert')) {
      return false;
    }

    if (Object.keys(errors).length || errorServer) {
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

      scroll = function(c, a, b, i) {
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
  render() {
    let {errors, errorServer} = this.props;
    this.scrolltop(errors, errorServer);
    if (errorServer) {
      errors = Object.assign({}, errorServer.response, {password_confirmation: []});
      if (errors.password == 'The password confirmation does not match.') {
        errors.password_confirmation = errors.password;
        errors.password = "";
      }
    }

    return (
      <div className="local-signin-form login-frame">
        <div className="sign-top">
            <h3 className="mdl-typography--headline">{tr.t('formTitle.signUp')}</h3>
            <p>{tr.t('headerText.text1')}</p>
        </div>

        <form className="mdl-shadow--2dp" action={ this.signup }>
          <legend>{tr.t('title.companyOrganization')}</legend>
          <div className="mdl-layout__content">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--full-col">
                <div className={this.formClassNames('company_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='company_name'
                    ref="company_name"
                    />
                  <label className="mdl-textfield__label" htmlFor="company_name">{tr.t('label.companyName')}</label>
                  {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('street_address_1', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='street_address_1'
                    ref="street_address_1"
                    />
                  <label className="mdl-textfield__label" htmlFor="street_address_1">{tr.t('label.streetAddress1')}</label>
                  {errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('street_address_2', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='street_address_2'
                    ref="street_address_2"
                    />
                  <label className="mdl-textfield__label" htmlFor="street_address_2">{tr.t('label.streetAddress2')}</label>
                  {errors.street_address_2 && <small className="mdl-textfield__error shown">{errors.street_address_2[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('city', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='city'
                    ref="city"
                    />
                  <label className="mdl-textfield__label" htmlFor="city">{tr.t('label.city')}</label>
                  {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('state', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='state'
                    ref="state"
                    />
                  <label className="mdl-textfield__label" htmlFor="state">{tr.t('label.stateProvince')}</label>
                  {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('postal_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='postal_code'
                    ref="postal_code"
                    />
                  <label className="mdl-textfield__label" htmlFor="postal_code">{tr.t('label.postalCode')}</label>
                  {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div id="country_id-opt" className={this.formClassNames('country_id', errors)}>
                  <div className="mdl-selectfield">
                    <Country
                      country = { this.props.country }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <legend>{tr.t('title.companyRepresentative')}</legend>
          <div className="mdl-layout__content">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className={this.formClassNames('rep_first_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_first_name'
                    ref="rep_first_name"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_first_name">{tr.t('label.firstName')}</label>
                  {errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className={this.formClassNames('rep_last_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_last_name'
                    ref="rep_last_name"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_last_name">{tr.t('label.lastName')}</label>
                  {errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div id="rep_gender-opt" className={this.formClassNames('rep_gender', errors)}>
                  <div className="mdl-selectfield">
                      <select
                        className="mdl-textfield__input"
                        id='rep_gender'
                        ref="rep_gender" >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <label className="mdl-textfield__label" htmlFor="rep_gender">{tr.t('label.gender')}</label>
                      {errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
                  </div>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className={this.formClassNames('rep_email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_email_address'
                    ref="rep_email_address"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_email_address">{tr.t('label.email')}</label>
                  {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('rep_mobile_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_mobile_code'
                    ref="rep_mobile_code"
                    maxLength="3"
                    onKeyPress={(e) => this.isNumberKey(e)}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_mobile_code">{tr.t('label.code')}</label>
                  {errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_mobile_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_mobile_number'
                    ref="rep_mobile_number"
                    onKeyPress={(e) => this.isNumberKey(e)}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_mobile_number">{tr.t('label.mobileNumber')}</label>
                  {errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('rep_phone_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_phone_code'
                    ref="rep_phone_code"
                    maxLength="3"
                    onKeyPress={(e) => this.isNumberKey(e)}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_phone_code">{tr.t('label.code')}</label>
                  {errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_phone_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_phone_number'
                    ref="rep_phone_number"
                    onKeyPress={(e) => this.isNumberKey(e)}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_phone_number">{tr.t('label.phoneNumber')}</label>
                  {errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--4-col">
                <div className={this.formClassNames('rep_position', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_position'
                    ref="rep_position"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_position">{tr.t('label.position')}</label>
                  {errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--4-col">
                <div className={this.formClassNames('rep_department', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='rep_department'
                    ref="rep_department"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_department">{tr.t('label.department')}</label>
                  {errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <legend>Arbitrium Login Information</legend>
          <div className="mdl-layout__content">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="email"
                    id='email_address'
                    ref="email_address"
                    />
                  <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('label.email')}</label>
                  {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('username', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='username'
                    ref="username"
                    />
                  <label className="mdl-textfield__label" htmlFor="username">{tr.t('label.userName')}</label>
                  {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('password', errors)}>
                  <input
                    className="mdl-textfield__input"
                    id='password'
                    ref="password"
                    type='password'
                    />
                  <label className="mdl-textfield__label" htmlFor="password">{tr.t('label.password')}</label>
                  {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('password_confirmation', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    id='password_confirmation'
                    ref="password_confirmation"
                    />
                  <label className="mdl-textfield__label" htmlFor="password_confirmation">{tr.t('label.confirmPassword')}</label>
                  {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <footer className="mdl-grid mdl-grid--no-spacing footer-action">
            <div className="mdl-cell mdl-cell--6-offset mdl-cell--6-col">
              <Link
                className=''
                id='btn-signup'
                to="/i/login">{tr.t('button.alreadyHaveAnAccount')}</Link>
              <button
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--blue"
                id='btn-login'
                type='button'
                onClick={(e)=>this.signup(e)}>{ this.props.buttonCaption }</button>
            </div>
          </footer>
        </form>
      </div>
    );
  }
  isNumberKey(evt){
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
    }
  }
  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
  signup( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
    } );
    let {email_address, password, username, company_name, street_address_1, street_address_2, city, state, postal_code,
      rep_first_name, rep_last_name, rep_gender, rep_email_address, rep_mobile_code,
      rep_mobile_number, rep_phone_code, rep_phone_number, rep_position, rep_department, password_confirmation} = this.refs;

    this.props.onButtonClick( {
      company_name: company_name.value,
      street_address_1: street_address_1.value,
      street_address_2: street_address_2.value,
      city: city.value,
      state: state.value,
      postal_code: postal_code.value,
      country_id: document.querySelector('#country_id').value,
      rep_first_name: rep_first_name.value,
      rep_last_name: rep_last_name.value,
      rep_gender: rep_gender.value,
      rep_email_address: rep_email_address.value,
      rep_mobile_code: rep_mobile_code.value,
      rep_mobile_number: rep_mobile_number.value,
      rep_phone_code: rep_phone_code.value,
      rep_phone_number: rep_phone_number.value,
      rep_position: rep_position.value,
      rep_department: rep_department.value,
      password_confirmation: password_confirmation.value,
      password: password.value,
      email_address: email_address.value,
      username: username.value
    } );
  }
}

LocalAuthenticationFormSignup.mixins = [LinkedStateMixin];

LocalAuthenticationFormSignup.defaultProps = {
  errors: []
};

export default LocalAuthenticationFormSignup;
