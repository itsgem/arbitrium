import cx from 'classnames';
import React from 'react';

class ClientProfile extends React.Component {

    constructor(props) {
        console.log('=== constructor ===', props);
        super(props);
        this.state = {
            client: {
                id: "-",
                credit_balance: "-",
                approval_status: "-",
                approved_at: "-",
                disapproved_at: "-",
                company_name: "-",
                street_address_1: "-",
                street_address_2: "-",
                city: "-",
                state: "-",
                country_id: "-",
                postal_code: "-",
                rep_first_name: "-",
                rep_last_name: "-",
                rep_email_address: "-",
                rep_gender: "-",
                rep_mobile_code: "-",
                rep_mobile_number: "-",
                rep_phone_code: "-",
                rep_phone_number: "-",
                rep_position: "-",
                rep_department: "-",
                alt_first_name: "-",
                alt_last_name: "-",
                alt_email_address: "-",
                alt_gender: "-",
                alt_mobile_code: "-",
                alt_mobile_number: "-",
                alt_phone_code: "-",
                alt_phone_number: "-",
                alt_position: "-",
                alt_department: "-",
                can_delete: "-",
                user: {
                    id: "-",
                    username: "-",
                    email_address: "-",
                    locked_at: "-",
                    timezone: "-",
                    items_per_page: "-",
                    activated_at: "-"
                }
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                client: nextProps.user
            });
        }
    }

    render() {
        console.log('=== state ===');
        console.log(this.state);

        if (!this.props.user || !this.state.client) {
            return (<div className="mdl-grid"></div>);
        }

        let client = this.state.client;

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--6-col mdl-cell--8-col-tablet graybox">
                    Cover Photo
                </div>

                <div className="mdl-cell mdl-cell--12-col mdl-cell--6-col mdl-cell--8-col-tablet graybox">
                    Tabs
                </div>

                <div className="mdl-cell mdl-cell--12-col mdl-cell--6-col mdl-cell--8-col-tablet graybox">
                    <form>
                        <legend>Arbitrium Login Information</legend>
                        <div className="">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('username')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="username"
                                            data-client="user"
                                            value={client.user.username}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="username">Username *</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <button type="button" className="mdl-button mdl-js-button mdl-button--raised">
                                        Check availability
                                    </button>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('email_address')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="email_address"
                                            data-client="user"
                                            value={client.user.email_address}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="email_address">E-mail *</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <legend>General Information</legend>
                        <div className="">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <div className={this.formClassNames('company_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="company_name"
                                            value={client.company_name}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('street_address_1')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="street_address_1"
                                            value={client.street_address_1}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('street_address_2')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="street_address_2"
                                            value={client.street_address_2}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('city')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="city"
                                            value={client.city}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="city">City</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('state')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="state"
                                            value={client.state}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="state">State / Province</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('postal_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="postal_code"
                                            value={client.postal_code}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="postal_code">Postal code</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className="mdl-select mdl-js-select mdl-select--floating-label">
                                        <select className="mdl-select__input" id="country" name="country">
                                            <option value=""></option>
                                            <option value="option1">option 1</option>
                                            <option value="option2">option 2</option>
                                            <option value="option3">option 3</option>
                                            <option value="option4">option 4</option>
                                            <option value="option5">option 5</option>
                                        </select>
                                        <label className="mdl-textfield__label" htmlFor="country">Country</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <legend>Company Representative</legend>
                        <div className="">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('rep_first_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_first_name"
                                            value={client.rep_first_name}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('rep_last_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_last_name"
                                            value={client.rep_last_name}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('rep_email_address')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_email_address"
                                            value={client.rep_email_address}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                                    </div>
                                </div>

                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('client.rep_gender')}>
                                        <select
                                            className="mdl-select__input"
                                            id="rep_gender"
                                            value={client.rep_gender}
                                            onChange={this.profileUpdate.bind(this)}
                                            >
                                            <option value=""></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label className="mdl-textfield__label" htmlFor="rep_gender">Gender</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--1-col">
                                    <div className={this.formClassNames('rep_mobile_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_mobile_code"
                                            value={client.rep_mobile_code}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Code</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col">
                                    <div className={this.formClassNames('rep_mobile_number')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_mobile_number"
                                            value={client.rep_mobile_number}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--1-col">
                                    <div className={this.formClassNames('rep_phone_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_phone_code"
                                            value={client.rep_phone_code}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_phone_code">Code</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col">
                                    <div className={this.formClassNames('rep_phone_number')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_phone_number"
                                            value={client.rep_phone_number}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_phone_number">Phone no.</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('rep_position')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_position"
                                            value={client.rep_position}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
                                    </div>
                                </div>

                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('rep_department')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="rep_department"
                                            value={client.rep_department}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <legend>Company Alternative</legend>
                        <div className="">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('alt_first_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_first_name"
                                            value={client.alt_first_name}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_first_name">First name *</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('alt_last_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_last_name"
                                            value={client.alt_last_name}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_last_name">Last name *</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('alt_email_address')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_email_address"
                                            value={client.alt_email_address}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_email_address">E-mail *</label>
                                    </div>
                                </div>

                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('client.alt_gender')}>
                                        <select
                                            className="mdl-select__input"
                                            id="alt_gender"
                                            value={client.alt_gender}
                                            onChange={this.profileUpdate.bind(this)}
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
                                    <div className={this.formClassNames('alt_mobile_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_mobile_code"
                                            value={client.alt_mobile_code}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_mobile_code">Code</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col">
                                    <div className={this.formClassNames('alt_mobile_number')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_mobile_number"
                                            value={client.alt_mobile_number}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_mobile_number">Mobile no.</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--1-col">
                                    <div className={this.formClassNames('alt_phone_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_phone_code"
                                            value={client.alt_phone_code}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_phone_code">Code</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col">
                                    <div className={this.formClassNames('alt_phone_number')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_phone_number"
                                            value={client.alt_phone_number}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_phone_number">Phone no.</label>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('alt_position')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_position"
                                            value={client.alt_position}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_position">Position *</label>
                                    </div>
                                </div>

                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('alt_department')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="alt_department"
                                            value={client.alt_department}
                                            onChange={this.profileUpdate.bind(this)}
                                            />
                                        <label className="mdl-textfield__label" htmlFor="alt_department">Department *</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                            type="submit"
                            >
                            Save
                        </button>

                        <button
                            className="mdl-button mdl-js-button mdl-button--raised"
                            type="button"
                            >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    profileUpdate(e) {
        let client = this.state.client;

        if (e.target.getAttribute('data-client')) {
            client[e.target.getAttribute('data-client')][e.target.id] = e.target.value;
        } else {
            client[e.target.id] = e.target.value;
        }

        this.setState({client: client});
    }

    formClassNames( field ) {
        return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield');
        //return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
        //    'is-invalid is-dirty': this.props.errors[ field ],
        //    'has-success': this.state[ field ] && !(this.props.errors[ field ])
        //} );
    }
}
export default ClientProfile;
