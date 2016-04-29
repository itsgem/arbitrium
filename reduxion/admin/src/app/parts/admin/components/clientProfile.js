import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import Country from '../../auth/components/country'

class ClientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      client: null,
      updateCompleted: false
    };
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.client.clientInfo) {
      this.setState({
        client: nextProps.client.clientInfo
      });
    }

    if (nextProps.client.updateCompleted) {
      this.setState({
        updateCompleted: nextProps.client.updateCompleted
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    if (this.props.client.clientInfo) {
      return (
        <div id="client" className="auth-view">
          { this.renderClient() }
        </div>
      );
    } else {
      return (
        <div id="client" className="auth-view">
          { this.renderError() }
        </div>
      );
    }
  }
  renderError() {
    let error = this.state.errorServer;
    if(!error) return;
    return (
      <div className="alert alert-danger text-center animate bounceIn" role="alert">
        <div>An error occured: {error.name}</div>
        <div>{error.message}</div>
        <div>Status Code: {error.status}</div>
      </div>
    );
  }

  renderClient() {

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    if (!this.props.client || !this.state.client) {
      return (<div className="mdl-grid"></div>);
    }

    let client = this.state.client;
    let status = client.approval_status == 'Pending' ? true : false;
    return (
      <form onSubmit={(e) => this.onSubmitClientProfile(e)}>
        <div className="required">Required fields</div>
        { this.renderSuccess() }
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            <legend>USER ACCOUNT DETAILS</legend>
            <div className={this.formClassNames('username', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='username'
                ref="username"
                defaultValue={(client.user) ? client.user.username : ''}
                />
              <label className="mdl-textfield__label" htmlFor="usernmae">Username*</label>
              {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <button
              className="md-raised md-primary md-hue-1 margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 md-button ng-scope"
              id='check_availability'
              type='button'
              onClick={(e) => this.checkUsername(e)}>Check Availability</button>
          </div>
          <div className="mdl-layout__content">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('email_address', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='email_address'
                  ref="email_address"
                  defaultValue={(client.user) ? client.user.email_address : ''}
                  />
                <label className="mdl-textfield__label" htmlFor="email_address">E-mail Address*</label>
                {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          {/*Approval layout*/}
          <div className="mdl-layout__content status-content">
            <div className="mdl-cell mdl-cell--6-col">
             <div className="mdl-cell mdl-cell--6-col status-col">
                <div className="mdl-cell mdl-cell--2-col float-lft mg-lf">Approval Status:</div>
                <div className="mdl-cell mdl-cell--2-col float-lft">{client.approval_status}</div>
                <div className="mdl-cell mdl-cell--6-col float-lft">
                  { status &&
                    <button
                      id='btnClientApproval'
                      type='button'
                      className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                      onClick={(e) => this.changeApprovalStatus(e)}>
                        <span>Approve</span>
                        <span className="ion-checkmark-circled icon-con"></span>
                    </button>
                  }
                  { status &&
                    <button
                      id='btnClientDisapproval'
                      type='button'
                      className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent status-btn'
                      onClick={(e) => this.clientDisapproveStatus(e)}>
                        <span>Disapprove</span>
                        <span className="ion-android-cancel icon-con"></span>
                    </button>
                  }
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h5>Credit Balance</h5>
              <h4>{client.credit_balance}</h4>
            </div>
          </div>
        {/*Status layout*/}
          <div className="mdl-layout__content status-content">
            <div className="mdl-cell mdl-cell--6-col">
             <div className="mdl-cell mdl-cell--6-col status-col">
                <div className="mdl-cell mdl-cell--2-col float-lft mg-lf">Status:</div>
                <div className="mdl-cell mdl-cell--2-col float-lft">
                  {client.user.activated_at? "Active": 'Inactive'}
                </div>
                <div className="mdl-cell mdl-cell--6-col float-lft">
                  { (client.approval_status === 'Approved')?
                  client.user.activated_at?
                    <div>
                      <button
                        id='btnClientDisapproval'
                        type='button'
                        className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent status-btn'
                        onClick={(e) => this.clientDeactivateStatus(e)}>
                          <span>Deactivate</span>
                          <span className="ion-flash-off icon-con"></span>
                      </button>
                    </div>
                    :
                    <div>
                      <button
                        id='btnClientApproval'
                        type='button'
                        className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                        onClick={(e) => this.clienActivateStatus(e)}>
                          <span>Activate </span>
                          <span className="ion-power icon-con"></span>
                      </button>
                    </div>
                    :null
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mdl-grid">
          <div className="mdl-layout__content">
            <div className="mdl-cell mdl-cell--6-col">
              <legend>GENERAL INFORMATION</legend>
              <div className={this.formClassNames('company_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='company_name'
                  ref="company_name"
                  defaultValue={(client.company_name) ? client.company_name : ''}
                  />
                <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('street_address_1', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='street_address_1'
                ref="street_address_1"
                defaultValue={(client.street_address_1) ? client.street_address_1 : ''}
                />
              <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1*</label>
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
                defaultValue={(client.street_address_2) ? client.street_address_2 : ''}
                />
              <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('city', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='city'
                ref="city"
                defaultValue={(client.city) ? client.city : ''}
                />
              <label className="mdl-textfield__label" htmlFor="city">City*</label>
              {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('state', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='state'
                ref="state"
                defaultValue={(client.state) ? client.state : ''}
                />
              <label className="mdl-textfield__label" htmlFor="state">State / Province*</label>
              {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('country_id', errors)}>
              { this.renderCountry(client.country_id) }
              {errors.country_id && <small className="mdl-textfield__error shown">{errors.country_id[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('postal_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='postal_code'
                ref="postal_code"
                defaultValue={(client.postal_code) ? client.postal_code : ''}
                />
              <label className="mdl-textfield__label" htmlFor="postal_code">Postal code</label>
              {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <legend>COMPANY REPRESENTATIVE</legend>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('rep_first_name', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_first_name'
                ref="rep_first_name"
                defaultValue={(client.rep_first_name) ? client.rep_first_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
              {errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('rep_last_name', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_last_name'
                ref="rep_last_name"
                defaultValue={(client.rep_last_name) ? client.rep_last_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
              {errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('rep_email_address', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_email_address'
                ref="rep_email_address"
                defaultValue={(client.rep_email_address) ? client.rep_email_address : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
              {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <div className={this.formClassNames('rep_gender', errors)}>
              <select
                className="mdl-select__input"
                id='rep_gender'
                ref="rep_gender"
                defaultValue={(client.rep_gender) ? client.rep_gender : ''} >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className="mdl-textfield__label" htmlFor="rep_gender">Gender</label>
              {errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('rep_mobile_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_mobile_code'
                ref="rep_mobile_code"
                defaultValue={(client.rep_mobile_code) ? client.rep_mobile_code : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Country Code*</label>
              {errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <div className={this.formClassNames('rep_mobile_number', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_mobile_number'
                ref="rep_mobile_number"
                defaultValue={(client.rep_mobile_number) ? client.rep_mobile_number : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.*</label>
              {errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('rep_phone_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_phone_code'
                ref="rep_phone_code"
                defaultValue={(client.rep_phone_code) ? client.rep_phone_code : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_phone_code">Country Code*</label>
              {errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <div className={this.formClassNames('rep_phone_number', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_phone_number'
                ref="rep_phone_number"
                defaultValue={(client.rep_phone_number) ? client.rep_phone_number : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_phone_number">Telephone no.*</label>
              {errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('rep_position', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_position'
                ref="rep_position"
                defaultValue={(client.rep_position) ? client.rep_position : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
              {errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('rep_department', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_department'
                ref="rep_department"
                defaultValue={(client.rep_department) ? client.rep_department : ''}
                />
              <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
              {errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <legend>ALTERNATIVE REPRESENTATIVE</legend>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_first_name', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_first_name'
                ref="alt_first_name"
                defaultValue={(client.alt_first_name) ? client.alt_first_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_first_name">First name *</label>
              {errors.alt_first_name && <small className="mdl-textfield__error shown">{errors.alt_first_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_last_name', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_last_name'
                ref="alt_last_name"
                defaultValue={(client.alt_last_name) ? client.alt_last_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_last_name">Last name *</label>
              {errors.alt_last_name && <small className="mdl-textfield__error shown">{errors.alt_last_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_email_address', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_email_address'
                ref="alt_email_address"
                defaultValue={(client.alt_email_address) ? client.alt_email_address : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_email_address">E-mail *</label>
              {errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <div className={this.formClassNames('alt_gender', errors)}>
              <select
                className="mdl-select__input"
                id='alt_gender'
                ref="alt_gender"
                defaultValue={(client.alt_gender) ? client.alt_gender : ''} >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className="mdl-textfield__label" htmlFor="alt_gender">Gender</label>
              {errors.alt_gender && <small className="mdl-textfield__error shown">{errors.alt_gender[0]}</small>}
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('alt_mobile_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_mobile_code'
                ref="alt_mobile_code"
                defaultValue={(client.alt_mobile_code) ? client.alt_mobile_code : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_mobile_code">Country Code*</label>
              {errors.alt_mobile_code && <small className="mdl-textfield__error shown">{errors.alt_mobile_code[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <div className={this.formClassNames('alt_mobile_number', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_mobile_number'
                ref="alt_mobile_number"
                defaultValue={(client.alt_mobile_number) ? client.alt_mobile_number : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_mobile_number">Mobile no.*</label>
              {errors.alt_mobile_number && <small className="mdl-textfield__error shown">{errors.alt_mobile_number[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('alt_phone_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_phone_code'
                ref="alt_phone_code"
                defaultValue={(client.alt_phone_code) ? client.alt_phone_code : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_phone_code">Country Code*</label>
              {errors.alt_phone_code && <small className="mdl-textfield__error shown">{errors.alt_phone_code[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <div className={this.formClassNames('alt_phone_number', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_phone_number'
                ref="alt_phone_number"
                defaultValue={(client.alt_phone_number) ? client.alt_phone_number : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_phone_number">Telephone no.*</label>
              {errors.alt_phone_number && <small className="mdl-textfield__error shown">{errors.alt_phone_number[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_position', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_position'
                ref="alt_position"
                defaultValue={(client.alt_position) ? client.alt_position : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_position">Position *</label>
              {errors.alt_position && <small className="mdl-textfield__error shown">{errors.alt_position[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_department', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_department'
                ref="alt_department"
                defaultValue={(client.alt_department) ? client.alt_department : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_department">Department *</label>
              {errors.alt_department && <small className="mdl-textfield__error shown">{errors.alt_department[0]}</small>}
            </div>
          </div>
        </div>
        <div className="layout-gt-md-row layout-align-end-end btn">
          <div className="flex-order-gt-md-2 pd-10">
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              id='btn-cancel'
              type='button'>CANCEL</button>
          </div>
          <div className="flex-order-gt-md-2">
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
              id='btn-save'
              type='submit'
              >SAVE</button>
          </div>
        </div>
      </form>
    );
  }

  renderCountry(selected) {
    if (!this.props.countryList) return;
    let country = (selected) ? selected : '';

    return (
      <Country country={this.props.countryList} selected={country} />
    );
  }

  renderSuccess() {
    let success = this.state.updateCompleted;
    if(!success) return;
    let {errors} = this.state ? this.state :'';
    if (Array.isArray(errors)) {
      $('.msg').html('Successfully updated profile').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
    }
  }

  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }

  // --- Actions

  changeApprovalStatus (e) {
    e.preventDefault();
    this.props.client.clientApprove(this.props.client.clientInfo.id);
  }
  clientDisapproveStatus (e) {
    e.preventDefault();
    this.props.client.clientDisapprove(this.props.client.clientInfo.id);
  }

  clienActivateStatus (e) {
    e.preventDefault();
    this.props.client.clientActivate(this.props.client.clientInfo.user.id);
  }
  clientDeactivateStatus (e) {
    e.preventDefault();
    this.props.client.clientDeactivate(this.props.client.clientInfo.user.id);
  }


  onSubmitClientProfile ( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );

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
    return validateClientProfile.call(this, payload)
      .with(this)
      .then(updateClientProfile)
      .catch(setErrors);
  }

  // --- Validations

  checkUsername( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );

    let payload = {
      username: this.refs.username.value
    }

    window.componentHandler.upgradeDom();
    return validateUsername.call( this, payload )
      .with( this )
      .then( getUsername )
      .catch( setErrors );
  }
};

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

function validateClientProfile ( payload) {
  let rules = new Checkit( {
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
    email_address: [
      { rule: 'required', label: 'email' },
      { rule: 'email', label: 'email' }
    ],
    items_per_page:    [{ rule: 'integer', label: 'items per page'}],
    timezone:          []
  } );
  return rules.run( payload );
}
function updateClientProfile (payload) {
  payload.id = this.props.client.clientInfo.id;
  return this.props.client.clientUpdateProfile(payload);
}

function validateUsername( payload ) {
  let rules = new Checkit( {
    username: [ 'required', 'minLength:8', 'maxLength:64' ]
  } );
  return rules.run( payload );
}
function getUsername (payload) {
  return this.props.client.validateUsername(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}

ClientProfile.mixins = [LinkedStateMixin];
ClientProfile.defaultProps = {
  errors: []
};

export default ClientProfile;