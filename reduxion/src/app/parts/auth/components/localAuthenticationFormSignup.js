import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import tr from 'i18next';
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
                                        type="company_name"
                                        id='company_name'
                                        ref="company_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="company_name">{tr.t('Company name *')}</label>
                                    {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--6-col">
                                <div className={this.formClassNames('street_1')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="street_1"
                                        id='street_1'
                                        ref="street_1"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="street_1">{tr.t('Street Address 1')}</label>
                                    {errors.street_1 && <small className="mdl-textfield__error shown">{errors.street_1[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--6-col">
                                <div className={this.formClassNames('street_2')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="street_2"
                                        id='street_2'
                                        ref="street_2"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="street_2">{tr.t('Street Address 2')}</label>
                                    {errors.street_2 && <small className="mdl-textfield__error shown">{errors.street_2[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('city')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="city"
                                        id='city'
                                        ref="city"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="city">{tr.t('City')}</label>
                                    {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('state')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="state"
                                        id='state'
                                        ref="state"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="state">{tr.t('State / Province')}</label>
                                    {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('zip')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="zip"
                                        id='zip'
                                        ref="zip"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="zip">{tr.t('Postal code')}</label>
                                    {errors.zip && <small className="mdl-textfield__error shown">{errors.zip[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <Country
                                    country = { this.props.country }
                                    errors = { errors }
                                />
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
                                        type="rep_first_name"
                                        id='rep_first_name'
                                        ref="rep_first_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_first_name">{tr.t('First name *')}</label>
                                    {errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_first_name')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_last_name"
                                        id='rep_last_name'
                                        ref="rep_last_name"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_last_name">{tr.t('Last name *')}</label>
                                    {errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('gender')}>
                                        <select
                                            className="mdl-select__input"
                                            type="gender"
                                            id='gender'
                                            ref="gender" >
                                            <option value=""></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label className="mdl-textfield__label" htmlFor="gender">{tr.t('Gender')}</label>
                                        {errors.gender && <small className="mdl-textfield__error shown">{errors.gender[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_email_address')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_email_address"
                                        id='rep_email_address'
                                        ref="rep_email_address"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_email_address">{tr.t('E-mail *')}</label>
                                    {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--1-col">
                                <div className={this.formClassNames('rep_mobile_code')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_mobile_code"
                                        id='rep_mobile_code'
                                        ref="rep_mobile_code"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_mobile_code">{tr.t('Code')}</label>
                                    {errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('rep_mobile_number')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_mobile_number"
                                        id='rep_mobile_number'
                                        ref="rep_mobile_number"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_mobile_number">{tr.t('Mobile no.')}</label>
                                    {errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--1-col">
                                <div className={this.formClassNames('rep_phone_code')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_phone_code"
                                        id='rep_phone_code'
                                        ref="rep_phone_code"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_phone_code">{tr.t('Code')}</label>
                                    {errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('rep_phone_number')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_phone_number"
                                        id='rep_phone_number'
                                        ref="rep_phone_number"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_phone_number">{tr.t('Phone no.')}</label>
                                    {errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_position')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_position"
                                        id='rep_position'
                                        ref="rep_position"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_position">{tr.t('Position *')}</label>
                                    {errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
                                </div>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col">
                                <div className={this.formClassNames('rep_department')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="rep_department"
                                        id='rep_department'
                                        ref="rep_department"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="rep_department">{tr.t('Department *')}</label>
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
                                        type="email_address"
                                        id='email_address'
                                        ref="email_address"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('E-mail *')}</label>
                                    {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('username')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="username"
                                        id='username'
                                        ref="username"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="username">{tr.t('Username *')}</label>
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
                                    <label className="mdl-textfield__label" htmlFor="password">{tr.t('password')}</label>
                                    {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col">
                                <div className={this.formClassNames('password_confirmation')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="password_confirmation"
                                        id='password_confirmation'
                                        ref="password_confirmation"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="password_confirmation">{tr.t('Confirm password *')}</label>
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
                                    to="/login">Already have an account? Login here.</Link>
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
        let {email_address, password, username, company_name, street_1, street_2, city, state, zip,
            rep_first_name, rep_last_name, gender, rep_email_address, rep_mobile_code,
            rep_mobile_number, rep_phone_code, rep_position, rep_department, password_confirmation} = this.refs;

        this.props.onButtonClick( {
            company_name: company_name.value,
            street_1: street_1.value,
            street_2: street_2.value,
            city: city.value,
            state: state.value,
            zip: zip.value,
            rep_first_name: rep_first_name.value,
            rep_last_name: rep_last_name.value,
            gender: gender.value,
            rep_email_address: rep_email_address.value,
            rep_mobile_code: rep_mobile_code.value,
            rep_mobile_number: rep_mobile_number.value,
            rep_phone_code: rep_phone_code.value,
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