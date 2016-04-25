import React from 'react';
import { Link } from 'react-router';

class ClientLanding extends React.Component{
  constructor(props) {
      super(props);
      this.props = props;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <div className="mdl-layout-spacer"></div>
            <div className="wrapper">
              <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
                <i className="material-icons">person</i>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">settings</i> Settings</li>
                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">person</i> Profile</li>
                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon"><Link className="mdl-navigation__link " to ="/i/logout">Logout</Link></i> Logout</li>
              </ul>
            </div>
          </div>
        </header>
          <div className="arbitrium-drawer mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="arbitrium-navigation mdl-navigation">
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
            <div className="mdl-layout-spacer"></div>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
          </nav>
          </div>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div className="page-content">
              <div id="profile-bgcover" className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
                <div className="profile__content">
                  <div className="mdl-grid box">
                    <div className="mdl-cell--1-col box-photo">
                      <img src="http://placehold.it/100x100/"/>
                    </div>
                    <div className="mdl-cell--4-col box-details">
                      <h5 className="mdl-typography--headline">Profile Name</h5>
                      <p>Edit your profile avatars etc</p>
                    </div>
                  </div>
                </div>
              </div>
              <header className="mdl-layout__header mdl-layout--fixed-tabs">
                <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                  <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Profile</a>
                  <a href="#scroll-tab-2" className="mdl-layout__tab">Password</a>
                  <a href="#scroll-tab-3" className="mdl-layout__tab">Email Address</a>
                  <a href="#scroll-tab-4" className="mdl-layout__tab">Notifications</a>
                </div>
              </header>
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--12-col">
                  <form>
                    <div className="fff">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <legend>Arbitrium Login Information</legend>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col box-right">
                          <p>Rightside text</p>
                        </div>
                      </div>
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="username"
                              data-client="user"/>
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
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="email_address"
                              data-client="user"/>
                            <label className="mdl-textfield__label" htmlFor="email_address">E-mail *</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ggg">
                      <div className="mdl-grid">
                        <div className="mdl-cell">
                          <legend>General Information</legend>
                        </div>
                      </div>
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="company_name"/>
                            <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                          </div>
                        </div>
                      </div>

                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="street_address_1"/>
                            <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1</label>
                          </div>
                        </div>
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="street_address_2"/>
                            <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
                          </div>
                        </div>
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="city"/>
                            <label className="mdl-textfield__label" htmlFor="city">City</label>
                          </div>
                        </div>
                      </div>

                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="state"/>
                            <label className="mdl-textfield__label" htmlFor="state">State / Province</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="postal_code"/>
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


                    <div className="">

                      <div className="mdl-grid">
                        <div className="mdl-cell">
                          <legend>Company Representative</legend>
                        </div>
                      </div>
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_first_name"/>
                            <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_last_name"/>
                            <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_email_address"/>
                            <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <select
                              className="mdl-select__input"
                              id="rep_gender" >
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
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_mobile_code"/>
                            <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Code</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--2-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_mobile_number"/>
                            <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--1-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_phone_code"/>
                              <label className="mdl-textfield__label" htmlFor="rep_phone_code">Code</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--2-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_phone_number"/>
                            <label className="mdl-textfield__label" htmlFor="rep_phone_number">Phone no.</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_position"/>
                            <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="rep_department"/>
                            <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="iii">

                      <div className="mdl-grid">
                        <div className="mdl-cell">
                          <legend>Company Alternative</legend>
                        </div>
                      </div>
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_first_name"/>
                            <label className="mdl-textfield__label" htmlFor="alt_first_name">First name *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_last_name"/>
                            <label className="mdl-textfield__label" htmlFor="alt_last_name">Last name *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_email_address"/>
                            <label className="mdl-textfield__label" htmlFor="alt_email_address">E-mail *</label>
                           </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <select
                              className="mdl-select__input"
                              id="alt_gender">
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
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_mobile_code"/>
                            <label className="mdl-textfield__label" htmlFor="alt_mobile_code">Code</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--2-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_mobile_number"/>
                            <label className="mdl-textfield__label" htmlFor="alt_mobile_number">Mobile no.</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--1-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_phone_code"/>
                            <label className="mdl-textfield__label" htmlFor="alt_phone_code">Code</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--2-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_phone_number"/>
                            <label className="mdl-textfield__label" htmlFor="alt_phone_number">Phone no.</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_position"/>
                            <label className="mdl-textfield__label" htmlFor="alt_position">Position *</label>
                          </div>
                        </div>

                        <div className="mdl-cell mdl-cell--3-col">
                          <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
                            <input
                              className="mdl-textfield__input"
                              type="text"
                              id="alt_department"/>
                            <label className="mdl-textfield__label" htmlFor="alt_department">Department *</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mdl-grid">
                      <div className="mdl-cell">
                        <button
                          className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                          type="submit">Save
                        </button>

                        <button
                          className="mdl-button mdl-js-button mdl-button--raised"
                          type="button">Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="mdl-layout__tab-panel" id="fixed-tab-2">
            <div className="page-content">Tab two content</div>
          </section>
        </main>
      </div>
    );
  }
}

export default ClientLanding;