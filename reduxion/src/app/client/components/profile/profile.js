import React from 'react';
import {Router, Link, History} from 'react-router';
import cx from 'classnames';
import Checkit from 'checkit';
import Country from 'client/components/country';

import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';
import {openLoading, closeLoading} from 'common/components/modal'

class ClientProfile extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.context = context;

    this.state = {
      success: {},
      errors: {},
      errorServer: null,
      loading: false,
      isUsernameAvailable: null
    };
  }

  componentDidMount () {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    // (Optional) Retrieve token in changing email
    if (!this.props.loading && !this.props.isRetrieveEmailChangeTokenSuccess && this.props.locationQuery.token) {
      let payload = {
        token: this.props.locationQuery.token,
        callback_url: window.location.origin + '/client/profile',
        user_type: 2
      };

      window.componentHandler.upgradeDom();
      return this.validateEmailChangeToken.call(this, payload)
        .with(this)
        .then(this.callEmailChangeToken)
        .catch(this.setErrors)
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.user) {
      this.setState({
        client: nextProps.user
      });
    }

    if(nextProps.success === true && Object.keys(nextProps.responseSuccess).length>0) {
      setTimeout(() =>{
      //nextProps.clientProfile();
      window.location.href ="/i/client/profile";
    },1000)

    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.isUsernameAvailable) {
      this.setState({
        isUsernameAvailable: nextProps.isUsernameAvailable
      });
    }

    // (Optional) Finalize changing of email
    if (!nextProps.loading && nextProps.isRetrieveEmailChangeTokenSuccess && !nextProps.isVerifyEmailChangeSuccess) {
      let payload = {
        token: nextProps.emailChangeToken.get('data').token
      };

      window.componentHandler.upgradeDom();
      return this.validateVerifyEmailChange.call(this, payload)
        .with(this)
        .then(this.callVerifyEmailChange)
        .catch(this.setErrors)
    }

    // (Optional) Logout user after finalizing of changing of email
    if (!nextProps.loading && nextProps.isVerifyEmailChangeSuccess) {
      this.context.router.push('/i/logout');
    }
  }

  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  }

  render() {
    if(this.props.success){
      let message = null;
      let success = this.props.responseSuccess;
      let notification = document.querySelector('.mdl-snackbar');
      message = success.message;
      if(message){
        notification.MaterialSnackbar.showSnackbar( {
            message: message,
            timeout: 1000
        });
      }
    }

    if (!this.props.user || !this.state.client || !Object.keys(this.props.country ).length) {
      return this.loadingRender();
    } else {
      closeLoading();
    }

    let client = this.state.client;

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    return (
      <div>
        { this.renderError() }
        <form>
          <legend>Login Information</legend>
          <div className="">
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('username', errors)}>
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="username"
                          ref="username"
                          data-client="user"
                          defaultValue={(client.user) ? client.user.username : ''}

                          />
                        <label className="mdl-textfield__label" htmlFor="username">Username *</label>
                        {errors && errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col form-group-flag-icon">
                      <button
                        id="check_availability"
                        type="button"
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                        onClick={this.onClickGetAvailableUsername.bind(this)}
                        >
                        Check availability
                      </button>
                      { this.isUsernameAvailable() }
                  </div>
              </div>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('email_address', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="email_address"
                            ref="email_address"
                            data-client="user"
                            defaultValue={(client.user) ? client.user.email_address : ''}
                            readOnly={true}
                            />
                          <label className="mdl-textfield__label" htmlFor="email_address">E-mail</label>
                          {errors && errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                      </div>
                  </div>
              </div>
          </div>

          <legend>General Information</legend>
          <div className="">
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col">
                      <div className={this.formClassNames('company_name', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="company_name"
                            ref="company_name"
                            defaultValue={client.company_name}

                            />
                          <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                          {errors && errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                      </div>
                  </div>
              </div>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('street_address_1', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="street_address_1"
                            ref="street_address_1"
                            defaultValue={client.street_address_1}

                            />
                          <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1 *</label>
                          {errors && errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('street_address_2', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="street_address_2"
                            ref="street_address_2"
                            defaultValue={client.street_address_2}

                            />
                          <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
                          {errors && errors.street_address_2 && <small className="mdl-textfield__error shown">{errors.street_address_2[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('city', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="city"
                            ref="city"
                            defaultValue={client.city}

                            />
                          <label className="mdl-textfield__label" htmlFor="city">City *</label>
                          {errors && errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                      </div>
                  </div>
              </div>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('state', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="state"
                            ref="state"
                            defaultValue={client.state}

                            />
                          <label className="mdl-textfield__label" htmlFor="state">State / Province</label>
                          {errors && errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('postal_code', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="postal_code"
                            ref="postal_code"
                            defaultValue={client.postal_code}

                            />
                          <label className="mdl-textfield__label" htmlFor="postal_code">Postal code *</label>
                          {errors && errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('country_id', errors)}>
                        { this.renderCountry() }
                        {errors && errors.country_id && <small className="mdl-textfield__error shown">{errors.country_id[0]}</small>}
                      </div>
                  </div>
              </div>
          </div>

          <legend>Company Representative</legend>
          <div className="">
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_first_name', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_first_name"
                            ref="rep_first_name"
                            defaultValue={client.rep_first_name}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
                          {errors && errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_last_name', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_last_name"
                            ref="rep_last_name"
                            defaultValue={client.rep_last_name}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
                          {errors && errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_email_address', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_email_address"
                            ref="rep_email_address"
                            defaultValue={client.rep_email_address}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                          {errors && errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                      </div>
                  </div>

                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_gender', errors)}>
                          <select
                            className="mdl-select__input"
                            id="rep_gender"
                            ref="rep_gender"
                            defaultValue={client.rep_gender}

                            >
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <label className="mdl-textfield__label" htmlFor="rep_gender">Gender *</label>
                          {errors && errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
                      </div>
                  </div>
              </div>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--1-col">
                      <div className={this.formClassNames('rep_mobile_code', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_mobile_code"
                            ref="rep_mobile_code"
                            defaultValue={client.rep_mobile_code}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Code</label>
                          {errors && errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--2-col">
                      <div className={this.formClassNames('rep_mobile_number', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_mobile_number"
                            ref="rep_mobile_number"
                            defaultValue={client.rep_mobile_number}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.</label>
                          {errors && errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--1-col">
                      <div className={this.formClassNames('rep_phone_code', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_phone_code"
                            ref="rep_phone_code"
                            defaultValue={client.rep_phone_code}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_phone_code">Code</label>
                          {errors && errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--2-col">
                      <div className={this.formClassNames('rep_phone_number', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_phone_number"
                            ref="rep_phone_number"
                            defaultValue={client.rep_phone_number}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_phone_number">Phone Number</label>
                          {errors && errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_position', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_position"
                            ref="rep_position"
                            defaultValue={client.rep_position}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
                          {errors && errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
                      </div>
                  </div>

                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('rep_department', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="rep_department"
                            ref="rep_department"
                            defaultValue={client.rep_department}

                            />
                          <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
                          {errors && errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
                      </div>
                  </div>
              </div>
          </div>

          <legend>Company Alternative</legend>
          <div className="">
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_first_name', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_first_name"
                            ref="alt_first_name"
                            defaultValue={client.alt_first_name}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_first_name">First name</label>
                          {errors && errors.alt_first_name && <small className="mdl-textfield__error shown">{errors.alt_first_name[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_last_name', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_last_name"
                            ref="alt_last_name"
                            defaultValue={client.alt_last_name}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_last_name">Last name</label>
                          {errors && errors.alt_last_name && <small className="mdl-textfield__error shown">{errors.alt_last_name[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_email_address', errors)}>
                          <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_email_address"
                              ref="alt_email_address"
                              defaultValue={client.alt_email_address}

                              />
                          <label className="mdl-textfield__label" htmlFor="alt_email_address">E-mail</label>
                          {errors && errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
                      </div>
                  </div>

                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_gender', errors)}>
                          <select
                            className="mdl-select__input"
                            id="alt_gender"
                            ref="alt_gender"
                            defaultValue={client.alt_gender}

                            >
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <label className="mdl-textfield__label" htmlFor="alt_gender">Gender</label>
                      </div>
                  </div>
              </div>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--1-col">
                      <div className={this.formClassNames('alt_mobile_code', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_mobile_code"
                            ref="alt_mobile_code"
                            defaultValue={client.alt_mobile_code}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_mobile_code">Code</label>
                          {errors && errors.alt_mobile_code && <small className="mdl-textfield__error shown">{errors.alt_mobile_code[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--2-col">
                      <div className={this.formClassNames('alt_mobile_number', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_mobile_number"
                            ref="alt_mobile_number"
                            defaultValue={client.alt_mobile_number}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_mobile_number">Mobile no.</label>
                          {errors && errors.alt_mobile_number && <small className="mdl-textfield__error shown">{errors.alt_mobile_number[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--1-col">
                      <div className={this.formClassNames('alt_phone_code', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_phone_code"
                            ref="alt_phone_code"
                            defaultValue={client.alt_phone_code}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_phone_code">Code</label>
                          {errors && errors.alt_phone_code && <small className="mdl-textfield__error shown">{errors.alt_phone_code[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--2-col">
                      <div className={this.formClassNames('alt_phone_number', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_phone_number"
                            ref="alt_phone_number"
                            defaultValue={client.alt_phone_number}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_phone_number">Phone Number</label>
                          {errors && errors.alt_phone_number && <small className="mdl-textfield__error shown">{errors.alt_phone_number[0]}</small>}
                      </div>
                  </div>
                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_position', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_position"
                            ref="alt_position"
                            defaultValue={client.alt_position}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_position">Position</label>
                          {errors && errors.alt_position && <small className="mdl-textfield__error shown">{errors.alt_position[0]}</small>}
                      </div>
                  </div>

                  <div className="mdl-cell mdl-cell--3-col">
                      <div className={this.formClassNames('alt_department', errors)}>
                          <input
                            className="mdl-textfield__input"
                            type="text"
                            id="alt_department"
                            ref="alt_department"
                            defaultValue={client.alt_department}

                            />
                          <label className="mdl-textfield__label" htmlFor="alt_department">Department</label>
                          {errors && errors.alt_department && <small className="mdl-textfield__error shown">{errors.alt_department[0]}</small>}
                      </div>
                  </div>
              </div>
          </div>
          <div className="mdl-button-group">
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
              type="submit"
              onClick = { this.onSubmitProfile.bind(this) }
              >
              Save
            </button>
            <a
              className="mdl-button mdl-js-button mdl-button--raised"
              href="/i"
              >
              Cancel
            </a>
          </div>
        </form>
      </div>
    );
  }

  // --- Render
  renderCountry() {
    if (!this.props.country) return;

    let countries = this.props.country;
    return (
     <div>
        <select className="mdl-select__input" id="country_id" name="country_id" ref="country_id" defaultValue={this.state.client.country_id}>
          <option value=""></option>
          {countries.map(item =>
            {return <option key={item.id} value={item.id}>{item.name}</option>}
          )}
        </select>
        <label className="mdl-textfield__label" htmlFor="country_id">Country</label>
      </div>
    );
  }

  renderError() {
    let error = this.state.errorServer;
    if(!error || this.props.isUsernameAvailable == false) return;

    let results = error.response;

    return (
      <div className="bs-callout bs-callout-danger text-center animate bounceIn" role="alert">
        {mapObject(results, function (key, value) {
          return <div key={key}>{value}</div>;
        })}
      </div>
    );
  }

  // --- Render (Partials)

  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  isUsernameAvailable() {
    let icon = '';
    let className = 'mdl-icon material-icons';

    if (this.props.isUsernameAvailable == true) {
      icon = 'done';
      className += ' mdl-icon-success';
    } else if (this.props.isUsernameAvailable == false) {
      icon = 'clear';
      className += ' mdl-icon-danger';
    } else if (this.props.isUsernameAvailable == 'loading') {
      icon = 'hourglass_empty';
    }

    return (
      <i className={className}>{icon}</i>
    );
  }

  // --- Actions

  getAvailableUsername(payload) {
    return this.props.getAvailableUsername(payload);
  }

  updateClientProfile(payload) {
    return this.props.updateClientProfile(payload);
  }

  callEmailChangeToken(payload) {
    return this.props.retrieveEmailChangeToken(payload);
  }

  callVerifyEmailChange(payload) {
    return this.props.verifyEmailChange(payload);
  }

  // --- Events

  onChangeFields(e) {
    let client = this.state.client;

    if (e.target.getAttribute('data-client')) {
      client[e.target.getAttribute('data-client')][e.target.id] = e.target.value;
    } else {
      client[e.target.id] = e.target.value;
    }

    this.setState({client: client});
  }

  onClickGetAvailableUsername(e) {
    e.preventDefault();

    this.setState({
      success: null,
      errors: {},
      errorServer: null
    });

    let {username} = this.refs;
    let payload = {
      username: username.value,
      except_user_id: this.state.client.user.id
    }

    window.componentHandler.upgradeDom();
    return this.validateAvailableUsername.call(this, payload)
      .with(this)
      .then(this.getAvailableUsername)
      .catch(this.setErrors);
  }

  onSubmitProfile(e) {
    e.preventDefault();

    this.setState({
      success: {},
      errors: {},
      errorServer: null,
      isUsernameAvailable: null
    });


    let {email_address, username, company_name, street_address_1, street_address_2, city, state, postal_code,
      rep_first_name, rep_last_name, rep_gender, rep_email_address, rep_mobile_code,
      rep_mobile_number, rep_phone_code, rep_phone_number, rep_position, rep_department,
      alt_first_name, alt_last_name, alt_email_address, alt_gender, alt_mobile_code,
      alt_mobile_number, alt_phone_code, alt_phone_number, alt_position, alt_department} = this.refs;

    let payload = {
      company_name: company_name.value,
      street_address_1: street_address_1.value,
      street_address_2: street_address_2.value,
      city: city.value,
      state: state.value,
      postal_code: postal_code.value,
      country_id: country_id.value,
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
      alt_first_name: alt_first_name.value,
      alt_last_name: alt_last_name.value,
      alt_email_address: alt_email_address.value,
      alt_gender: alt_gender.value,
      alt_mobile_code: alt_mobile_code.value,
      alt_mobile_number: alt_mobile_number.value,
      alt_phone_code: alt_phone_code.value,
      alt_phone_number: alt_phone_number.value,
      alt_position: alt_position.value,
      alt_department: alt_department.value,
      email_address: email_address.value,
      username: username.value
    };

    window.componentHandler.upgradeDom();
    return this.validateUpdateClientProfile.call(this, payload)
      .with(this)
      .then(this.updateClientProfile)
      .catch(this.setErrors);
  }

  // --- Validations

  validateUpdateClientProfile(payload) {
    let rules = new Checkit({
      company_name:      [{ rule: 'required', label: 'company name'}],
      street_address_1:  [{ rule: 'required', label: 'street address 1'}],
      street_address_2:  [],
      city:              [{ rule: 'required', label: 'city'}],
      state:             [],
      country_id:        [{ rule: 'required', label: 'country'}],
      postal_code:       [{ rule: 'required', label: 'postal code'}],
      rep_first_name:    [{ rule: 'required', label: 'first name'}],
      rep_last_name:     [{ rule: 'required', label: 'last name'}],
      rep_email_address: [
        { rule: 'required', label: 'email' },
        { rule: 'email', label: 'email' }
      ],
      rep_gender:        [{ rule: 'required', label: 'gender'}],
      rep_mobile_code:   [{ rule: 'numeric', label: 'mobile code'}],
      rep_mobile_number: [{ rule: 'numeric', label: 'mobile number'}],
      rep_phone_code:    [{ rule: 'numeric', label: 'phone code'}],
      rep_phone_number:  [{ rule: 'numeric', label: 'phone number'}],
      rep_position:      [
        { rule: 'required', label: 'position' },
        { rule: 'max:100', label: 'position' }
      ],
      rep_department:    [
        { rule: 'required', label: 'department' },
        { rule: 'max:100', label: 'department'}
      ],
      alt_first_name:    [],
      alt_last_name:     [],
      alt_email_address: [{ rule: 'email', label: 'email'}],
      alt_gender:        [],
      alt_mobile_code:   [{ rule: 'numeric', label: 'mobile code'}],
      alt_mobile_number: [{ rule: 'numeric', label: 'mobile number'}],
      alt_phone_code:    [{ rule: 'numeric', label: 'phone code'}],
      alt_phone_number:  [{ rule: 'numeric', label: 'phone number'}],
      alt_position:      [{ rule: 'max:100', label: 'position'}],
      alt_department:    [{ rule: 'max:100', label: 'department'}],
      username:          [
        { rule: 'required', label: 'username' },
        { rule: 'min:8', label: 'username' },
        { rule: 'max:32', label: 'username' }
      ],
      items_per_page:    [{ rule: 'integer', label: 'items per page'}],
      timezone:          []
    });

    return rules.run(payload);
  }

  validateAvailableUsername(payload) {
    let rules = new Checkit({
      username:          [
        { rule: 'required', label: 'username' },
        { rule: 'min:8', label: 'username' },
        { rule: 'max:32', label: 'username' }
      ],
      except_user_id: [ 'required' ]
    });

    return rules.run(payload);
  }

  validateEmailChangeToken(payload) {
    let rules = new Checkit({
      token:        [{ rule: 'required', label: 'token' }],
      callback_url: [{ rule: 'required', label: 'callback url' }],
      user_type:    [{ rule: 'required', label: 'user type' }]
    });

    return rules.run(payload);
  }

  validateVerifyEmailChange(payload) {
    let rules = new Checkit({
      token:        [{ rule: 'required', label: 'token' }]
    });

    return rules.run(payload);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
}

ClientProfile.mixins = [LinkedStateMixin];

ClientProfile.defaultProps = {
  errors: []
};

ClientProfile.contextTypes = {
  router: React.PropTypes.object,
  history: React.PropTypes.object,
  location: React.PropTypes.object
};

export default ClientProfile;

/**
 * mapObject
 *
 * @param object
 * @param callback
 * @returns {Array}
 */
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}