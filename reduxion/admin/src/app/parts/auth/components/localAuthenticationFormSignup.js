import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import Country from '../components/country';

class LocalAuthenticationFormSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            email: null,
            loading:false
        }
    }

    render() {
        let {errors} = this.props;
        return (
            <div className="local-signin-form login-frame">
                <div className="sign-top">
                    <div className="title">
                        <div className="view">Sign up</div>
                        <div className="text-small">Fields with asterisks are required.</div>
                    </div>
                </div>
                <form className="mdl-shadow--2dp" action={ this.signup }>
                    <legend>Company / Organization</legend>
                    <div className="mdl-layout__content">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--full-col">
                                <div className={this.formClassNames('company_name')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='company_name'
                                        ref="company_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                                    {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--6-col">
                                <div className={this.formClassNames('street_address_1')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='street_address_1'
                                        ref="street_address_1"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1</label>
                                    {errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--6-col">
                                <div className={this.formClassNames('street_address_2')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='street_address_2'
                                        ref="street_address_2"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
                                    {errors.street_address_2 && <small className="mdl-textfield__error shown">{errors.street_address_2[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('city')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='city'
                                        ref="city"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="city">City</label>
                                    {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('state')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='state'
                                        ref="state"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="state">State / Province</label>
                                    {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('postal_code')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='postal_code'
                                        ref="postal_code"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="postal_code">Postal code</label>
                                    {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('country_id', errors)}>
                                    <Country
                                        country = { this.props.country }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <legend>Company Representative</legend>
                    <div className="mdl-layout__content">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_first_name')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_first_name'
                                        ref="rep_first_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
                                    {errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_last_name')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_last_name'
                                        ref="rep_last_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
                                    {errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('rep_gender')}>
                                        <select
                                            className="mdl-select__input"
                                            id='rep_gender'
                                            ref="rep_gender" >
                                            <option value=""></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label className="mdl-textfield__label" htmlFor="rep_gender">Gender</label>
                                        {errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_email_address')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_email_address'
                                        ref="rep_email_address"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                                    {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--1-col">
                                <div className={this.formClassNames('rep_mobile_code')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_mobile_code'
                                        ref="rep_mobile_code"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Code</label>
                                    {errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('rep_mobile_number')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_mobile_number'
                                        ref="rep_mobile_number"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.</label>
                                    {errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--1-col">
                                <div className={this.formClassNames('rep_phone_code')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_phone_code'
                                        ref="rep_phone_code"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_phone_code">Code</label>
                                    {errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('rep_phone_number')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_phone_number'
                                        ref="rep_phone_number"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_phone_number">Phone no.</label>
                                    {errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_position')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_position'
                                        ref="rep_position"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
                                    {errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_department')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='rep_department'
                                        ref="rep_department"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
                                    {errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <legend>Arbitrium Login Information</legend>
                    <div className="mdl-layout__content">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('email_address')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="email"
                                        id='email_address'
                                        ref="email_address"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="email_address">E-mail *</label>
                                    {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('username')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='username'
                                        ref="username"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="username">Username *</label>
                                    {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('password')}>
                                    <input
                                        className="mdl-textfield__input"
                                        id='password'
                                        ref="password"
                                        type='password'
                                        />
                                    <label className="mdl-textfield__label" htmlFor="password">password</label>
                                    {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('password_confirmation')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="password"
                                        id='password_confirmation'
                                        ref="password_confirmation"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="password_confirmation">Confirm password *</label>
                                    {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-gt-md-row layout-align-end-end">
                        <div className="flex-order-gt-md-1 flex-gt-md-30">
                            <p className="text-small text-center">
                                <Link
                                    className='margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 link ng-scope'
                                    id='btn-signup'
                                    to="/coffee/login">Already have an account? Login here.</Link>
                            </p>
                        </div>
                        <div className="flex-order-gt-md-2 flex-gt-md-25">
                            <button
                                className="md-raised md-primary md-hue-1 full-width margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 md-button ng-scope md-formal-blue-theme md-ink-ripple"
                                id='btn-login'
                                type='button'
                                onClick={(e) => this.signup(e)}>{ this.props.buttonCaption }</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    formClassNames( field ) {
        return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
            'is-invalid is-dirty': this.props.errors[ field ],
            'has-success': this.state[ field ] && !(this.props.errors[ field ])
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